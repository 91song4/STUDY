import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './create-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UpdateUserDto } from './update-user.dto';
import { DeleteUserDto } from './delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async login({ userId, password }: LoginDto): Promise<string> {
    const user: User | null = await this.getSelectedUserInfo(userId, [
      'id',
      'password',
    ]);

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다!');
    }

    const isPasswordCorrect: boolean = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다!');
    }

    const payload = { id: user.id };
    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: '1m',
    });

    return accessToken;
  }

  async createUser({ userId, name, password }: CreateUserDto): Promise<string> {
    const user: User | null = await this.userRepository.findOne({
      where: { userId },
      withDeleted: true,
    });

    if (user) {
      throw new ConflictException('아이디가 이미 존재합니다.');
    }

    const hashedPassword: string = await this.bcryptService.hash(password);

    const insertResult = await this.userRepository.insert({
      userId,
      name,
      password: hashedPassword,
    });

    const payload = { id: insertResult.identifiers[0].id };
    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: '1m',
    });

    return accessToken;
  }

  async updateUser(
    userId: string,
    { name, password }: UpdateUserDto,
  ): Promise<string> {
    await this.verifyPassword(userId, password);

    this.userRepository.update({ userId }, { name });

    return name;
  }

  async deleteUser(userId: string, { password }: DeleteUserDto): Promise<void> {
    await this.verifyPassword(userId, password);

    this.userRepository.softDelete({ userId });
  }

  private async getSelectedUserInfo(userId: string, selecteds: (keyof User)[]) {
    return this.userRepository.findOne({
      where: { userId },
      select: selecteds,
    });
  }

  private async verifyPassword(userId, password): Promise<void> {
    const user = await this.getSelectedUserInfo(userId, ['password']);

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다!');
    }

    const isPasswordCorrect: boolean = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다!');
    }
  }
}

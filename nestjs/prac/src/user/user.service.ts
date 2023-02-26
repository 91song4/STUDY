import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async getUserInfo(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      select: ['name'],
      where: { userId, deletedAt: null },
    });
  }

  private async jwtSign(id: number): Promise<string> {
    const payload = { id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async login(userId: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      select: ['userId', 'password'],
      where: { userId },
    });

    if (!!user === false) {
      throw new NotFoundException('해당 유저가 없습니다.');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('비밀번호가 틀립니다.');
    }

    return this.jwtSign(user.id);
  }

  async createUser(
    userId: string,
    name: string,
    password: string,
  ): Promise<string> {
    const exisUser: User = await this.getUserInfo(userId);
    if (!!exisUser === true) {
      throw new ConflictException('아이디가 이미 존재합니다.');
    }
    const insertResult = await this.userRepository.insert({
      userId,
      name,
      password,
    });

    return this.jwtSign(insertResult.identifiers[0].id);
  }

  updateUser(userId: string, name: string, password: string): void {
    this.userRepository.update({ userId }, { name, password });
  }
}

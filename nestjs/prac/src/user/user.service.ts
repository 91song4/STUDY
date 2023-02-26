import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async getUserInfo(userId: string): Promise<User> {
    return this.userRepository.findOne({
      select: ['name'],
      where: { userId, deletedAt: null },
    });
  }

  async login(userId: string, password: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!!user === false) {
      throw new NotFoundException('해당 유저가 없습니다.');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('비밀번호가 틀립니다.');
    }
  }

  async createUser(
    userId: string,
    name: string,
    password: string,
  ): Promise<void> {
    const exisUser: User = await this.getUserInfo(userId);
    if (!!exisUser === true) {
      throw new ConflictException('아이디가 이미 존재합니다.');
    }
    this.userRepository.insert({ userId, name, password });
  }

  updateUser(userId: string, name: string, password: string): void {
    this.userRepository.update({ userId }, { name, password });
  }
}

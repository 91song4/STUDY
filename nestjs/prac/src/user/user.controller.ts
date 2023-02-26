import { Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(): Promise<string> {
    return await this.userService.login('userId', '1234');
  }
  // TODO - DTO만들기
  @Post('/signup')
  async createUser(): Promise<string> {
    return await this.userService.createUser('userId2', 'name', '1234');
  }

  // TODO - DTO만들기
  @Put('/update')
  updateUser(): void {
    this.userService.updateUser('userId', 'new_name', '123123');
  }
}

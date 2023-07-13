import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './update-user.dto';
import { DeleteUserDto } from './delete-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/log-in')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    return await this.userService.login(loginDto);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  async deleteUser(
    @Param('userId') userId: string,
    @Body() deleteUserDto: DeleteUserDto,
  ): Promise<void> {
    return await this.userService.deleteUser(userId, deleteUserDto);
  }
}

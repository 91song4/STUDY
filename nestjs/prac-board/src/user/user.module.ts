import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigService } from 'src/config/jwt.config.service';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({ useClass: JWTConfigService }),
    BcryptModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

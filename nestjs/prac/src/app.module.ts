import { TypeOrmConfigService } from './config/typeorm.config.service';
import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  NestModule,
  CacheModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt.config.service';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      // inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      useClass: JwtConfigService,
      // inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 60000, // 데이터 캐싱 시간 (밀리 초 단위, 1000 = 1초)
      max: 100, // 최대 캐싱 개수
      isGlobal: true,
    }),
    BoardModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //  AuthMiddleware
  ],
})
// implements NestModule
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'user/update', method: RequestMethod.PUT });
  // }
}

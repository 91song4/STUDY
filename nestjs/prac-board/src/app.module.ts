import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigService } from './config/jwt.config.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheConfigService } from './config/cache.config.service';
import { ThrottlerConfigService } from './config/throttler.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    JwtModule.registerAsync({ useClass: JWTConfigService }),
    CacheModule.registerAsync({ useClass: CacheConfigService, isGlobal: true }),
    ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }),
    ArticleModule,
    UserModule,
    BcryptModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthMiddleware,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/:userId', method: RequestMethod.PUT },
        { path: 'articles', method: RequestMethod.POST },
        { path: 'articles/:id', method: RequestMethod.PUT },
        { path: 'articles/:id', method: RequestMethod.DELETE },
      );
  }
}

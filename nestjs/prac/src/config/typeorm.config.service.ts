import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Article } from '../board/article.entity';
=======
>>>>>>> ee1ae5b09e4b7cc10e9937c3ef86b097aeb5579e

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      port: this.configService.get<number>('DATABASE_PORT'),
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'),
<<<<<<< HEAD
      entities: [Article],
=======
      entities: [],
>>>>>>> ee1ae5b09e4b7cc10e9937c3ef86b097aeb5579e
    };
  }
}

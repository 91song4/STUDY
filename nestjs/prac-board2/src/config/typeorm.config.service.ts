import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('PSQL_HOST'),
      port: this.configService.get<number>('PSQL_PORT'),
      username: this.configService.get<string>('PSQL_USERNAME'),
      password: this.configService.get<string>('PSQLE_PASSWORD'),
      database: this.configService.get<string>('PSQL_NAME'),
      entities: [Board],
      logging: false,
      synchronize: true,
    };
  }
}

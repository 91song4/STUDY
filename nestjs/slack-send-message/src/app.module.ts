import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SlackModule } from 'nestjs-slack';
import { SlackConfig, SlackConfigFactory } from 'nestjs-slack/dist/types';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SlackModule.forRootAsync({
      useFactory: (configService: ConfigService): SlackConfig => {
        return {
          type: 'api',
          defaultChannel: '#study',
          token: configService.get<string>('BOT_TOKEN'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

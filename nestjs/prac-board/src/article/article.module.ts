import { Module } from '@nestjs/common';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { ArticleRepository } from './article.repository';

@Module({
  imports: [BcryptModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}

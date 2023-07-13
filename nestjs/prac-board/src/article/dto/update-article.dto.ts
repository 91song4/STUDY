import { OmitType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends OmitType(CreateArticleDto, [
  'view',
] as const) {}

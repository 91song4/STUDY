import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  password: string;

  @IsNumber()
  view: number;
}

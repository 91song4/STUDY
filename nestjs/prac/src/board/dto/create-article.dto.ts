import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  readonly author;

  @IsNotEmpty()
  @IsString()
  readonly title;

  @IsNotEmpty()
  @IsString()
  readonly content;

  @IsNotEmpty()
  @IsString()
  readonly password;
}

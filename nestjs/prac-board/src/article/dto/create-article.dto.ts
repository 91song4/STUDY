import { IsString } from 'class-validator';

export class CreateArticleDto {
  /**
   * @example 'song4'
   */
  @IsString()
  author: string;

  /**
   * @example '커피 마시고 싶다..'
   */
  @IsString()
  title: string;

  /**
   * @example '메가리카노 마시고싶다..!'
   */
  @IsString()
  content: string;

  /**
   * @example '1234'
   */
  @IsString()
  password: string;
}

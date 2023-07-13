import { IsString } from 'class-validator';

export class CreateBoardDTO {
  /**
   * 제목
   * @example "커피가 마시고 싶다..!"
   */
  @IsString()
  title: string;

  /**
   * 내용
   * @example "메가리카노!!!"
   */
  @IsString()
  description: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDTO {
  /**
   * 제목
   * @example "커피가 마시고 싶다..!"
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
  title: string;

  /**
   * 내용
   * @example "메가리카노!!!"
   */
  @IsNotEmpty({ message: '빈 값이 들어있습니다' })
  @IsString()
  description: string;
}

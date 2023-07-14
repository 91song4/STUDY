import { IsString } from 'class-validator';
import { BoardStatus } from '../board.entity';

export class UpdateBoardDTO {
  /**
   * 제목
   * @example "나도 커피!!"
   */
  @IsString()
  title?: string;

  /**
   * 내용
   * @example "디저트39!!"
   */
  @IsString()
  description?: string;

  /**
   * 상태
   * @example "PRIVATE"
   */
  status?: BoardStatus;
}

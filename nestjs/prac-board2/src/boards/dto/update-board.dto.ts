import { IsString } from 'class-validator';
import { BoardStatus } from '../board.entity';
import { IsBoardStatus } from '../decorators/isBoardStatus';

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
  @IsBoardStatus({ message: 'PUBLIC 또는 PRIVATE를 선택하세요.' })
  status?: BoardStatus;
}

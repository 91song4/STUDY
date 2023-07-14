import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class BoardParamsDTO {
  /**
   * 게시글 ID
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  id: number;
}

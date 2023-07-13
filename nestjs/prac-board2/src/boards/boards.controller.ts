import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  /**
   * 게시글 전체 가져오기
   */
  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
}

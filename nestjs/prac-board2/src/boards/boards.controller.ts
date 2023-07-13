import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
}

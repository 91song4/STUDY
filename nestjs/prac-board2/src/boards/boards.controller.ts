import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBoardDTO } from './dto/create-board.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  /**
   * 게시글 전체 가져오기
   */
  @Get()
  async getAllBoards(): Promise<Board[]> {
    try {
      return await this.boardsService.getAllBoards();
    } catch (err) {
      throw err;
    }
  }

  /**
   * 게시글 작성
   */
  @Post()
  async createBoard(@Body() createBoardDTO: CreateBoardDTO) {
    try {
      await this.boardsService.createBoard(createBoardDTO);
    } catch (err) {
      throw err;
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardParamsDTO } from './dto/board-params.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  /**
   * 게시글 전체 가져오기
   */
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  /**
   * 게시글 ID로 게시글 가져오기
   */
  @Get(':id')
  getBoardById(@Param() boardParamsDTO: BoardParamsDTO): Promise<Board> {
    return this.boardsService.getBoardById(boardParamsDTO);
  }

  /**
   * 게시글 작성
   */
  @Post()
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<number> {
    return this.boardsService.createBoard(createBoardDTO);
  }

  /**
   * 게시글 ID로 게시글 수정
   */
  @Patch(':id')
  updateBoard(
    @Param() boardParamsDTO: BoardParamsDTO,
    @Body() updateBoardDTO: UpdateBoardDTO,
  ): void {
    this.boardsService.updateBoard(boardParamsDTO, updateBoardDTO);
  }

  /**
   * 게시글 ID로 게시글 삭제
   */
  @Delete(':id')
  deleteBoard(@Param() boardParamsDTO: BoardParamsDTO): void {
    this.deleteBoard(boardParamsDTO);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardParamsDTO } from './dto/board-params.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { InsertResult, UpdateResult } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardsRepository.getAllBoards();
  }

  async getBoardById(boardParamsDTO: BoardParamsDTO): Promise<Board> {
    const board: Board | null = await this.boardsRepository.getBoardById(
      boardParamsDTO,
    );

    if (!board) {
      throw new NotFoundException('게시글이 존재하지 않습니다!');
    }

    return board;
  }

  async createBoard(createBoardDTO: CreateBoardDTO): Promise<number> {
    const insertResult: InsertResult = await this.boardsRepository.createBoard(
      createBoardDTO,
    );

    return insertResult.identifiers[0].id;
  }

  async updateBoard(
    boardParamsDTO: BoardParamsDTO,
    updateBoardDTO: UpdateBoardDTO,
  ): Promise<void> {
    const result: UpdateResult = await this.boardsRepository.updateBoard(
      boardParamsDTO,
      updateBoardDTO,
    );

    this.validateAction(result);
  }

  async deleteBoard(boardParamsDTO: BoardParamsDTO): Promise<void> {
    const result: UpdateResult = await this.boardsRepository.deleteBoard(
      boardParamsDTO,
    );

    this.validateAction(result);
  }

  private validateAction(result: UpdateResult) {
    const isSuccessful: boolean = !!result.affected;

    if (!isSuccessful) {
      throw new NotFoundException('게시글이 존재하지 않습니다!');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.getAllBoards();
  }

  createBoard(createBoardDTO: CreateBoardDTO): void {
    this.boardsRepository.createBoard(createBoardDTO);
  }
}

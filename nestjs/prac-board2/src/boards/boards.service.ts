import { Injectable } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async getAllBoards(): Promise<Board[]> {
    try {
      return await this.boardsRepository.getAllBoards();
    } catch (err) {
      return err;
    }
  }
}

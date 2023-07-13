import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getAllBoards(): Promise<Board[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('boards')
      .from(Board, 'boards')
      .getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  getAllBoards(): Promise<Board[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('boards')
      .from(Board, 'boards')
      .getMany();
  }

  createBoard({ title, description }: CreateBoardDTO): void {
    this.insert({ title, description });
  }
}

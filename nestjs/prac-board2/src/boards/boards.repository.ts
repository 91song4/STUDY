import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardParamsDTO } from './dto/board-params.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@Injectable()
export class BoardsRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  getAllBoards(): Promise<Board[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('board')
      .from(Board, 'board')
      .orderBy('board.id', 'DESC')
      .getMany();
  }

  getBoardById({ id }: BoardParamsDTO): Promise<Board> | null {
    return this.findOneBy({ id });
  }

  createBoard({ title, description }: CreateBoardDTO): Promise<InsertResult> {
    return this.insert({ title, description });
  }

  updateBoard(
    { id }: BoardParamsDTO,
    updateBoardDTO: UpdateBoardDTO,
  ): Promise<UpdateResult> {
    return this.update(id, { ...updateBoardDTO });
  }

  deleteBoard({ id }: BoardParamsDTO): Promise<UpdateResult> {
    return this.softDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Boards } from './boards.entity';

@Injectable()
export class BoardsRepository extends Repository<Boards> {
  constructor(private readonly dataSource: DataSource) {
    super(Boards, dataSource.createEntityManager());
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article)
    private readonly boardRepository: Repository<Article>,
  ) {}
}

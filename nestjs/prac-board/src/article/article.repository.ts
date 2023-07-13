import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Article } from './article.entity';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private readonly dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async getArticlesByViewCount(): Promise<Article[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('a')
      .from(Article, 'a')
      .orderBy('a.view', 'DESC')
      .getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private readonly dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  /* TODO - deletedAt: null 인걸 빼라는걸 지정을 안했는데 어디서 알아서 해결해서 안나오게 됐는지?
  async getArticlesByViewCount() {
    const result = await this.createQueryBuilder()
      .select('articles')
      .from(Article, 'articles')
      .orderBy('articles.view', 'DESC')
      .getMany();
    return result;
  }
}

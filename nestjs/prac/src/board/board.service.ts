import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';

@Injectable()
export class BoardService {
  constructor(
    // @InjectRepository(Article)
    // private readonly boardRepository: Repository<Article>,
    private readonly articleRepository: ArticleRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getArticles(): Promise<Article[]> {
    const cacheArticles: Article[] = await this.cacheManager.get('articles');

    if (!!cacheArticles === true) {
      return cacheArticles;
    }

    const articles = await this.articleRepository.find({
      select: ['id', 'title', 'createdAt'],
      where: { deletedAt: null },
    });

    this.cacheManager.set('articles', articles);
    return articles;
  }

  async getArticleById(id: number): Promise<Article> {
    return await this.articleRepository.findOne({
      select: ['author', 'title', 'content', 'createdAt', 'updatedAt'],
      where: { id, deletedAt: null },
    });
  }

  async getHotArticles() {
    return await this.articleRepository.getArticlesByViewCount();
  }

  // TODO - bcrypt 적용
  createArticle(
    author: string,
    title: string,
    content: string,
    password: string,
  ): void {
    this.articleRepository.insert({ author, title, content, password });
  }

  async updateArticle(
    id: number,
    author: string,
    title: string,
    content: string,
    password: string,
  ): Promise<void> {
    await this.verifyPassword(id, password);

    this.articleRepository.update(id, { author, title, content });
  }

  async deleteArticle(id: number, password: string): Promise<void> {
    await this.verifyPassword(id, password);

    this.articleRepository.softDelete(id);
  }

  private async verifyPassword(id: number, password: string): Promise<void> {
    const article = await this.articleRepository.findOne({
      select: ['password'],
      where: { id, deletedAt: null },
    });

    if (!!article === false) {
      throw new NotFoundException('게시물이 없습니다.');
    }

    if (article.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
  }
}

import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';

import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';

import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly bcryptService: BcryptService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  async getArticles(): Promise<Article[]> {
    const cachedArticles: Article[] | undefined = await this.cacheManager.get(
      'articles',
    );

    if (cachedArticles) {
      console.log('cache hit!!'.toUpperCase());
      return cachedArticles;
    }

    const articles: Article[] = await this.articleRepository.find({
      select: ['id', 'author', 'title', 'view', 'createdAt'],
    });

    await this.cacheManager.set('articles', articles);

    return articles;
  }

  async getHotArticles(): Promise<Article[]> {
    const cachedHotArticles: Article[] | undefined =
      await this.cacheManager.get('hotArticles');

    if (cachedHotArticles) {
      console.log('cache hit!!'.toUpperCase());
      return cachedHotArticles;
    }

    const hotArticles: Article[] | undefined =
      await this.articleRepository.getArticlesByViewCount();

    await this.cacheManager.set('hotArticles', hotArticles);

    return hotArticles;
  }

  async getArticleByID(
    id: number,
    isPasswordRequired: boolean,
  ): Promise<Article> | null {
    const selecteds: (keyof Article)[] = [
      'id',
      'author',
      'title',
      'view',
      'content',
      'createdAt',
      'updatedAt',
    ];

    if (isPasswordRequired) {
      selecteds.push('password');
    }

    return this.articleRepository.findOne({
      where: { id },
      select: selecteds,
    });
  }

  createArticle({
    author,
    title,
    content,
    view,
    password,
  }: CreateArticleDto): void {
    const hashedPassword = this.bcryptService.hashSync(password);

    this.articleRepository.insert({
      author,
      title,
      content,
      view,
      password: hashedPassword,
    });
  }

  async updateArticle(
    id: number,
    { author, title, content, password }: UpdateArticleDto,
  ): Promise<number> {
    await this.verifyPassword(id, password);

    this.articleRepository.update(id, {
      author,
      title,
      content,
    });

    return id;
  }

  async deleteArticle(
    id: number,
    { password }: DeleteArticleDto,
  ): Promise<void> {
    await this.verifyPassword(id, password);

    this.articleRepository.softDelete(id);
  }

  private async verifyPassword(id, password): Promise<void> {
    const article = await this.getArticleByID(id, true);

    if (!article) {
      throw new NotFoundException('게시글을 찾을 수 없습니다!');
    }

    const isPasswordCorrect: boolean = await this.bcryptService.compare(
      password,
      article.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다!');
    }
  }
}

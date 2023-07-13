import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';

import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('articles')
export class ArticleController {
  // 서비스 주입
  constructor(private readonly articleService: ArticleService) {}

  // 게시물 목록을 가져오는 API
  @SkipThrottle()
  @Get()
  async getArticles(): Promise<Article[]> {
    return await this.articleService.getArticles();
  }

  // 인기 게시글 정렬 보기 API
  @SkipThrottle()
  @Get('hot-articles')
  async getHotArticles() {
    return await this.articleService.getHotArticles();
  }

  // 게시물 상세보기 -> 게시물 ID로 확인
  @Get(':id')
  async getArticleByID(@Param('id') id: number): Promise<Article> | null {
    return await this.articleService.getArticleByID(id, false);
  }

  // 게시물 작성
  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto): void {
    return this.articleService.createArticle(createArticleDto);
  }

  // 게시물 수정
  @Put(':id')
  async updateArticle(
    @Param('id') id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<number> {
    return await this.articleService.updateArticle(id, updateArticleDto);
  }

  // 게시물 삭제
  @Delete(':id')
  deleteArticle(
    @Param('id') id: number,
    @Body() deleteArticleDto: DeleteArticleDto,
  ): Promise<void> {
    return this.articleService.deleteArticle(id, deleteArticleDto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Article } from './article.entity';
import { BoardService } from './board.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';

@Controller('board')
@UsePipes(new ValidationPipe({ transform: true }))
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/articles')
  async getArticles(): Promise<Article[]> {
    return await this.boardService.getArticles();
  }

  @Get('/articles/:id')
  async getArticleById(@Param('id') articleId: number): Promise<Article> {
    return await this.boardService.getArticleById(articleId);
  }

  @Get('/hot-articles')
  async getHotArticles(){
    return await this.boardService.getHotArticles();
  }
  
  @Post('/articles')
  createArticle(
    @Body() { author, title, content, password }: CreateArticleDto,
  ): void {
    this.boardService.createArticle(author, title, content, password);
  }

  @Put('/articles/:id')
  async updateArticle(
    @Param('id') articleId: number,
    @Body() { author, title, content, password }: UpdateArticleDto,
  ): Promise<void> {
    await this.boardService.updateArticle(
      articleId,
      author,
      title,
      content,
      password,
    );
  }

  @Delete('/articles/:id')
  async deleteArticle(
    @Param('id') articleId: number,
    @Body() { password }: DeleteArticleDto,
  ): Promise<void> {
    await this.boardService.deleteArticle(articleId, password);
  }
}

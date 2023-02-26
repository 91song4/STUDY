<<<<<<< HEAD
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article)
    private readonly boardRepository: Repository<Article>,
  ) {}

  async getArticles(): Promise<Article[]> {
    return await this.boardRepository.find({
      select: ['id', 'title', 'createdAt'],
      where: { deletedAt: null },
    });
  }

  async getArticleById(id: number): Promise<Article> {
    return await this.boardRepository.findOne({
      select: ['author', 'title', 'content', 'createdAt', 'updatedAt'],
      where: { id, deletedAt: null },
    });
  }

  // TODO - bcrypt 적용
  createArticle(
    author: string,
    title: string,
    content: string,
    password: string,
  ): void {
    this.boardRepository.insert({ author, title, content, password });
  }

  async updateArticle(
    id: number,
    author: string,
    title: string,
    content: string,
    password: string,
  ): Promise<void> {
    await this.verifyPassword(id, password);

    this.boardRepository.update(id, { author, title, content });
  }

  async deleteArticle(id: number, password: string): Promise<void> {
    await this.verifyPassword(id, password);

    this.boardRepository.softDelete(id);
  }

  private async verifyPassword(id: number, password: string): Promise<void> {
    const article = await this.boardRepository.findOne({
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
=======
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {}
>>>>>>> ee1ae5b09e4b7cc10e9937c3ef86b097aeb5579e

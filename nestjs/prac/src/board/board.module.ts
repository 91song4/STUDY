import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
=======

@Module({
>>>>>>> ee1ae5b09e4b7cc10e9937c3ef86b097aeb5579e
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}

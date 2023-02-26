import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'board', name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id: number;

  @Column('varchar', { length: 10 })
  readonly author: string;

  @Column('varchar', { length: 50 })
  readonly title: string;

  @Column('varchar', { length: 1000 })
  readonly content: string;

  @Column('varchar', { select: false })
  readonly password: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn({ default: null })
  readonly deletedAt: Date | null;
}

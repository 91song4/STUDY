import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'board', name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id: number;

  @Index({ unique: true })
  @Column('varchar', { length: 15 })
  readonly userId: string;

  @Column('varchar', { length: 15 })
  readonly name: string;

  @Column('varchar', { select: false })
  readonly password: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn({ default: null })
  readonly deletedAt: Date | null;
}

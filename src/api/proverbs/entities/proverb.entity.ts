import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Proverb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  igbo: string;

  @Column()
  english: string;

  @Column()
  meaning: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

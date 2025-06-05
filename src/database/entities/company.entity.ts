import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  catchPhrase: string;

  @Column()
  bs: string;

  @Column()
  description: string;

  @OneToMany(() => User, user => user.company)
  users: User[];
} 
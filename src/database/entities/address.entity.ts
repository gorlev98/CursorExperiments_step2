import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Geo } from './geo.entity';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @OneToOne(() => Geo, geo => geo.address)
  @JoinColumn()
  geo: Geo;

  @OneToMany(() => User, user => user.address)
  users: User[];
} 
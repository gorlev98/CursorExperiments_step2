import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class Geo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @OneToOne(() => Address, address => address.geo)
  address: Address;
} 
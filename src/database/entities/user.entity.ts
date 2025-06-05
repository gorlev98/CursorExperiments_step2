import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { Company } from './company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @ManyToOne(() => Address, address => address.users)
  @JoinColumn()
  address: Address;

  @Column()
  phone: string;

  @Column()
  website: string;

  @ManyToOne(() => Company, company => company.users)
  @JoinColumn()
  company: Company;

  @Column({ nullable: true })
  companyId: number;
} 
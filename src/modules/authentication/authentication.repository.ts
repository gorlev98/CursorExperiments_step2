import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authentication } from '../../database/entities/authentication.entity';

@Injectable()
export class AuthenticationRepository {
  constructor(
    @InjectRepository(Authentication)
    private readonly repository: Repository<Authentication>,
  ) {}

  async findByEmail(email: string): Promise<Authentication | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(data: Partial<Authentication>): Promise<Authentication> {
    const auth = this.repository.create(data);
    return this.repository.save(auth);
  }
} 
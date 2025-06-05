import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authentication } from '../../database/entities/authentication.entity';
import { BaseRepository } from '../../common/base.repository';

@Injectable()
export class AuthenticationRepository extends BaseRepository<Authentication> {
  constructor(
    @InjectRepository(Authentication)
    repository: Repository<Authentication>,
  ) {
    super(repository);
  }

  async findByEmail(email: string): Promise<Authentication | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(data: Partial<Authentication>): Promise<Authentication> {
    const auth = this.repository.create(data);
    return this.repository.save(auth);
  }
} 
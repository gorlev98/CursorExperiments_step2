import { BaseRepository } from '../../common/base.repository';
import { Company } from '../../database/entities/company.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  constructor(
    @InjectRepository(Company)
    repository: Repository<Company>,
  ) {
    super(repository);
  }
} 
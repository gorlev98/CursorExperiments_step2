import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base.service';
import { Company } from '../../database/entities/company.entity';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(protected readonly companyRepository: CompanyRepository) {
    super(companyRepository.repository);
  }
} 
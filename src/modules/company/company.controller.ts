import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/base.controller';
import { CommonService } from '../../common/common.service';
import { Company } from '../../database/entities/company.entity';
import { CompanyService } from './company.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController extends BaseController<Company> {
  constructor(
    protected readonly companyService: CompanyService,
    protected readonly commonService: CommonService,
  ) {
    super(companyService, commonService);
  }
} 
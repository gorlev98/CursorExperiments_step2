import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/base.controller';
import { CommonService } from '../../common/common.service';
import { Address } from '../../database/entities/address.entity';
import { AddressService } from './address.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController extends BaseController<Address> {
  constructor(
    protected readonly addressService: AddressService,
    protected readonly commonService: CommonService,
  ) {
    super(addressService, commonService);
  }
} 
import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { Address } from '../../database/entities/address.entity';
import { BaseService } from '../../common/base.service';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(protected readonly addressRepository: AddressRepository) {
    super(addressRepository.repository);
  }
} 
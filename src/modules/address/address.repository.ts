import { BaseRepository } from '../../common/base.repository';
import { Address } from '../../database/entities/address.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressRepository extends BaseRepository<Address> {
  constructor(
    @InjectRepository(Address)
    repository: Repository<Address>,
  ) {
    super(repository);
  }
} 
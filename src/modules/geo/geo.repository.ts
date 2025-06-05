import { BaseRepository } from '../../common/base.repository';
import { Geo } from '../../database/entities/geo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeoRepository extends BaseRepository<Geo> {
  constructor(
    @InjectRepository(Geo)
    repository: Repository<Geo>,
  ) {
    super(repository);
  }
} 
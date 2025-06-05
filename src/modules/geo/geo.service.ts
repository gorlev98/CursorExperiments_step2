import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base.service';
import { Geo } from '../../database/entities/geo.entity';
import { GeoRepository } from './geo.repository';

@Injectable()
export class GeoService extends BaseService<Geo> {
  constructor(protected readonly geoRepository: GeoRepository) {
    super(geoRepository.repository);
  }

  async findAll(skip: number, take: number, relations?: any): Promise<[Geo[], number]> {
    return this.repository.findAndCount({
      skip,
      take,
      relations,
    });
  }

  async findOne(id: number, relations?: any): Promise<Geo> {
    return this.repository.findOne({
      where: { id },
      relations,
    });
  }

  async create(createDto: Partial<Geo>): Promise<Geo> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async update(id: number, updateDto: Partial<Geo>): Promise<Geo> {
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 
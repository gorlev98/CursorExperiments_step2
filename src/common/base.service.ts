import { Injectable } from '@nestjs/common';
import { Repository, FindOptionsRelations, DeepPartial } from 'typeorm';

@Injectable()
export abstract class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(skip: number, take: number, relations?: FindOptionsRelations<T>): Promise<[T[], number]> {
    return this.repository.findAndCount({
      skip,
      take,
      relations,
    });
  }

  async findOne(id: number, relations?: FindOptionsRelations<T>): Promise<T> {
    return this.repository.findOne({
      where: { id } as any,
      relations,
    });
  }

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 
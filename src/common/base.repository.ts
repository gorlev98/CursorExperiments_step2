import { Repository, DeepPartial } from 'typeorm';

export abstract class BaseRepository<T> {
  constructor(public readonly repository: Repository<T>) {}

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(entity);
  }
} 
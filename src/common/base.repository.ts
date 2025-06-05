import { Repository } from 'typeorm';

export abstract class BaseRepository<T> {
  constructor(public readonly repository: Repository<T>) {}
} 
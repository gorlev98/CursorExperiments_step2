import { Injectable } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class CommonService {
  getPaginationParams(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return { skip, take: limit };
  }

  getRelations(includes: string[] = []): FindOptionsRelations<any> {
    const relations: FindOptionsRelations<any> = {};
    includes.forEach(include => {
      relations[include] = true;
    });
    return relations;
  }

  createPaginationResponse<T>(items: T[], total: number, page: number, limit: number) {
    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
} 
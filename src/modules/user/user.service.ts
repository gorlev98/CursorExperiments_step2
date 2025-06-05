import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base.service';
import { User } from '../../database/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(protected readonly userRepository: UserRepository) {
    super(userRepository.repository);
  }
} 
import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/base.controller';
import { CommonService } from '../../common/common.service';
import { User } from '../../database/entities/user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController extends BaseController<User> {
  constructor(
    protected readonly userService: UserService,
    protected readonly commonService: CommonService,
  ) {
    super(userService, commonService);
  }
} 
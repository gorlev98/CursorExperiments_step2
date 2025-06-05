import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/base.controller';
import { CommonService } from '../../common/common.service';
import { Geo } from '../../database/entities/geo.entity';
import { GeoService } from './geo.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Geo')
@Controller('geo')
export class GeoController extends BaseController<Geo> {
  constructor(
    protected readonly geoService: GeoService,
    protected readonly commonService: CommonService,
  ) {
    super(geoService, commonService);
  }
} 
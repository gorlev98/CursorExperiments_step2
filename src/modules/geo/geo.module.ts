import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geo } from '../../database/entities/geo.entity';
import { GeoController } from './geo.controller';
import { GeoService } from './geo.service';
import { GeoRepository } from './geo.repository';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Geo]),
    CommonModule
  ],
  controllers: [GeoController],
  providers: [GeoService, GeoRepository],
  exports: [GeoService],
})
export class GeoModule {} 
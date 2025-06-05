import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGeoDto {
  @ApiProperty()
  @IsString()
  lat: string;

  @ApiProperty()
  @IsString()
  lng: string;
} 
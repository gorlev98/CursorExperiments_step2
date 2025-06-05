import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  catchPhrase: string;

  @ApiProperty()
  @IsString()
  bs: string;

  @ApiProperty()
  @IsString()
  description: string;
} 
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  website: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  addressId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  companyId?: number;
} 
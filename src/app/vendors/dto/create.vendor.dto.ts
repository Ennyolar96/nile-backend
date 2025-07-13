import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty({ description: 'Vendor name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'Bank account number' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  bank_account: string;

  @ApiProperty({ description: 'Vendor email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Store name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  store_name: string;
}

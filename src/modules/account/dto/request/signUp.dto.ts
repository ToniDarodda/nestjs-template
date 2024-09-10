import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Country } from 'types/country';

export class SignUpAccount {
  @ApiProperty({ example: 'Toni' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Da Rodda' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'toni.da.rodda.pro@gmail.com' })
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({ example: '+330678400302' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  phoneNumber: string;

  @ApiProperty({ example: 'po9@cQesP!!D(' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;

  @ApiProperty({ example: [Country.CANADA] })
  @IsArray()
  @IsEnum(Country, { each: true })
  @Expose()
  country: Country;
}

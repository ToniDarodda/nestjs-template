import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { Country } from 'src/types/country';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/types/role';
import { CommonAccount } from './commonAccount';

@Entity('account')
export class Account extends CommonAccount {
  @ApiProperty({ example: 'Toni' })
  @Column('varchar', { name: 'first_name' })
  firstName: string;

  @ApiProperty({ example: 'Da Rodda' })
  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @ApiProperty({ example: 'toni.da.rodda.pro@gmail.com' })
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty({ example: '+330678400302' })
  @Column('varchar', { unique: true })
  phoneNumber: string;

  @ApiProperty({ example: 'po9@cQesP!!D(' })
  @Column('varchar')
  password: string;

  @ApiProperty({ example: Country.FRANCE })
  @Column({
    type: 'enum',
    enum: Country,
    default: Country.FRANCE,
  })
  country: Country;

  @ApiProperty({ example: Role.USER })
  @Column({
    type: 'simple-array',
    default: Role.USER,
  })
  roles: Role;

  @BeforeInsert()
  @BeforeUpdate()
  formatEmail() {
    this.email = this.email.toLocaleLowerCase();
  }
}

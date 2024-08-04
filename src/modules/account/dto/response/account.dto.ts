import { OmitType } from '@nestjs/swagger';
import { SignUpAccount } from '../request/signUp.dto';

export class AccountDto extends OmitType(SignUpAccount, ['password']) {}

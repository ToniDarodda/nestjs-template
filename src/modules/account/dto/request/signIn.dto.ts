import { PickType } from '@nestjs/swagger';
import { SignUpAccount } from './signUp.dto';

export class SignInAccount extends PickType(SignUpAccount, [
  'email',
  'password',
]) {}

import { PartialType, PickType } from '@nestjs/swagger';
import { SignUpAccount } from './signUp.dto';

export class PatchAccountDto extends PartialType(
  PickType(SignUpAccount, ['country', 'phoneNumber', 'email']),
) {}

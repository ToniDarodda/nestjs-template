import { SignUpAccount } from '../request/signUp.dto';
declare const AccountDto_base: import("@nestjs/common").Type<Omit<SignUpAccount, "password">>;
export declare class AccountDto extends AccountDto_base {
}
export {};

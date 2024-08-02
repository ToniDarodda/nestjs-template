import { SignUpAccount } from './signUp.dto';
declare const SignInAccount_base: import("@nestjs/common").Type<Pick<SignUpAccount, "password" | "email">>;
export declare class SignInAccount extends SignInAccount_base {
}
export {};

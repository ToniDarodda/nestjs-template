import type { Response } from 'express';
import { AccountService } from '../service/account.service';
import { SignInAccount } from '../dto/request/signIn.dto';
import { SignUpAccount } from '../dto/request/signUp.dto';
import { DecodedUserToken } from 'src/utils/parseCookie';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    signIn(data: SignInAccount, res: Response): Promise<void>;
    signUp(data: SignUpAccount, res: Response): Promise<void>;
    get({ userId }: DecodedUserToken): Promise<import("../../../entities/account").Account>;
}

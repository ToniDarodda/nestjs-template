import type { Response } from 'express';
import { AccountService } from '../service/account.service';
import { SignInAccount } from '../dto/request/signIn.dto';
import { SignUpAccount } from '../dto/request/signUp.dto';
import { DecodedUserToken } from 'src/utils/parseCookie';
import { PatchAccountDto } from '../dto/request/patch.dto';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    signIn(data: SignInAccount, res: Response): Promise<void>;
    signUp(data: SignUpAccount, res: Response): Promise<void>;
    get({ sub }: DecodedUserToken): Promise<import("../../../entities/account").Account>;
    patch({ sub }: DecodedUserToken, data: PatchAccountDto): Promise<import("typeorm").UpdateResult>;
    delete({ sub }: DecodedUserToken): Promise<import("typeorm").DeleteResult>;
}

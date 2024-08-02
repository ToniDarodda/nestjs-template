import { AccountService } from '../modules/account/service/account.service';
import { JwtPayload } from '../types/auth';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly accountService;
    constructor(accountService: AccountService);
    validate(payload: JwtPayload): Promise<import("../entities/account").Account>;
}
export {};

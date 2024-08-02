import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AccountService } from 'src/modules/account/service/account.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly accountService;
    constructor(accountService: AccountService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

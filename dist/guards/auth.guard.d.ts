import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Account } from 'entities/account';
import { Repository } from 'typeorm';
export declare class JwtAuthGuard implements CanActivate {
    private readonly accountRepository;
    constructor(accountRepository: Repository<Account>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

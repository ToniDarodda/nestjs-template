import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Account } from 'src/entities/account';
import { SignInAccount } from '../dto/request/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../../../types/auth';
import { SignUpAccount } from '../dto/request/signUp.dto';
export declare class AccountService {
    private readonly accountRepository;
    private readonly jwtService;
    private readonly logger;
    constructor(accountRepository: Repository<Account>, jwtService: JwtService);
    refreshToken(token: string): Promise<{
        access_token: string;
    }>;
    signIn({ email, password, }: SignInAccount): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signUp(data: SignUpAccount): Promise<TokenDto>;
    private generateTokens;
    getByMail(email: string): Promise<Account>;
    get(id: Account['id']): Promise<Account>;
    update(id: Account['id'], data: Partial<Account>): Promise<UpdateResult>;
    delete(id: Account['id']): Promise<DeleteResult>;
}

import { JwtService } from '@nestjs/jwt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Account } from 'src/entities/account';
import { TokenDto } from 'src/types/auth';
import { SignInAccount } from '../dto/request/signIn.dto';
import { SignUpAccount } from '../dto/request/signUp.dto';
import { PatchAccountDto } from '../dto/request/patch.dto';
import { MailService } from 'src/modules/mail/service/mail/mail.service';
export declare class AccountService {
    private readonly accountRepository;
    private readonly jwtService;
    private readonly emailService;
    private readonly logger;
    constructor(accountRepository: Repository<Account>, jwtService: JwtService, emailService: MailService);
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
    update(id: Account['id'], data: PatchAccountDto): Promise<UpdateResult>;
    delete(id: Account['id']): Promise<DeleteResult>;
}

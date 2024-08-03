"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AccountService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const account_1 = require("../../../entities/account");
const mail_service_1 = require("../../mail/service/mail/mail.service");
let AccountService = AccountService_1 = class AccountService {
    constructor(accountRepository, jwtService, emailService) {
        this.accountRepository = accountRepository;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.logger = new common_1.Logger(AccountService_1.name);
    }
    async refreshToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const newPayload = { sub: payload.sub, email: payload.email };
            return {
                access_token: await this.jwtService.signAsync(newPayload),
            };
        }
        catch (e) {
            this.logger.error('Invalid refresh token', e.stack);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async signIn({ email, password, }) {
        const user = await this.accountRepository.findOne({ where: { email } });
        if (!user || !user.checkIfPasswordIsValid(password)) {
            if (user) {
                user.failedLoginAttempts += 1;
                await this.accountRepository.save(user);
            }
            this.logger.warn(`Failed login attempt for email: ${email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        user.failedLoginAttempts = 0;
        const tokens = await this.generateTokens(user);
        user.refreshToken = tokens.refresh_token;
        await this.accountRepository.save(user);
        return tokens;
    }
    async signUp(data) {
        const userAlreadyExist = await this.getByMail(data.email);
        if (userAlreadyExist) {
            this.logger.warn(`Attempted to sign up with already taken email: ${data.email}`);
            throw new common_1.ConflictException('Email already taken!');
        }
        const user = this.accountRepository.create(data);
        user.securePassword(data.password);
        await this.accountRepository.save(user);
        this.emailService.sendMail(data.email, 'Welcome to our service', 'Thank you for signing up!', 'src/templates/welcome.html');
        const tokens = await this.generateTokens(user);
        user.setRefreshToken(tokens.refresh_token);
        await this.accountRepository.save(user);
        return tokens;
    }
    async generateTokens(user) {
        const payload = { sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
            }),
        };
    }
    getByMail(email) {
        return this.accountRepository.findOneBy({ email });
    }
    get(id) {
        return this.accountRepository.findOneBy({ id });
    }
    update(id, data) {
        return this.accountRepository.update(id, { ...data });
    }
    async delete(id) {
        const account = await this.accountRepository.findOneBy({ id });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return this.accountRepository.softDelete(id);
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = AccountService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AccountService);
//# sourceMappingURL=account.service.js.map
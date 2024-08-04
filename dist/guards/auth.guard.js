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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_1 = require("../entities/account");
const typeorm_2 = require("typeorm");
const parseCookie_1 = require("../utils/parseCookie");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { cookies } = request;
        const { COOKIE_TOKEN_NAME } = process.env;
        if (!cookies[COOKIE_TOKEN_NAME]) {
            throw new common_1.UnauthorizedException();
        }
        const { sub } = (0, parseCookie_1.decodeUserToken)(cookies[COOKIE_TOKEN_NAME]);
        const user = await this.accountRepository.findOneBy({ id: sub });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        request.user = user;
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JwtAuthGuard);
//# sourceMappingURL=auth.guard.js.map
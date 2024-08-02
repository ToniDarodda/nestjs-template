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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("../modules/account/service/account.service");
const parseCookie_1 = require("../utils/parseCookie");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { cookies } = request;
        const { COOKIE_TOKEN_NAME } = process.env;
        if (!cookies[COOKIE_TOKEN_NAME]) {
            throw new common_1.UnauthorizedException();
        }
        const { userId } = (0, parseCookie_1.decodeUserToken)(cookies[COOKIE_TOKEN_NAME]);
        const user = await this.accountService.get(userId);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        request.user = user;
        console.log('JwtAuthGuard: user', request.user);
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], JwtAuthGuard);
//# sourceMappingURL=auth.guard.js.map
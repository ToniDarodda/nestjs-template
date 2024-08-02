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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("../service/account.service");
const signIn_dto_1 = require("../dto/request/signIn.dto");
const signUp_dto_1 = require("../dto/request/signUp.dto");
const auth_decorator_1 = require("../../../decorators/auth.decorator");
const auth_guard_1 = require("../../../guards/auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const role_1 = require("../../../types/role");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async signIn(data, res) {
        const { COOKIE_TOKEN_NAME, COOKIE_REFRESH_TOKEN_NAME, REFRESH_TOKEN_JWT_VALID, } = process.env;
        const { refresh_token, access_token } = await this.accountService.signIn(data);
        res.cookie(COOKIE_TOKEN_NAME, access_token, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
        });
        res.cookie(COOKIE_REFRESH_TOKEN_NAME, refresh_token, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
        });
    }
    async signUp(data, res) {
        const { COOKIE_TOKEN_NAME, COOKIE_REFRESH_TOKEN_NAME, REFRESH_TOKEN_JWT_VALID, } = process.env;
        const { access_token, refresh_token } = await this.accountService.signUp(data);
        res.cookie(COOKIE_TOKEN_NAME, access_token, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
        });
        res.cookie(COOKIE_REFRESH_TOKEN_NAME, refresh_token, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(REFRESH_TOKEN_JWT_VALID, 10)),
        });
    }
    get({ userId }) {
        return this.accountService.get(userId);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInAccount, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SignUpAccount, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_1.Role.USER),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, auth_decorator_1.AuthToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "get", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map
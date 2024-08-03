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
const swagger_1 = require("@nestjs/swagger");
const account_service_1 = require("../service/account.service");
const signIn_dto_1 = require("../dto/request/signIn.dto");
const signUp_dto_1 = require("../dto/request/signUp.dto");
const auth_decorator_1 = require("../../../decorators/auth.decorator");
const auth_guard_1 = require("../../../guards/auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const role_1 = require("../../../types/role");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const patch_dto_1 = require("../dto/request/patch.dto");
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
    get({ sub }) {
        return this.accountService.get(sub);
    }
    patch({ sub }, data) {
        return this.accountService.update(sub, data);
    }
    async delete({ sub }) {
        try {
            return await this.accountService.delete(sub);
        }
        catch (err) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        type: signIn_dto_1.SignInAccount,
        description: 'Sign in to retrieve user account',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'User signed in successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials, unable to sign in',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInAccount, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        type: signUp_dto_1.SignUpAccount,
        description: 'Create a new user account',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'User created successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Email or phone number already used',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SignUpAccount, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User information retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User information not found',
    }),
    (0, roles_decorator_1.Roles)(role_1.Role.USER),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, auth_decorator_1.AuthToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({
        type: patch_dto_1.PatchAccountDto,
        description: 'Update user information',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User information updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User information not found',
    }),
    (0, roles_decorator_1.Roles)(role_1.Role.USER),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, auth_decorator_1.AuthToken)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, patch_dto_1.PatchAccountDto]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User information deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User information not found',
    }),
    (0, roles_decorator_1.Roles)(role_1.Role.USER),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, auth_decorator_1.AuthToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "delete", null);
exports.AccountController = AccountController = __decorate([
    (0, swagger_1.ApiTags)('Account'),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map
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
exports.CommonAccount = void 0;
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const common_1 = require("./common");
class CommonAccount extends common_1.CommonEntity {
    securePassword(password) {
        if (password) {
            this.salt = CommonAccount.generateSalt();
            this.password = CommonAccount.hashPassword(this.salt, password);
        }
    }
    static generateSalt() {
        return (0, crypto_1.randomBytes)(16).toString('hex');
    }
    static hashPassword(salt, password) {
        return (0, crypto_1.pbkdf2Sync)(password, salt, parseInt(process.env.PASSWD_ROUNDS, 10) || 10000, parseInt(process.env.PASSWD_OUTPUT, 10) || 64, 'sha512').toString('hex');
    }
    checkIfPasswordIsValid(clearPassword) {
        const submittedPassword = CommonAccount.hashPassword(this.salt, clearPassword);
        return this.password === submittedPassword;
    }
    setRefreshToken(clearRefreshToken) {
        this.refreshToken = CommonAccount.hashPassword(this.salt, clearRefreshToken);
    }
    checkIfRefreshTokenIsValid(clearRefreshToken) {
        const submittedRefreshToken = CommonAccount.hashPassword(this.salt, clearRefreshToken);
        return this.refreshToken === submittedRefreshToken;
    }
    addResetToken(clearResetToken) {
        const newResetToken = CommonAccount.hashPassword(this.salt, clearResetToken);
        this.resetTokens.push(newResetToken);
    }
    removeAllResetTokens() {
        this.resetTokens = [];
    }
    checkIfResetTokenIsValid(clearResetToken) {
        const submittedResetToken = CommonAccount.hashPassword(this.salt, clearResetToken);
        return this.resetTokens.includes(submittedResetToken);
    }
}
exports.CommonAccount = CommonAccount;
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'password' }),
    __metadata("design:type", String)
], CommonAccount.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'salt' }),
    __metadata("design:type", String)
], CommonAccount.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true, name: 'refresh_token', select: false }),
    __metadata("design:type", String)
], CommonAccount.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'reset_tokens',
        default: [],
        array: true,
        select: false,
    }),
    __metadata("design:type", Array)
], CommonAccount.prototype, "resetTokens", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'failed_login_attempts', default: 0 }),
    __metadata("design:type", Number)
], CommonAccount.prototype, "failedLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true, name: 'locked_at', select: false }),
    __metadata("design:type", Date)
], CommonAccount.prototype, "lockedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommonAccount.prototype, "securePassword", null);
//# sourceMappingURL=commonAccount.js.map
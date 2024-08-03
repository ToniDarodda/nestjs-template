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
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const country_1 = require("../types/country");
const swagger_1 = require("@nestjs/swagger");
const role_1 = require("../types/role");
const commonAccount_1 = require("./commonAccount");
let Account = class Account extends commonAccount_1.CommonAccount {
    formatEmail() {
        this.email = this.email.toLocaleLowerCase();
    }
};
exports.Account = Account;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toni' }),
    (0, typeorm_1.Column)('varchar', { name: 'first_name' }),
    __metadata("design:type", String)
], Account.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Da Rodda' }),
    (0, typeorm_1.Column)('varchar', { name: 'last_name' }),
    __metadata("design:type", String)
], Account.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'toni.da.rodda.pro@gmail.com' }),
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+330678400302' }),
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], Account.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'po9@cQesP!!D(' }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: country_1.Country.FRANCE }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: country_1.Country,
        default: country_1.Country.FRANCE,
    }),
    __metadata("design:type", String)
], Account.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [role_1.Role.USER] }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_1.Role,
        array: true,
        default: [role_1.Role.USER],
    }),
    __metadata("design:type", Array)
], Account.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Account.prototype, "formatEmail", null);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)('account')
], Account);
//# sourceMappingURL=account.js.map
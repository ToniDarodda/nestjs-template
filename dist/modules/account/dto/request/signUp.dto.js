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
exports.SignUpAccount = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const country_1 = require("../../../../types/country");
class SignUpAccount {
}
exports.SignUpAccount = SignUpAccount;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toni' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAccount.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Da Rodda' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAccount.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'toni.da.rodda.pro@gmail.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpAccount.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+330678400302' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAccount.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'po9@cQesP!!D(' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAccount.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [country_1.Country.CANADA] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(country_1.Country, { each: true }),
    __metadata("design:type", String)
], SignUpAccount.prototype, "country", void 0);
//# sourceMappingURL=signUp.dto.js.map
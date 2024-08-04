"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const signUp_dto_1 = require("../request/signUp.dto");
class AccountDto extends (0, swagger_1.OmitType)(signUp_dto_1.SignUpAccount, ['password']) {
}
exports.AccountDto = AccountDto;
//# sourceMappingURL=account.dto.js.map
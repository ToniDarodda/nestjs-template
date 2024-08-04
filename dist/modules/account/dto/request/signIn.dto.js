"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInAccount = void 0;
const swagger_1 = require("@nestjs/swagger");
const signUp_dto_1 = require("./signUp.dto");
class SignInAccount extends (0, swagger_1.PickType)(signUp_dto_1.SignUpAccount, [
    'email',
    'password',
]) {
}
exports.SignInAccount = SignInAccount;
//# sourceMappingURL=signIn.dto.js.map
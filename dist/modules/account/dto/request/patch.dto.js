"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const signUp_dto_1 = require("./signUp.dto");
class PatchAccountDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(signUp_dto_1.SignUpAccount, ['country', 'phoneNumber', 'email'])) {
}
exports.PatchAccountDto = PatchAccountDto;
//# sourceMappingURL=patch.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
const common_1 = require("@nestjs/common");
const parseCookie_1 = require("../utils/parseCookie");
exports.AuthToken = (0, common_1.createParamDecorator)((_data, ctx) => {
    const { cookies } = ctx.switchToHttp().getRequest();
    const { COOKIE_TOKEN_NAME } = process.env;
    console.log((0, parseCookie_1.decodeUserToken)(cookies[COOKIE_TOKEN_NAME]));
    return (0, parseCookie_1.decodeUserToken)(cookies[COOKIE_TOKEN_NAME]);
});
//# sourceMappingURL=auth.decorator.js.map
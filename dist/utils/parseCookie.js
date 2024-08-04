"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfTokenHasExpired = exports.verifyTokenSignature = exports.decodeUserToken = void 0;
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const decodeUserToken = (userToken) => {
    try {
        if (!userToken)
            throw new Error();
        const decodedUserToken = jwt.decode(userToken);
        if (!decodedUserToken)
            throw new Error();
        return decodedUserToken;
    }
    catch (error) {
        console.error(`[decodeUserToken] - Unable to decode userToken, cookie might be invalid`, error);
        throw new common_1.UnauthorizedException('Invalid cookie');
    }
};
exports.decodeUserToken = decodeUserToken;
const verifyTokenSignature = (userToken, secret) => {
    try {
        if (!userToken)
            throw new Error();
        jwt.verify(userToken, secret);
    }
    catch (error) {
        console.error(`[decodeUserToken] - Unable to decode userToken, cookie might be invalid`, error);
        throw new common_1.UnauthorizedException('Invalid cookie');
    }
};
exports.verifyTokenSignature = verifyTokenSignature;
const checkIfTokenHasExpired = (decodedToken) => {
    const { exp: expiresAt } = decodedToken;
    return Date.now() >= expiresAt * 1000;
};
exports.checkIfTokenHasExpired = checkIfTokenHasExpired;
//# sourceMappingURL=parseCookie.js.map
import * as jwt from 'jsonwebtoken';
export interface DecodedUserToken extends jwt.JwtPayload {
}
export declare const decodeUserToken: (userToken: string) => DecodedUserToken;
export declare const verifyTokenSignature: (userToken: string, secret: string) => void;
export declare const checkIfTokenHasExpired: (decodedToken: DecodedUserToken) => boolean;

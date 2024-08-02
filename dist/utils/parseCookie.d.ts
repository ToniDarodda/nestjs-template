import * as jwt from 'jsonwebtoken';
export interface DecodedUserToken extends jwt.JwtPayload {
    userId: string;
}
export declare const decodeUserToken: (userToken: string) => DecodedUserToken;
export declare const verifyTokenSignature: (userToken: string, secret: string) => void;
export declare const checkIfTokenHasExpired: (decodedToken: DecodedUserToken) => boolean;

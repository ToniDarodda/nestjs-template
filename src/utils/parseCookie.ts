import * as jwt from 'jsonwebtoken';

import { UnauthorizedException } from '@nestjs/common';

export interface DecodedUserToken extends jwt.JwtPayload {}

export const decodeUserToken = (userToken: string): DecodedUserToken => {
  try {
    if (!userToken) throw new Error();
    const decodedUserToken = jwt.decode(userToken);
    if (!decodedUserToken) throw new Error();
    return decodedUserToken as DecodedUserToken;
  } catch (error: unknown) {
    console.error(
      `[decodeUserToken] - Unable to decode userToken, cookie might be invalid`,
      error,
    );
    throw new UnauthorizedException('Invalid cookie');
  }
};

export const verifyTokenSignature = (
  userToken: string,
  secret: string,
): void => {
  try {
    if (!userToken) throw new Error();
    jwt.verify(userToken, secret);
  } catch (error: unknown) {
    console.error(
      `[decodeUserToken] - Unable to decode userToken, cookie might be invalid`,
      error,
    );
    throw new UnauthorizedException('Invalid cookie');
  }
};

export const checkIfTokenHasExpired = (
  decodedToken: DecodedUserToken,
): boolean => {
  const { exp: expiresAt } = decodedToken;
  return Date.now() >= expiresAt * 1000;
};

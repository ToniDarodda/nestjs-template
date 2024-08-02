import { CommonEntity } from './common';
export declare abstract class CommonAccount extends CommonEntity {
    password: string;
    salt: string;
    refreshToken?: string;
    resetTokens: string[];
    failedLoginAttempts: number;
    lockedAt?: Date;
    securePassword(password: string): void;
    static generateSalt(): string;
    static hashPassword(salt: string, password: string): string;
    checkIfPasswordIsValid(clearPassword: string): boolean;
    setRefreshToken(clearRefreshToken: string): void;
    checkIfRefreshTokenIsValid(clearRefreshToken: string): boolean;
    addResetToken(clearResetToken: string): void;
    removeAllResetTokens(): void;
    checkIfResetTokenIsValid(clearResetToken: string): boolean;
}

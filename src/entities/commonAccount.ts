import { pbkdf2Sync, randomBytes } from 'crypto';
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { CommonEntity } from './common';

export abstract class CommonAccount extends CommonEntity {
  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'salt' })
  salt: string;

  @Column('varchar', { nullable: true, name: 'refresh_token' })
  refreshToken?: string;

  @Column('varchar', { name: 'reset_tokens', default: [], array: true })
  resetTokens: string[];

  @Column('int', { name: 'failed_login_attempts', default: 0 })
  failedLoginAttempts: number;

  @Column('timestamp', { nullable: true, name: 'locked_at' })
  lockedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  securePassword(password: string) {
    if (password) {
      this.salt = CommonAccount.generateSalt();
      this.password = CommonAccount.hashPassword(this.salt, password);
    }
  }

  static generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  static hashPassword(salt: string, password: string): string {
    return pbkdf2Sync(
      password,
      salt,
      parseInt(process.env.PASSWD_ROUNDS, 10) || 10000,
      parseInt(process.env.PASSWD_OUTPUT, 10) || 64,
      'sha512',
    ).toString('hex');
  }

  checkIfPasswordIsValid(clearPassword: string): boolean {
    const submittedPassword = CommonAccount.hashPassword(
      this.salt,
      clearPassword,
    );
    return this.password === submittedPassword;
  }

  setRefreshToken(clearRefreshToken: string): void {
    this.refreshToken = CommonAccount.hashPassword(
      this.salt,
      clearRefreshToken,
    );
  }

  checkIfRefreshTokenIsValid(clearRefreshToken: string): boolean {
    const submittedRefreshToken = CommonAccount.hashPassword(
      this.salt,
      clearRefreshToken,
    );
    return this.refreshToken === submittedRefreshToken;
  }

  addResetToken(clearResetToken: string): void {
    const newResetToken = CommonAccount.hashPassword(
      this.salt,
      clearResetToken,
    );
    this.resetTokens.push(newResetToken);
  }

  removeAllResetTokens(): void {
    this.resetTokens = [];
  }

  checkIfResetTokenIsValid(clearResetToken: string): boolean {
    const submittedResetToken = CommonAccount.hashPassword(
      this.salt,
      clearResetToken,
    );
    return this.resetTokens.includes(submittedResetToken);
  }
}

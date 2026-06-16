export interface PasswordHasher {
  hashPassword(plainPassword: string): Promise<string>;
  verifyPassword(plainPassword: string, passwordHash: string): Promise<boolean>;
  needsRehash?(passwordHash: string): boolean;
}

import bcryptjs from 'bcryptjs';
import { PasswordHasher } from '../../application/auth/services/PasswordHasher';
import { assertPasswordPolicy } from '../../application/auth/services/PasswordPolicy';

export class BcryptPasswordHasher implements PasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 12) {
    if (saltRounds < 4) {
      throw new Error('Insecure salt rounds configured');
    }
    this.saltRounds = saltRounds;
  }

  async hashPassword(plainPassword: string): Promise<string> {
    if (!plainPassword) {
      throw new Error('Password cannot be empty');
    }
    // Perform safety assert first
    assertPasswordPolicy(plainPassword);

    const salt = await bcryptjs.genSalt(this.saltRounds);
    return bcryptjs.hash(plainPassword, salt);
  }

  async verifyPassword(plainPassword: string, passwordHash: string): Promise<boolean> {
    if (!plainPassword || !passwordHash) {
      return false;
    }
    try {
      return await bcryptjs.compare(plainPassword, passwordHash);
    } catch {
      return false;
    }
  }

  needsRehash(passwordHash: string): boolean {
    if (!passwordHash) {
      return true;
    }
    // Simple check: bcrypt hashes must look reasonable
    return !passwordHash.startsWith('$2a$') && !passwordHash.startsWith('$2b$');
  }
}

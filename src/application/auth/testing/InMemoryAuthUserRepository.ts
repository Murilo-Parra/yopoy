import { AuthUserRepository } from '../contracts/AuthUserRepository';
import { AuthUser } from '../types';

export class InMemoryAuthUserRepository implements AuthUserRepository {
  public users: AuthUser[] = [];

  async findByEmail(email: string): Promise<AuthUser | null> {
    const found = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return found ? { ...found } : null;
  }

  async findById(userId: string): Promise<AuthUser | null> {
    const found = this.users.find((u) => u.id === userId);
    return found ? { ...found } : null;
  }

  async createUser(
    input: Omit<AuthUser, 'id' | 'createdAt' | 'updatedAt' | 'failedLoginAttempts' | 'lockedUntil' | 'lastLoginAt'>
  ): Promise<AuthUser> {
    const user: AuthUser = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email: input.email,
      passwordHash: input.passwordHash,
      companyId: input.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: null,
    };
    this.users.push(user);
    return { ...user };
  }

  async updatePasswordHash(userId: string, passwordHash: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this.users[index].passwordHash = passwordHash;
      this.users[index].updatedAt = new Date();
    }
  }

  async incrementFailedLogin(userId: string): Promise<number> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this.users[index].failedLoginAttempts += 1;
      this.users[index].updatedAt = new Date();
      return this.users[index].failedLoginAttempts;
    }
    return 0;
  }

  async resetFailedLogin(userId: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this.users[index].failedLoginAttempts = 0;
      this.users[index].updatedAt = new Date();
    }
  }

  async lockUserUntil(userId: string, date: Date): Promise<void> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this.users[index].lockedUntil = date;
      this.users[index].updatedAt = new Date();
    }
  }

  async updateLastLogin(userId: string, date: Date): Promise<void> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this.users[index].lastLoginAt = date;
      this.users[index].updatedAt = new Date();
    }
  }
}

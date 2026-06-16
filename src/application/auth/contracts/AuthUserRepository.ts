import { AuthUser } from '../types';

export interface AuthUserRepository {
  findByEmail(email: string): Promise<AuthUser | null>;
  findById(userId: string): Promise<AuthUser | null>;
  createUser(input: Omit<AuthUser, 'id' | 'createdAt' | 'updatedAt' | 'failedLoginAttempts' | 'lockedUntil' | 'lastLoginAt'>): Promise<AuthUser>;
  updatePasswordHash(userId: string, passwordHash: string): Promise<void>;
  incrementFailedLogin(userId: string): Promise<number>;
  resetFailedLogin(userId: string): Promise<void>;
  lockUserUntil(userId: string, date: Date): Promise<void>;
  updateLastLogin(userId: string, date: Date): Promise<void>;
}

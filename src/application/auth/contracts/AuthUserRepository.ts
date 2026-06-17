import { AuthUser, SafeAuthUser } from '../types';

export interface AuthUserRepository {
  findByEmail(email: string): Promise<AuthUser | null>;
  findById(userId: string): Promise<AuthUser | null>;
  listCompanyUsers(companyId: string): Promise<SafeAuthUser[]>;
  findByEmailWithinCompany(email: string, companyId: string): Promise<AuthUser | null>;
  createUser(input: Omit<AuthUser, 'id' | 'createdAt' | 'updatedAt' | 'failedLoginAttempts' | 'lockedUntil' | 'lastLoginAt'>): Promise<AuthUser>;
  updateUserStatus(userId: string, companyId: string, active: boolean): Promise<void>;
  updatePasswordHash(userId: string, passwordHash: string): Promise<void>;
  incrementFailedLogin(userId: string): Promise<number>;
  resetFailedLogin(userId: string): Promise<void>;
  lockUserUntil(userId: string, date: Date): Promise<void>;
  updateLastLogin(userId: string, date: Date): Promise<void>;
}

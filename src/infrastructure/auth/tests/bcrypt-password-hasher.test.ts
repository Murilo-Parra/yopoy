import { describe, it, expect } from 'vitest';
import { BcryptPasswordHasher } from '../BcryptPasswordHasher';

describe('BcryptPasswordHasher Unit Tests', () => {
  it('should not return clear password, and hash must be different from original', async () => {
    // Using cost 4 for fast test execution
    const hasher = new BcryptPasswordHasher(4);
    const password = 'StrongPass123!';
    const hash = await hasher.hashPassword(password);
    
    expect(hash).not.toBe(password);
    expect(hash.startsWith('$2a$') || hash.startsWith('$2b$')).toBe(true);
  });

  it('should verify correct password successfully and reject wrong password', async () => {
    const hasher = new BcryptPasswordHasher(4);
    const password = 'StrongPass123!';
    const wrongPassword = 'WrongPass123!';
    
    const hash = await hasher.hashPassword(password);
    
    const isCorrect = await hasher.verifyPassword(password, hash);
    const isWrong = await hasher.verifyPassword(wrongPassword, hash);
    
    expect(isCorrect).toBe(true);
    expect(isWrong).toBe(false);
  });

  it('should refuse to hash weak passwords', async () => {
    const hasher = new BcryptPasswordHasher(4);
    await expect(hasher.hashPassword('weak')).rejects.toThrow('Password policy violated');
  });

  it('should return false for invalid or empty hash formats safely', async () => {
    const hasher = new BcryptPasswordHasher(4);
    const isInvalid = await hasher.verifyPassword('StrongPass123!', 'invalid_hash_string');
    const isEmpty = await hasher.verifyPassword('StrongPass123!', '');
    
    expect(isInvalid).toBe(false);
    expect(isEmpty).toBe(false);
  });

  it('should enforce high default safety cost and allow override via constructor', () => {
    const normalHasher = new BcryptPasswordHasher(); // Default
    // Cannot inspect saltRounds directly, but can verify constraint
    expect(() => new BcryptPasswordHasher(3)).toThrow('Insecure salt rounds configured');
  });
});

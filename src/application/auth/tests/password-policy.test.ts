import { describe, it, expect } from 'vitest';
import { validatePasswordPolicy, assertPasswordPolicy } from '../services/PasswordPolicy';

describe('PasswordPolicy Unit Tests', () => {
  it('should pass with a strong valid password', () => {
    const result = validatePasswordPolicy('StrongPass123!');
    expect(result.valid).toBe(true);
    expect(result.violations.length).toBe(0);
    expect(() => assertPasswordPolicy('StrongPass123!')).not.toThrow();
  });

  it('should fail when password is too short', () => {
    const result = validatePasswordPolicy('S1!a');
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('PASSWORD_TOO_SHORT');
  });

  it('should fail when password has no uppercase letter', () => {
    const result = validatePasswordPolicy('strongpass123!');
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('PASSWORD_MISSING_UPPERCASE');
  });

  it('should fail when password has no lowercase letter', () => {
    const result = validatePasswordPolicy('STRONGPASS123!');
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('PASSWORD_MISSING_LOWERCASE');
  });

  it('should fail when password has no number', () => {
    const result = validatePasswordPolicy('StrongPassword!');
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('PASSWORD_MISSING_NUMBER');
  });

  it('should fail when password has no symbol', () => {
    const result = validatePasswordPolicy('StrongPass1234');
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('PASSWORD_MISSING_SYMBOL');
  });

  it('should fail when password is empty or only whitespace', () => {
    const resultVar = validatePasswordPolicy('');
    expect(resultVar.valid).toBe(false);
    expect(resultVar.violations).toContain('PASSWORD_REQUIRED');

    const resultSpaces = validatePasswordPolicy('            ');
    expect(resultSpaces.valid).toBe(false);
    expect(resultSpaces.violations).toContain('PASSWORD_CONTAINS_WHITESPACE_ONLY');
  });

  it('should fail for common passwords', () => {
    const result = validatePasswordPolicy('Password123!');
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('PASSWORD_TOO_COMMON');
  });

  it('assertPasswordPolicy should throw controlled error without original raw password', () => {
    const rawSecretToTest = 'Short1!';
    let caughtError: Error | null = null;
    try {
      assertPasswordPolicy(rawSecretToTest);
    } catch (e: any) {
      caughtError = e;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toContain('Password policy violated');
    expect(caughtError!.message).not.toContain(rawSecretToTest);
  });
});

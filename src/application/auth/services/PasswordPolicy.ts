export type PasswordPolicyViolation =
  | 'PASSWORD_REQUIRED'
  | 'PASSWORD_TOO_SHORT'
  | 'PASSWORD_TOO_LONG'
  | 'PASSWORD_MISSING_UPPERCASE'
  | 'PASSWORD_MISSING_LOWERCASE'
  | 'PASSWORD_MISSING_NUMBER'
  | 'PASSWORD_MISSING_SYMBOL'
  | 'PASSWORD_CONTAINS_WHITESPACE_ONLY'
  | 'PASSWORD_TOO_COMMON';

export interface PasswordPolicyResult {
  valid: boolean;
  violations: PasswordPolicyViolation[];
}

const COMMON_PASSWORDS = [
  'password123!',
  'senha123!',
  'admin123!',
  '123456789',
  'password',
  'senha',
  'any_obvious_example'
];

export function validatePasswordPolicy(password: string): PasswordPolicyResult {
  const violations: PasswordPolicyViolation[] = [];

  if (!password) {
    violations.push('PASSWORD_REQUIRED');
    return { valid: false, violations };
  }

  if (password.trim().length === 0) {
    violations.push('PASSWORD_CONTAINS_WHITESPACE_ONLY');
    return { valid: false, violations };
  }

  if (password.length < 12) {
    violations.push('PASSWORD_TOO_SHORT');
  }

  if (password.length > 128) {
    violations.push('PASSWORD_TOO_LONG');
  }

  if (!/[A-Z]/.test(password)) {
    violations.push('PASSWORD_MISSING_UPPERCASE');
  }

  if (!/[a-z]/.test(password)) {
    violations.push('PASSWORD_MISSING_LOWERCASE');
  }

  if (!/[0-9]/.test(password)) {
    violations.push('PASSWORD_MISSING_NUMBER');
  }

  // Symbol check: anything that is not alphanumeric or whitespace, or standard special chars
  // Let's use /[^A-Za-z0-9\s]/
  if (!/[^A-Za-z0-9\s]/.test(password)) {
    violations.push('PASSWORD_MISSING_SYMBOL');
  }

  const lowerPassword = password.toLowerCase();
  const isCommon = COMMON_PASSWORDS.some(common => lowerPassword.includes(common));
  if (isCommon) {
    violations.push('PASSWORD_TOO_COMMON');
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

export function assertPasswordPolicy(password: string): void {
  const result = validatePasswordPolicy(password);
  if (!result.valid) {
    throw new Error(`Password policy violated: ${result.violations.join(', ')}`);
  }
}

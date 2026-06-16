import { describe, it, expect } from 'vitest';
import { maskSecret, FORBIDDEN_FILE_PATS } from '../scripts/check-secret-leaks';

describe('Secret Scanner Unit Tests', () => {
  it('should mask postgres credentials in database URLs', () => {
    const rawUrl = 'postgresql://admin_user:my-super-secret-password-123@localhost:5432/yopoy_db';
    const masked = maskSecret(rawUrl);
    expect(masked).toContain('***:***');
    expect(masked).not.toContain('my-super-secret-password');
  });

  it('should mask hardcoded secret key assignments', () => {
    const codeLine = 'const JWT_SECRET = "super_duper_private_key_that_should_not_show"';
    const masked = maskSecret(codeLine);
    expect(masked).toContain('JWT_SECRET');
    expect(masked).toContain('****');
    expect(masked).not.toContain('super_duper_private_key');
  });

  it('should correctly match forbidden files using patterns', () => {
    const envFile = 'dir/subdir/.env';
    const envLocal = '.env.local';
    const pemKey = 'certs/sefaz-prod.pem';
    const safeFile = 'src/components/MyComponent.tsx';

    const matchEnv = FORBIDDEN_FILE_PATS.some(reg => reg.test(envFile));
    const matchEnvLocal = FORBIDDEN_FILE_PATS.some(reg => reg.test(envLocal));
    const matchPem = FORBIDDEN_FILE_PATS.some(reg => reg.test(pemKey));
    const matchSafe = FORBIDDEN_FILE_PATS.some(reg => reg.test(safeFile));

    expect(matchEnv).toBe(true);
    expect(matchEnvLocal).toBe(true);
    expect(matchPem).toBe(true);
    expect(matchSafe).toBe(false);
  });
});

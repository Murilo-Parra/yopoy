import { describe, it, expect } from 'vitest';
import { LOCKED_KEYS, ALLOWED_VALUES } from '../scripts/check-production-locks';

describe('Production Locks Unit Tests', () => {
  it('should identify all required secure production lock keywords', () => {
    expect(LOCKED_KEYS).toContain('YOPOY_PRODUCTION_V2_ENABLED');
    expect(LOCKED_KEYS).toContain('SEFAZ_REAL_ENABLED');
    expect(LOCKED_KEYS).toContain('PAYMENT_GATEWAY_LIVE');
    expect(LOCKED_KEYS).toContain('STRIPE_LIVE');
  });

  it('should only permit mock/sandbox/false values', () => {
    expect(ALLOWED_VALUES).toContain('false');
    expect(ALLOWED_VALUES).toContain('sandbox');
    expect(ALLOWED_VALUES).toContain('mock');
    expect(ALLOWED_VALUES).toContain('dry-run');
    expect(ALLOWED_VALUES).toContain('disabled');
    
    // Ensure "true" is never an allowed value
    expect(ALLOWED_VALUES).not.toContain('true');
  });

  it('should successfully test patterns against locked keys', () => {
    const checkLine = (line: string, key: string): boolean => {
      const matchRegex = new RegExp(`\\b${key}\\b\\s*[:=]\\s*['"\`]?([a-zA-Z0-9_\\-]+)['"\`]?`, 'i');
      const match = line.match(matchRegex);
      if (match) {
        const val = match[1].toLowerCase();
        return ALLOWED_VALUES.includes(val);
      }
      return true; // No key match, so it's safe
    };

    expect(checkLine('SEFAZ_REAL_ENABLED=true', 'SEFAZ_REAL_ENABLED')).toBe(false); // Fails audit
    expect(checkLine('SEFAZ_REAL_ENABLED=false', 'SEFAZ_REAL_ENABLED')).toBe(true);  // Passes audit
    expect(checkLine('STRIPE_LIVE="sandbox"', 'STRIPE_LIVE')).toBe(true);           // Passes audit
    expect(checkLine('PAYMENT_GATEWAY_LIVE = "true"', 'PAYMENT_GATEWAY_LIVE')).toBe(false); // Fails audit
  });
});

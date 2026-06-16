import { describe, it, expect } from 'vitest';
import { NodeCryptoSessionTokenService } from '../NodeCryptoSessionTokenService';

describe('NodeCryptoSessionTokenService Unit Tests', () => {
  it('generateSessionToken should generate non-empty rawToken and valid hash details', () => {
    const service = new NodeCryptoSessionTokenService();
    const tokenResult = service.generateSessionToken();

    expect(tokenResult.rawToken).toBeDefined();
    expect(tokenResult.rawToken.length).toBeGreaterThan(20);
    expect(tokenResult.tokenHash).toBeDefined();
    expect(tokenResult.tokenHash.startsWith('sha256:')).toBe(true);
    expect(tokenResult.tokenHash).not.toContain(tokenResult.rawToken);
    
    // Future expiration check
    const now = new Date();
    expect(tokenResult.expiresAt.getTime()).toBeGreaterThan(now.getTime());
  });

  it('hashSessionToken should be deterministic and different from other tokens', () => {
    const service = new NodeCryptoSessionTokenService();
    const tokenA = 'sample_token_value_a';
    const tokenB = 'sample_token_value_b';

    const hashA1 = service.hashSessionToken(tokenA);
    const hashA2 = service.hashSessionToken(tokenA);
    const hashB = service.hashSessionToken(tokenB);

    expect(hashA1).toBe(hashA2);
    expect(hashA1).not.toBe(hashB);
  });

  it('verifySessionToken should accept correct token and reject wrong/invalid hashes', () => {
    const service = new NodeCryptoSessionTokenService();
    const tokenResult = service.generateSessionToken();

    const isMatch = service.verifySessionToken(tokenResult.rawToken, tokenResult.tokenHash);
    const isMismatch = service.verifySessionToken('completely_unrelated_token', tokenResult.tokenHash);
    const isInvalidHash = service.verifySessionToken(tokenResult.rawToken, 'invalid_formatted_hash');
    const isEmptyHash = service.verifySessionToken(tokenResult.rawToken, '');

    expect(isMatch).toBe(true);
    expect(isMismatch).toBe(false);
    expect(isInvalidHash).toBe(false);
    expect(isEmptyHash).toBe(false);
  });

  it('should reject invalid TTL parameters with controlled throws', () => {
    const service = new NodeCryptoSessionTokenService();

    expect(() => service.generateSessionToken({ ttlSeconds: -10 })).toThrow('TTL must be a positive number of seconds');
    expect(() => service.generateSessionToken({ ttlSeconds: 0 })).toThrow('TTL must be a positive number of seconds');
    // Exceeding 30 days maximum
    expect(() => service.generateSessionToken({ ttlSeconds: 40 * 24 * 3600 })).toThrow('TTL exceeds maximum allowed duration');
  });
});

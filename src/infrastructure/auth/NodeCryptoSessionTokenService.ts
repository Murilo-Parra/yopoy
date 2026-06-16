import crypto from 'node:crypto';
import { SessionTokenService, GeneratedSessionToken } from '../../application/auth/services/SessionTokenService';

export class NodeCryptoSessionTokenService implements SessionTokenService {
  private readonly defaultTtlSeconds = 7 * 24 * 60 * 60; // 7 days
  private readonly maxTtlSeconds = 30 * 24 * 60 * 60; // 30 days

  generateSessionToken(input?: { ttlSeconds?: number }): GeneratedSessionToken {
    const ttl = input?.ttlSeconds !== undefined ? input.ttlSeconds : this.defaultTtlSeconds;

    if (ttl <= 0) {
      throw new Error('TTL must be a positive number of seconds');
    }

    if (ttl > this.maxTtlSeconds) {
      throw new Error('TTL exceeds maximum allowed duration of 30 days');
    }

    // Generate cryptographically secure 48 bytes token
    const tokenBytes = crypto.randomBytes(48);
    const rawToken = tokenBytes.toString('base64url');

    // Hash the token
    const tokenHash = this.hashSessionToken(rawToken);

    const expiresAt = new Date(Date.now() + ttl * 1000);

    return {
      rawToken,
      tokenHash,
      expiresAt,
    };
  }

  hashSessionToken(rawToken: string): string {
    if (!rawToken) {
      throw new Error('Raw token cannot be empty');
    }
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    return `sha256:${hash}`;
  }

  verifySessionToken(rawToken: string, tokenHash: string): boolean {
    if (!rawToken || !tokenHash) {
      return false;
    }

    try {
      const computedHash = this.hashSessionToken(rawToken);

      const a = Buffer.from(computedHash, 'utf8');
      let b = Buffer.from(tokenHash, 'utf8');

      let lengthsMatch = true;
      if (a.length !== b.length) {
        lengthsMatch = false;
        b = a; // Assign same-length buffer to prevent timing-safe unequal length exception
      }

      const match = crypto.timingSafeEqual(a, b);
      return lengthsMatch && match;
    } catch {
      return false;
    }
  }
}

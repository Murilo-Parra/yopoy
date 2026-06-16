export interface GeneratedSessionToken {
  rawToken: string;
  tokenHash: string;
  expiresAt: Date;
}

export interface SessionTokenService {
  generateSessionToken(input?: { ttlSeconds?: number }): GeneratedSessionToken;
  hashSessionToken(rawToken: string): string;
  verifySessionToken(rawToken: string, tokenHash: string): boolean;
}

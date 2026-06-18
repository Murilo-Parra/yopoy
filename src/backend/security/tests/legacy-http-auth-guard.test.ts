import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { canUseLegacyBearerAuth } from '../LegacyHttpAuthGuard';
import type { LegacyHttpAuthRequest } from '../LegacyHttpAuthGuard';

describe('LegacyHttpAuthGuard', () => {
  describe('canUseLegacyBearerAuth', () => {
    it('1. bloqueia Bearer com NODE_ENV undefined', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: undefined, enabledFlag: 'true' })).toBe(false);
    });

    it('2. bloqueia Bearer em production', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'production', enabledFlag: 'true' })).toBe(false);
    });

    it('3. bloqueia Bearer em staging', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'staging', enabledFlag: 'true' })).toBe(false);
    });

    it('4. bloqueia Bearer em preview', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'preview', enabledFlag: 'true' })).toBe(false);
    });

    it('5. bloqueia Bearer em homolog', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'homolog', enabledFlag: 'true' })).toBe(false);
    });

    it('6. bloqueia Bearer em development sem flag', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'development', enabledFlag: undefined })).toBe(false);
      expect(canUseLegacyBearerAuth({ nodeEnv: 'development', enabledFlag: 'false' })).toBe(false);
    });

    it('7. bloqueia Bearer em test sem flag', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'test', enabledFlag: undefined })).toBe(false);
      expect(canUseLegacyBearerAuth({ nodeEnv: 'test', enabledFlag: 'false' })).toBe(false);
    });

    it('8. permite Bearer somente em development com flag "true"', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'development', enabledFlag: 'true' })).toBe(true);
    });

    it('9. permite Bearer somente em test com flag "true"', () => {
      expect(canUseLegacyBearerAuth({ nodeEnv: 'test', enabledFlag: 'true' })).toBe(true);
    });
  });

  describe('Static Audits', () => {
    it('valida estaticamente protecao e segredos', () => {
      const serverPath = path.resolve(process.cwd(), 'server.ts');
      const authHandlersPath = path.resolve(process.cwd(), 'src/backend/auth/AuthHttpHandlers.ts');
      
      const serverContent = fs.readFileSync(serverPath, 'utf8');
      const authHandlersContent = fs.readFileSync(authHandlersPath, 'utf8');

      // server.ts contém YOPOY_ENABLE_LEGACY_BEARER_AUTH
      expect(serverContent).toContain('YOPOY_ENABLE_LEGACY_BEARER_AUTH');

      // TODO uso de startsWith("Bearer ") em server.ts está protegido
      const lines = serverContent.split('\n');
      lines.forEach((line) => {
        if (line.includes('startsWith("Bearer ")')) {
          expect(line).toMatch(/canUseLegacyBearerAuth|legacyBearerAllowed/);
        }
      });

      // src/backend/auth/AuthHttpHandlers.ts não contém req.query.companyId
      expect(authHandlersContent).not.toContain('req.query.companyId');

      // src/backend/auth/AuthHttpHandlers.ts não contém req.body.companyId
      expect(authHandlersContent).not.toContain('req.body.companyId');
    });
  });
});

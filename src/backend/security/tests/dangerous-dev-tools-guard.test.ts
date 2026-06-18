import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { canRunFactoryReset } from '../DangerousDevToolsGuard';
import type { DangerousDevToolRequest } from '../DangerousDevToolsGuard';

describe('DangerousDevToolsGuard', () => {
  it('1. bloqueia com NODE_ENV undefined', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: undefined,
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });

  it('2. bloqueia com NODE_ENV staging', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'staging',
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });

  it('3. bloqueia com NODE_ENV preview', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'preview',
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });

  it('4. bloqueia com NODE_ENV production mesmo com flag/token corretos', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'production',
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });

  it('5. permite somente development com flag true e token correto', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'development',
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(true);
  });

  it('6. permite somente test com flag true e token correto', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'test',
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(true);
  });

  it('7. bloqueia factory reset sem flag enabled', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'development',
      enabledFlag: undefined,
      expectedToken: 'secret',
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });

  it('8. bloqueia factory reset sem token esperado configurado', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'development',
      enabledFlag: 'true',
      expectedToken: undefined,
      providedToken: 'secret'
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });

  it('9. bloqueia factory reset sem token informado na requisicao', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'development',
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: undefined
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });

  it('10. bloqueia factory reset com token divergente', () => {
    const req: DangerousDevToolRequest = {
      nodeEnv: 'development',
      enabledFlag: 'true',
      expectedToken: 'secret',
      providedToken: 'wrong-secret'
    };
    expect(canRunFactoryReset(req)).toBe(false);
  });
});

describe('Static Server.ts Security Audits', () => {
  it('11. Valida estaticamente ausência e presença de padrões no server.ts', () => {
    const serverPath = path.resolve(process.cwd(), 'server.ts');
    const content = fs.readFileSync(serverPath, 'utf8');

    // 1. Não contém fake hash string
    const forbiddenMarker = ['NO_HASH', 'REQUIRED', 'HARDCODED', 'CHEAT'].join('_');
    expect(content).not.toContain(forbiddenMarker);

    // 2. Não contém URL PostgreSQL hardcoded com user:pass (regex)
    const urlMatcher = /postgresql:\/\/.*:.*@/;
    expect(urlMatcher.test(content)).toBe(false);

    // 3. Contém YOPOY_ENABLE_FACTORY_RESET
    expect(content).toContain('YOPOY_ENABLE_FACTORY_RESET');

    // 4. Contém YOPOY_FACTORY_RESET_TOKEN
    expect(content).toContain('YOPOY_FACTORY_RESET_TOKEN');

    // 5. Contém x-yopoy-dev-reset-token
    expect(content).toContain('x-yopoy-dev-reset-token');

    // 6. Contém canRunFactoryReset
    expect(content).toContain('canRunFactoryReset');

    // 7. O bloco Admin Users contém restriçōes adequadas e não contém fallback PostgreSQL
    const adminUsersBlockMatch = content.match(/\/\/ Composição Módulo 48\.2-J-F: Admin Users[\s\S]*?app\.use\("\/api\/admin", adminUsersRouter\);/);
    expect(adminUsersBlockMatch).not.toBeNull();
    if (adminUsersBlockMatch) {
      const block = adminUsersBlockMatch[0];
      expect(block).toContain('const adminUsersDatabaseUrl = process.env.DATABASE_URL;');
      expect(block).toContain('if (!adminUsersDatabaseUrl)');
      expect(block).not.toContain('postgresql://');
    }

    // 8. Não retorna err.message no endpoint de factory reset
    const factoryResetStart = content.indexOf("app.post('/api/system/factory-reset'");
    expect(factoryResetStart).toBeGreaterThanOrEqual(0);

    const nextRouteStart = content.indexOf("app.", factoryResetStart + 1);
    const factoryResetBlock =
      nextRouteStart === -1
        ? content.slice(factoryResetStart)
        : content.slice(factoryResetStart, nextRouteStart);

    expect(factoryResetBlock).toContain('canRunFactoryReset');
    expect(factoryResetBlock).toContain('YOPOY_ENABLE_FACTORY_RESET');
    expect(factoryResetBlock).toContain('YOPOY_FACTORY_RESET_TOKEN');
    expect(factoryResetBlock).toContain('x-yopoy-dev-reset-token');
    expect(factoryResetBlock).toContain('FACTORY_RESET_FAILED');
    expect(factoryResetBlock).not.toContain('err.message');
  });
});

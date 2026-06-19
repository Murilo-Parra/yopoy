import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Server fiscal authorization type safety 48.2-P', () => {
  function readServer(): string {
    return fs.readFileSync(path.resolve(process.cwd(), 'server.ts'), 'utf8');
  }

  it('valida tipagem estrita dos helpers fiscais de autorização', () => {
    const content = readServer();
    const helperNames = [
      'isUserAuthorizedForNfeWrite',
      'isUserAuthorizedForNfceWrite',
      'isUserAuthorizedForDanfe',
      'isUserAuthorizedForQuery',
    ];

    expect(content).toContain('type LegacyActiveSession');

    for (const helperName of helperNames) {
      const helperLine = content
        .split('\n')
        .find((line) => line.includes(`const ${helperName} = (`));

      expect(helperLine).toBeDefined();
      expect(helperLine).toContain('LegacyActiveSession');

      const looseSessionPattern = ['session', ': ', 'any'].join('');
      expect(helperLine).not.toContain(looseSessionPattern);
    }
  });

  it('preserva Legacy Bearer Guard e Admin Users aprovado', () => {
    const content = readServer();

    expect(content).toContain('canUseLegacyBearerAuth');
    expect(content).toContain('YOPOY_ENABLE_LEGACY_BEARER_AUTH');
    expect(content).toContain('legacyBearerAllowed');

    expect(content).toContain('adminUsersRouter');
    expect(content).toContain('app.use("/api/admin", adminUsersRouter);');

    const blockedRoutesPattern = ['admin', 'Routes', 'Router'].join('');
    const blockedUnitPattern = ['local', 'Uow'].join('');
    const blockedOperationsPattern = ['admin', 'Ops'].join('');

    expect(content).not.toContain(blockedRoutesPattern);
    expect(content).not.toContain(blockedUnitPattern);
    expect(content).not.toContain(blockedOperationsPattern);
  });
});

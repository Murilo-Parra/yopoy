import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Server Session Type Safety 48.2-M-B', () => {
  it('valida o saneamento tipado do bloco de sessão no server.ts', () => {
    const serverPath = path.resolve(process.cwd(), 'server.ts');
    const content = fs.readFileSync(serverPath, 'utf8');

    expect(content).toContain('type LegacyValidatedSession');
    expect(content).toContain('type LegacyActiveSession');
    expect(content).toContain('type RequestWithLegacySession');
    expect(content).toContain('function attachLegacySessionToRequest');
    expect(content).toContain('attachLegacySessionToRequest(req, session)');
    expect(content).toContain('Promise<LegacyActiveSession | null>');

    const requestAsAnyPattern = ['(', 'req', ' as ', 'any', ').session'].join('');
    const promiseAnyPattern = ['Promise<', 'any', ' | null>'].join('');

    expect(content).not.toContain(requestAsAnyPattern);
    expect(content).not.toContain(promiseAnyPattern);

    expect(content).toContain('canUseLegacyBearerAuth');
    expect(content).toContain('YOPOY_ENABLE_LEGACY_BEARER_AUTH');
    expect(content).toContain('legacyBearerAllowed');
  });

  it('preserva o bloco Admin Users aprovado', () => {
    const serverPath = path.resolve(process.cwd(), 'server.ts');
    const content = fs.readFileSync(serverPath, 'utf8');

    expect(content).toContain('adminUsersDatabaseUrl');
    expect(content).toContain('adminUsersExecutor');
    expect(content).toContain('adminUsersUnitOfWork');
    expect(content).toContain('adminUsersOperations');
    expect(content).toContain('adminUsersHandlers');
    expect(content).toContain('adminUsersRouter');
    expect(content).toContain('app.use("/api/admin", adminUsersRouter);');

    const badRouterPattern = ['admin', 'Routes', 'Router'].join('');
    const badUowPattern = ['local', 'Uow'].join('');
    const badOpsPattern = ['admin', 'Ops'].join('');

    expect(content).not.toContain(badRouterPattern);
    expect(content).not.toContain(badUowPattern);
    expect(content).not.toContain(badOpsPattern);
  });
});

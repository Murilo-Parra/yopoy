import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

function readProjectFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf8');
}

describe('Auth regression guard', () => {
  it('protege invariantes estáticas do AuthHttpHandlers', () => {
    const content = readProjectFile('src/backend/auth/AuthHttpHandlers.ts');

    expect(content).toContain("import { resolveAuthCompanyId, resolveAuthHeaderString } from './AuthCompanyIdResolver';");
    expect(content).toContain("import { resolveAuthRequirePermissionPayload } from './AuthRequirePermissionPayloadResolver';");
    expect(content).toContain("import type { AuthPermission } from '../../application/auth/types';");

    expect(content).toContain('const companyId = resolveAuthCompanyId(req);');
    expect(content).toContain("resolveAuthHeaderString(req.headers, 'x-yopoy-company-id')");
    expect(content).toContain('resolveAuthRequirePermissionPayload(req.body)');

    expect(content).not.toContain("req.headers['x-yopoy-company-id'] as string");
    expect(content).not.toContain('const { companyId, permission } = req.body;');

    const passwordPolicyBranchStart = content.indexOf("if (msg && msg.startsWith('Password policy violated'))");
    const passwordPolicyBranchEnd = content.indexOf("console.error('Company registration handler error:', err);");

    expect(passwordPolicyBranchStart).toBeGreaterThanOrEqual(0);
    expect(passwordPolicyBranchEnd).toBeGreaterThan(passwordPolicyBranchStart);

    const passwordPolicyBranch = content.slice(passwordPolicyBranchStart, passwordPolicyBranchEnd);

    expect(passwordPolicyBranch).toContain("Senha não atende à política de segurança.");
    expect(passwordPolicyBranch).toContain(
      "return AuthHttpErrors.sendInvalidInput(res, 'Senha não atende à política de segurança.');",
    );
    expect(passwordPolicyBranch).not.toContain('return AuthHttpErrors.sendInvalidInput(res, msg);');

    expect(content).not.toContain("import { AuthPermission } from '../../application/auth/types';");
    expect(content).not.toContain('const companyIdFromBody');
    expect(content).not.toContain('const companyIdFromYopoyHeader');
    expect(content).not.toContain('const companyIdFromLegacyHeader');
    expect(content).not.toContain('req.body.companyId');
  });

  it('protege invariantes estáticas do AuthRequirePermissionPayloadResolver', () => {
    const content = readProjectFile('src/backend/auth/AuthRequirePermissionPayloadResolver.ts');

    expect(content).toContain("import type { AuthPermission } from '../../application/auth/types';");
    expect(content).toContain('export interface AuthRequirePermissionPayload');
    expect(content).toContain('export function resolveAuthRequirePermissionPayload(');
    expect(content).toContain('body: unknown');
    expect(content).toContain('companyId: companyId.trim()');

    expect(content).not.toContain("from 'express'");
    expect(content).not.toContain('from "express"');
    expect(content).not.toContain('import type { Request }');
    expect(content).not.toContain('import { Request }');
    expect(content).not.toContain('as unknown as Request');

    const asAnyPattern = ['as', 'any'].join(' ');
    const colonAnyPattern = [':', 'any'].join(' ');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');

    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(promiseAnyPattern);
  });

  it('protege invariantes estáticas do AuthCompanyIdResolver', () => {
    const content = readProjectFile('src/backend/auth/AuthCompanyIdResolver.ts');

    expect(content).toContain('export interface AuthCompanyIdRequest');
    expect(content).toContain('export function resolveAuthHeaderString(');
    expect(content).toContain('export function resolveAuthCompanyId(req: AuthCompanyIdRequest): string | undefined');
    expect(content).toContain('return value.trim();');
    expect(content).toContain('return companyIdBodyValue.trim();');
    expect(content).toContain("const yopoyCompanyHeader = resolveAuthHeaderString(req.headers, 'x-yopoy-company-id');");
    expect(content).toContain("const legacyCompanyHeader = resolveAuthHeaderString(req.headers, 'x-company-id');");
    expect(content).toContain('return yopoyCompanyHeader;');
    expect(content).toContain('return legacyCompanyHeader;');

    expect(content).not.toContain("from 'express'");
    expect(content).not.toContain('from "express"');
    expect(content).not.toContain('import type { Request }');
    expect(content).not.toContain('import { Request }');

    const asAnyPattern = ['as', 'any'].join(' ');
    const colonAnyPattern = [':', 'any'].join(' ');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');

    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(promiseAnyPattern);
  });

  it('protege invariantes estáticas do teste AuthCompanyIdResolver', () => {
    const content = readProjectFile('src/backend/auth/tests/auth-company-id-resolver.test.ts');

    const asUnknownAsRequestPattern = ['as', 'unknown', 'as', 'Request'].join(' ');
    const asAnyPattern = ['as', 'any'].join(' ');
    const colonAnyPattern = [':', 'any'].join(' ');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');

    expect(content).toContain('type AuthCompanyIdRequest');
    expect(content).toContain('headers não-string');

    expect(content).not.toContain(asUnknownAsRequestPattern);
    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(promiseAnyPattern);
  });

  it('protege invariantes estáticas do teste AuthRequirePermissionPayloadResolver', () => {
    const content = readProjectFile('src/backend/auth/tests/auth-require-permission-payload-resolver.test.ts');

    const asUnknownAsRequestPattern = ['as', 'unknown', 'as', 'Request'].join(' ');
    const asAnyPattern = ['as', 'any'].join(' ');
    const colonAnyPattern = [':', 'any'].join(' ');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');

    expect(content).not.toContain(asUnknownAsRequestPattern);
    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(promiseAnyPattern);
  });

  it('protege invariantes estáticas do teste de contrato de logout', () => {
    const content = readProjectFile('src/backend/auth/tests/auth-logout-company-id-contract.test.ts');

    const asAnyPattern = ['as', 'any'].join(' ');
    const colonAnyPattern = [':', 'any'].join(' ');
    const promiseAnyPattern = ['Promise', '<', 'an', 'y>'].join('');

    expect(content).not.toContain(asAnyPattern);
    expect(content).not.toContain(colonAnyPattern);
    expect(content).not.toContain(promiseAnyPattern);
  });
});

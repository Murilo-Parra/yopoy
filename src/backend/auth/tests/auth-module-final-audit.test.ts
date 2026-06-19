import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

function readProjectFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf8');
}

function removeStaticGuardAssertionLines(content: string): string {
  return content
    .split('\\n')
    .filter((line) => !line.includes('.not.toContain('))
    .join('\\n');
}

function expectNoForbiddenTypeSafetyPatterns(content: string): void {
  const searchableContent = removeStaticGuardAssertionLines(content);

  const forbiddenPatterns = [
    ['as', 'any'].join(' '),
    [':', 'any'].join(' '),
    ['Promise', '<', 'an', 'y>'].join(''),
    ['as', 'unknown', 'as', 'Request'].join(' '),
  ];

  for (const pattern of forbiddenPatterns) {
    expect(searchableContent).not.toContain(pattern);
  }
}

function expectPasswordPolicyBranchIsSafe(content: string): void {
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
}

describe('Auth module final static audit', () => {
  it('valida invariantes finais do AuthHttpHandlers', () => {
    const content = readProjectFile('src/backend/auth/AuthHttpHandlers.ts');

    expect(content).toContain("import { resolveAuthCompanyId, resolveAuthHeaderString } from './AuthCompanyIdResolver';");
    expect(content).toContain("import { resolveAuthRequirePermissionPayload } from './AuthRequirePermissionPayloadResolver';");
    expect(content).toContain("import type { AuthPermission } from '../../application/auth/types';");

    expect(content).toContain('const companyId = resolveAuthCompanyId(req);');
    expect(content).toContain("resolveAuthHeaderString(req.headers, 'x-yopoy-company-id')");
    expect(content).toContain('resolveAuthRequirePermissionPayload(req.body)');
    expect(content).toContain("return AuthHttpErrors.sendInvalidInput(res, 'Senha não atende à política de segurança.');");

    expectPasswordPolicyBranchIsSafe(content);

    expect(content).not.toContain("import { AuthPermission } from '../../application/auth/types';");
    expect(content).not.toContain("req.headers['x-yopoy-company-id'] as string");
    expect(content).not.toContain('const { companyId, permission } = req.body;');
    expect(content).not.toContain('const companyIdFromBody');
    expect(content).not.toContain('const companyIdFromYopoyHeader');
    expect(content).not.toContain('const companyIdFromLegacyHeader');
    expect(content).not.toContain('req.body.companyId');
  });

  it('valida invariantes finais do AuthCompanyIdResolver', () => {
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
    expectNoForbiddenTypeSafetyPatterns(content);
  });

  it('valida invariantes finais do AuthRequirePermissionPayloadResolver', () => {
    const content = readProjectFile('src/backend/auth/AuthRequirePermissionPayloadResolver.ts');

    expect(content).toContain("import type { AuthPermission } from '../../application/auth/types';");
    expect(content).toContain('export interface AuthRequirePermissionPayload');
    expect(content).toContain('export function resolveAuthRequirePermissionPayload(');
    expect(content).toContain('body: unknown');
    expect(content).toContain('companyId: companyId.trim()');
    expect(content).toContain('permission');

    expect(content).not.toContain("from 'express'");
    expect(content).not.toContain('from "express"');
    expect(content).not.toContain('import type { Request }');
    expect(content).not.toContain('import { Request }');
    expect(content).not.toContain("import { AuthPermission } from '../../application/auth/types';");
    expectNoForbiddenTypeSafetyPatterns(content);
  });

  it('valida type safety dos testes críticos do módulo auth', () => {
    const filesToAudit = [
      'src/backend/auth/tests/auth-company-id-resolver.test.ts',
      'src/backend/auth/tests/auth-require-permission-payload-resolver.test.ts',
      'src/backend/auth/tests/auth-logout-company-id-contract.test.ts',
      'src/backend/auth/tests/auth-regression-guard.test.ts',
      'src/backend/auth/tests/auth-http-handlers-type-safety.test.ts',
    ];

    for (const file of filesToAudit) {
      const content = readProjectFile(file);
      expectNoForbiddenTypeSafetyPatterns(content);
    }
  });
});

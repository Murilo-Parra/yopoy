import { describe, it, expect, beforeEach } from 'vitest';
import { RequirePermissionUseCase } from '../use-cases/RequirePermissionUseCase';
import { InMemoryAuthAuditRepository } from '../testing/InMemoryAuthAuditRepository';
import { AuthenticatedSession } from '../types';

describe('RequirePermissionUseCase Unit Tests', () => {
  let auditRepo: InMemoryAuthAuditRepository;
  let requireUseCase: RequirePermissionUseCase;

  beforeEach(() => {
    auditRepo = new InMemoryAuthAuditRepository();
    requireUseCase = new RequirePermissionUseCase(auditRepo);
  });

  it('owner should have unrestricted access to all resources', async () => {
    const session: AuthenticatedSession = {
      userId: 'usr_owner_1',
      email: 'owner@yopoy.com',
      companyId: 'com_yopoy',
      role: 'owner',
      permissions: ['company:read', 'company:update', 'audit:read', 'settings:update'], // Complete list or empty, handler will check roleHasPermission fallback
    };

    // Should pass without throwing errors
    await expect(
      requireUseCase.execute({
        session,
        permission: 'settings:update',
      })
    ).resolves.not.toThrow();

    await expect(
      requireUseCase.execute({
        session,
        permission: 'audit:read',
      })
    ).resolves.not.toThrow();

    expect(auditRepo.events.length).toBe(0); // Zero denied events
  });

  it('employee must be denied access to audit logs and log permission_denied', async () => {
    const session: AuthenticatedSession = {
      userId: 'usr_emp_1',
      email: 'employee@yopoy.com',
      companyId: 'com_yopoy',
      role: 'employee',
      permissions: ['customers:read', 'sales:create'], // standard list, lacks audit:read
    };

    await expect(
      requireUseCase.execute({
        session,
        permission: 'audit:read',
      })
    ).rejects.toThrow('Acesso negado. Permissão insuficiente');

    // Assure custom audit took place
    expect(auditRepo.events.length).toBe(1);
    expect(auditRepo.events[0].eventType).toBe('permission_denied');
    expect(auditRepo.events[0].description).toContain('audit:read');
  });

  it('support must be denied access to changing global settings', async () => {
    const session: AuthenticatedSession = {
      userId: 'usr_supp_1',
      email: 'support@yopoy.com',
      companyId: 'com_yopoy',
      role: 'support',
      permissions: ['company:read', 'users:read'], // standard list, lacks settings:update
    };

    await expect(
      requireUseCase.execute({
        session,
        permission: 'settings:update',
      })
    ).rejects.toThrow('Acesso negado. Permissão insuficiente');

    // Assure custom audit took place
    expect(auditRepo.events.length).toBe(1);
    expect(auditRepo.events[0].eventType).toBe('permission_denied');
    expect(auditRepo.events[0].description).toContain('settings:update');
  });
});

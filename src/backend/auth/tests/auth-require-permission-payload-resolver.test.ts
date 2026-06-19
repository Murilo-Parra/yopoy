import { describe, expect, it } from 'vitest';
import { resolveAuthRequirePermissionPayload } from '../AuthRequirePermissionPayloadResolver';

describe('AuthRequirePermissionPayloadResolver', () => {
  it('body undefined retorna undefined', () => {
    expect(resolveAuthRequirePermissionPayload(undefined)).toBeUndefined();
  });

  it('body null retorna undefined', () => {
    expect(resolveAuthRequirePermissionPayload(null)).toBeUndefined();
  });

  it('body string retorna undefined', () => {
    expect(resolveAuthRequirePermissionPayload('string params')).toBeUndefined();
  });

  it('companyId ausente retorna undefined', () => {
    expect(resolveAuthRequirePermissionPayload({
      permission: 'users:read',
    })).toBeUndefined();
  });

  it('companyId em branco retorna undefined', () => {
    expect(resolveAuthRequirePermissionPayload({
      companyId: '   ',
      permission: 'users:read',
    })).toBeUndefined();
  });

  it('permission ausente retorna undefined', () => {
    expect(resolveAuthRequirePermissionPayload({
      companyId: 'company-id',
    })).toBeUndefined();
  });

  it('permission inválida retorna undefined', () => {
    expect(resolveAuthRequirePermissionPayload({
      companyId: 'company-id',
      permission: 'invalid:permission:test',
    })).toBeUndefined();
  });

  it('payload válido retorna companyId trimado e permission preservada', () => {
    const result = resolveAuthRequirePermissionPayload({
      companyId: '  spaced-company-id  ',
      permission: 'users:read',
    });

    expect(result).toEqual({
      companyId: 'spaced-company-id',
      permission: 'users:read',
    });
  });
});

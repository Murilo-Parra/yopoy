import type { Request } from 'express';

export function resolveAuthCompanyId(req: Request): string | undefined {
  const { companyId: companyIdBodyValue } = (req.body || {}) as { companyId?: unknown };
  
  if (typeof companyIdBodyValue === 'string' && companyIdBodyValue.trim() !== '') {
    return companyIdBodyValue.trim();
  }
  
  if (typeof req.headers['x-yopoy-company-id'] === 'string' && req.headers['x-yopoy-company-id'].trim() !== '') {
    return req.headers['x-yopoy-company-id'].trim();
  }
  
  if (typeof req.headers['x-company-id'] === 'string' && req.headers['x-company-id'].trim() !== '') {
    return req.headers['x-company-id'].trim();
  }

  return undefined;
}

export interface AuthCompanyIdRequest {
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

export function resolveAuthCompanyId(req: AuthCompanyIdRequest): string | undefined {
  const { companyId: companyIdBodyValue } = (req.body || {}) as { companyId?: unknown };

  if (typeof companyIdBodyValue === 'string' && companyIdBodyValue.trim() !== '') {
    return companyIdBodyValue.trim();
  }

  const yopoyCompanyHeader = req.headers['x-yopoy-company-id'];
  if (typeof yopoyCompanyHeader === 'string' && yopoyCompanyHeader.trim() !== '') {
    return yopoyCompanyHeader.trim();
  }

  const legacyCompanyHeader = req.headers['x-company-id'];
  if (typeof legacyCompanyHeader === 'string' && legacyCompanyHeader.trim() !== '') {
    return legacyCompanyHeader.trim();
  }

  return undefined;
}

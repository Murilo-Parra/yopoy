export interface AuthCompanyIdRequest {
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

export function resolveAuthHeaderString(
  headers: Record<string, string | string[] | undefined>,
  headerName: string,
): string | undefined {
  const value = headers[headerName];

  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim();
  }

  return undefined;
}

export function resolveAuthCompanyId(req: AuthCompanyIdRequest): string | undefined {
  const { companyId: companyIdBodyValue } = (req.body || {}) as { companyId?: unknown };

  if (typeof companyIdBodyValue === 'string' && companyIdBodyValue.trim() !== '') {
    return companyIdBodyValue.trim();
  }

  const yopoyCompanyHeader = resolveAuthHeaderString(req.headers, 'x-yopoy-company-id');
  if (yopoyCompanyHeader) {
    return yopoyCompanyHeader;
  }

  const legacyCompanyHeader = resolveAuthHeaderString(req.headers, 'x-company-id');
  if (legacyCompanyHeader) {
    return legacyCompanyHeader;
  }

  return undefined;
}

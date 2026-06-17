export const YOPOY_COMPANY_ID_STORAGE_KEY = 'yopoy_company_id';

export function getYopoyCompanyIdHint(): string | null {
  try {
    return sessionStorage.getItem(YOPOY_COMPANY_ID_STORAGE_KEY);
  } catch {
    return null;
  }
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers || {});

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const companyId = getYopoyCompanyIdHint();
  if (companyId && !headers.has('X-Yopoy-Company-Id')) {
    headers.set('X-Yopoy-Company-Id', companyId);
  }

  return fetch(input, {
    ...init,
    credentials: 'include',
    headers
  });
}

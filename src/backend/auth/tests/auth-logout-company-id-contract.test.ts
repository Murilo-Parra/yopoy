import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { AuthHttpHandlers } from '../AuthHttpHandlers';
import { AuthCookieService } from '../AuthCookieService';

vi.mock('../AuthCookieService', () => ({
  AuthCookieService: {
    clearSessionCookie: vi.fn(),
    getSessionToken: vi.fn(),
  }
}));

describe('handleLogout Contract', () => {
  let handlers: AuthHttpHandlers;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockStatus: ReturnType<typeof vi.fn>;
  let mockJson: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Create a dummy UOW mock
    const mockUow = {
      transaction: vi.fn().mockImplementation(async (companyId, callback) => {
        // Just simulate empty transaction, we don't care about DB here
        return callback({});
      })
    };
    handlers = new AuthHttpHandlers(mockUow as unknown as ConstructorParameters<typeof AuthHttpHandlers>[0]);

    mockJson = vi.fn();
    mockStatus = vi.fn().mockReturnValue({ json: mockJson });

    mockReq = {
      headers: {},
      body: {}
    };

    mockRes = {
      status: mockStatus as unknown as (code: number) => Response,
      setHeader: vi.fn() as unknown as (name: string, value: string | number | readonly string[]) => Response,
    };

    vi.clearAllMocks();
  });

  it('retorna 400 se companyId não for enviado', async () => {
    await handlers.handleLogout(mockReq as Request, mockRes as Response);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({ ok: false, error: { code: 'INVALID_INPUT', message: 'companyId é obrigatório' } });
  });

  it('aceita companyId do body', async () => {
    mockReq.body = { companyId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' };
    vi.mocked(AuthCookieService.getSessionToken).mockReturnValue(undefined); // No cookie -> returns 200 early
    
    await handlers.handleLogout(mockReq as Request, mockRes as Response);
    
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ ok: true });
  });

  it('aceita companyId do header x-yopoy-company-id', async () => {
    mockReq.headers = { 'x-yopoy-company-id': 'f47ac10b-58cc-4372-a567-0e02b2c3d479' };
    vi.mocked(AuthCookieService.getSessionToken).mockReturnValue(undefined); 
    
    await handlers.handleLogout(mockReq as Request, mockRes as Response);
    
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ ok: true });
  });

  it('aceita companyId do header legado x-company-id', async () => {
    mockReq.headers = { 'x-company-id': 'f47ac10b-58cc-4372-a567-0e02b2c3d479' };
    vi.mocked(AuthCookieService.getSessionToken).mockReturnValue(undefined); 
    
    await handlers.handleLogout(mockReq as Request, mockRes as Response);
    
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ ok: true });
  });
});

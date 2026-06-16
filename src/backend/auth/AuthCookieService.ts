import { Request, Response } from 'express';

export class AuthCookieService {
  private static readonly COOKIE_NAME = 'yopoy_session';

  /**
   * Determina de forma segura se o cookie deve usar a diretiva Secure=true.
   * Não pode usar Secure=true em localhost via HTTP (caso contrário, o navegador não aceita o cookie localmente).
   */
  private static isSecure(req: Request): boolean {
    // 1. Se explicitamente configurado no .env
    if (process.env.AUTH_COOKIE_SECURE === 'true') {
      return true;
    }
    
    // 2. Se estiver em produção real
    if (process.env.NODE_ENV === 'production') {
      return true;
    }

    // 3. Respeitar X-Forwarded-Proto se o proxy for confiável
    if (process.env.TRUST_PROXY === 'true') {
      const forwardedProto = req.headers['x-forwarded-proto'];
      if (typeof forwardedProto === 'string' && forwardedProto.toLowerCase() === 'https') {
        return true;
      }
    }

    // 4. Verificação padrão do protocolo da req
    return req.secure;
  }

  /**
   * Seta o cookie yopoy_session com as configurações corretas de segurança.
   */
  public static setSessionCookie(req: Request, res: Response, rawToken: string, expiresAt: Date): void {
    const isSecure = this.isSecure(req);

    // Duração do cookie baseada na expiração do token
    const maxAge = expiresAt.getTime() - Date.now();

    res.cookie(this.COOKIE_NAME, rawToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: isSecure,
      maxAge: maxAge > 0 ? maxAge : undefined,
    });
  }

  /**
   * Limpa o cookie yopoy_session.
   */
  public static clearSessionCookie(req: Request, res: Response): void {
    const isSecure = this.isSecure(req);

    res.cookie(this.COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: isSecure,
      maxAge: 0,
      expires: new Date(0)
    });
  }

  /**
   * Extrai o token do cookie.
   */
  public static getSessionToken(req: Request): string | undefined {
    // Opcionalmente podemos ler de req.cookies se cookie-parser estiver configurado,
    // ou parsear manualmente o header Cookie para maior resiliência em testes
    if (req.cookies && req.cookies[this.COOKIE_NAME]) {
      return req.cookies[this.COOKIE_NAME];
    }

    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, pair) => {
        const parts = pair.split('=');
        const key = parts[0].trim();
        const value = parts[1];
        acc[key] = value ? decodeURIComponent(value) : '';
        return acc;
      }, {} as Record<string, string>);

      return cookies[this.COOKIE_NAME];
    }

    return undefined;
  }
}

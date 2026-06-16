import { Response } from 'express';

export class AuthHttpErrors {
  public static sendError(
    res: Response,
    statusCode: number,
    code: string,
    message: string
  ): void {
    res.status(statusCode).json({
      ok: false,
      error: {
        code,
        message
      }
    });
  }

  public static sendInvalidInput(res: Response, message: string = 'Dados inválidos.'): void {
    this.sendError(res, 400, 'INVALID_INPUT', message);
  }

  public static sendInvalidCredentials(res: Response, message: string = 'E-mail ou senha inválidos.'): void {
    this.sendError(res, 401, 'INVALID_CREDENTIALS', message);
  }

  public static sendLocked(res: Response, message: string = 'Conta bloqueada temporariamente.'): void {
    this.sendError(res, 403, 'USER_LOCKED', message);
  }

  public static sendUnauthorized(res: Response, message: string = 'Não autorizado.'): void {
    this.sendError(res, 401, 'UNAUTHORIZED', message);
  }

  public static sendForbidden(res: Response, message: string = 'Acesso proibido.'): void {
    this.sendError(res, 403, 'FORBIDDEN', message);
  }

  public static sendNotImplementedSafely(res: Response, message: string = 'Bootstrap de empresa ainda não suportado sob as regras RLS atuais. Será tratado no módulo 48.2-G.'): void {
    this.sendError(res, 501, 'BOOTSTRAP_NOT_IMPLEMENTED_SAFELY', message);
  }

  public static sendInternalServerError(res: Response): void {
    this.sendError(res, 500, 'INTERNAL_SERVER_ERROR', 'Erro interno no servidor.');
  }
}

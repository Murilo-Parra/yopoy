import { Request, Response } from 'express';
import { LocalPostgresUnitOfWork } from '../../infrastructure/postgres/unit-of-work/LocalPostgresUnitOfWork';
import { PostgresAuthUserRepository } from '../../infrastructure/postgres/auth/PostgresAuthUserRepository';
import { PostgresMembershipRepository } from '../../infrastructure/postgres/auth/PostgresMembershipRepository';
import { PostgresAuthSessionRepository } from '../../infrastructure/postgres/auth/PostgresAuthSessionRepository';
import { PostgresAuthAuditRepository } from '../../infrastructure/postgres/auth/PostgresAuthAuditRepository';
import { PostgresCompanyAuthRepository } from '../../infrastructure/postgres/auth/PostgresCompanyAuthRepository';
import { BcryptPasswordHasher } from '../../infrastructure/auth/BcryptPasswordHasher';
import { NodeCryptoSessionTokenService } from '../../infrastructure/auth/NodeCryptoSessionTokenService';

// Import Use Cases
import { LoginUseCase } from '../../application/auth/use-cases/LoginUseCase';
import { ValidateSessionUseCase } from '../../application/auth/use-cases/ValidateSessionUseCase';
import { LogoutUseCase } from '../../application/auth/use-cases/LogoutUseCase';
import { RequirePermissionUseCase } from '../../application/auth/use-cases/RequirePermissionUseCase';
import { RegisterCompanyUseCase } from '../../application/auth/use-cases/RegisterCompanyUseCase';

// Import Custom Errors
import {
  AuthInvalidCredentialsError,
  AuthUserLockedError,
  AuthValidationError,
  AuthMembershipNotFoundError,
  AuthPermissionDeniedError
} from '../../application/auth/AuthErrors';

// Import helpers
import { AuthCookieService } from './AuthCookieService';
import { AuthRequestValidators } from './AuthRequestValidators';
import { AuthHttpErrors } from './AuthHttpErrors';

export class AuthHttpHandlers {
  constructor(private readonly uow: LocalPostgresUnitOfWork) {}

  /**
   * POST /api/auth/login
   */
  public handleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AuthRequestValidators.validateLoginInput(req.body);
      if (!validation.valid) {
        return AuthHttpErrors.sendInvalidInput(res, validation.message);
      }

      const { companyId, email, password } = req.body;

      const result = await this.uow.transaction(companyId, async (tx) => {
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const membershipRepository = new PostgresMembershipRepository(tx.executor);
        const sessionRepository = new PostgresAuthSessionRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        
        const passwordHasher = new BcryptPasswordHasher(10);
        const tokenService = new NodeCryptoSessionTokenService();

        const loginUseCase = new LoginUseCase(
          userRepository,
          membershipRepository,
          sessionRepository,
          auditRepository,
          tokenService,
          passwordHasher
        );

        return await loginUseCase.execute({ email, password, companyId });
      });

      // Set session cookie securely
      AuthCookieService.setSessionCookie(req, res, result.rawSessionToken, result.session.expiresAt);

      const userEmail = result.user.email;
      const response: any = {
        ok: true,
        user: {
          id: result.user.id,
          companyId: result.user.companyId || result.membership.companyId,
          fullName: (result.user as any).fullName || (result.user as any).name || userEmail.split('@')[0],
          email: userEmail,
          role: result.membership.role
        },
        session: {
          id: result.session.id,
          expiresAt: result.session.expiresAt.toISOString()
        }
      };

      // AUTH_DEBUG_RETURN_TOKEN flag support for raw token return in response during testing
      if (process.env.AUTH_DEBUG_RETURN_TOKEN === 'true') {
        response.rawSessionToken = result.rawSessionToken;
      }

      res.status(200).json(response);
    } catch (err: any) {
      const errorCode = err?.code;

      if (errorCode === 'AUTH_INVALID_CREDENTIALS' || err instanceof AuthInvalidCredentialsError) {
        return AuthHttpErrors.sendInvalidCredentials(res);
      }

      if (errorCode === 'AUTH_USER_LOCKED' || err instanceof AuthUserLockedError) {
        return AuthHttpErrors.sendLocked(res, err.message);
      }

      if (errorCode === 'AUTH_VALIDATION_ERROR' || err instanceof AuthValidationError) {
        return AuthHttpErrors.sendInvalidInput(res, err.message);
      }

      if (errorCode === 'AUTH_MEMBERSHIP_NOT_FOUND' || err instanceof AuthMembershipNotFoundError) {
        return AuthHttpErrors.sendUnauthorized(res, 'Associação de usuário não encontrada ou inativa.');
      }

      console.error('Login process error:', err);
      return AuthHttpErrors.sendInternalServerError(res);
    }
  };

  /**
   * GET /api/auth/session
   */
  public handleSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req.headers['x-yopoy-company-id'] || req.query.companyId) as string;
      if (!companyId || !AuthRequestValidators.isValidUuid(companyId)) {
        res.status(200).json({ authenticated: false });
        return;
      }

      const rawSessionToken = AuthCookieService.getSessionToken(req);
      if (!rawSessionToken) {
        res.status(200).json({ authenticated: false });
        return;
      }

      const result = await this.uow.transaction(companyId, async (tx) => {
        const sessionRepository = new PostgresAuthSessionRepository(tx.executor);
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const membershipRepository = new PostgresMembershipRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const tokenService = new NodeCryptoSessionTokenService();

        const validateSessionUseCase = new ValidateSessionUseCase(
          sessionRepository,
          userRepository,
          membershipRepository,
          auditRepository,
          tokenService
        );

        return await validateSessionUseCase.execute({ rawSessionToken });
      });

      if (!result.authenticated || !result.session) {
        res.status(200).json({ authenticated: false });
        return;
      }

      res.status(200).json({
        authenticated: true,
        session: {
          id: result.session.userId,
          companyId: result.session.companyId,
          userId: result.session.userId,
          email: result.session.email,
          role: result.session.role,
          permissions: result.session.permissions
        }
      });
    } catch (err) {
      console.error('Session validation process error:', err);
      res.status(200).json({ authenticated: false });
    }
  };

  /**
   * POST /api/auth/logout
   */
  public handleLogout = async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = (req.headers['x-yopoy-company-id'] || req.query.companyId || req.body.companyId) as string;
      if (!companyId || !AuthRequestValidators.isValidUuid(companyId)) {
        AuthCookieService.clearSessionCookie(req, res);
        res.status(400).json({ ok: false, error: { code: 'INVALID_INPUT', message: 'companyId é obrigatório' } });
        return;
      }

      const rawSessionToken = AuthCookieService.getSessionToken(req);
      if (!rawSessionToken) {
        AuthCookieService.clearSessionCookie(req, res);
        res.status(200).json({ ok: true });
        return;
      }

      await this.uow.transaction(companyId, async (tx) => {
        const sessionRepository = new PostgresAuthSessionRepository(tx.executor);
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const membershipRepository = new PostgresMembershipRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const tokenService = new NodeCryptoSessionTokenService();

        const tokenHash = tokenService.hashSessionToken(rawSessionToken);
        const sessionRecord = await sessionRepository.findByTokenHash(tokenHash);

        if (sessionRecord) {
          const logoutUseCase = new LogoutUseCase(sessionRepository, auditRepository);
          await logoutUseCase.execute({
            sessionId: sessionRecord.id,
            companyId,
            userId: sessionRecord.userId
          });
        }
      });

      AuthCookieService.clearSessionCookie(req, res);
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Logout process error:', err);
      AuthCookieService.clearSessionCookie(req, res);
      res.status(200).json({ ok: true });
    }
  };

  /**
   * POST /api/auth/require-permission
   */
  public handleRequirePermission = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AuthRequestValidators.validateRequirePermissionInput(req.body);
      if (!validation.valid) {
        return AuthHttpErrors.sendInvalidInput(res, validation.message);
      }

      const { companyId, permission } = req.body;

      const rawSessionToken = AuthCookieService.getSessionToken(req);
      if (!rawSessionToken) {
        res.status(200).json({ allowed: false });
        return;
      }

      const allowed = await this.uow.transaction(companyId, async (tx) => {
        const sessionRepository = new PostgresAuthSessionRepository(tx.executor);
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const membershipRepository = new PostgresMembershipRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const tokenService = new NodeCryptoSessionTokenService();

        const validateSessionUseCase = new ValidateSessionUseCase(
          sessionRepository,
          userRepository,
          membershipRepository,
          auditRepository,
          tokenService
        );

        const sessionOutput = await validateSessionUseCase.execute({ rawSessionToken });
        if (!sessionOutput.authenticated || !sessionOutput.session) {
          return false;
        }

        const requirePermissionUseCase = new RequirePermissionUseCase(auditRepository);
        try {
          await requirePermissionUseCase.execute({
            session: sessionOutput.session,
            permission: permission as any
          });
          return true;
        } catch (err) {
          if (err instanceof AuthPermissionDeniedError) {
            return false;
          }
          throw err;
        }
      });

      res.status(200).json({ allowed });
    } catch (err) {
      console.error('Permission validation process error:', err);
      res.status(200).json({ allowed: false });
    }
  };

  /**
   * POST /api/auth/register-company
   */
  public handleRegisterCompany = async (req: Request, res: Response): Promise<void> => {
    return AuthHttpErrors.sendNotImplementedSafely(res);
  };
}

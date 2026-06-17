import { Request, Response } from 'express';
import { AuthCookieService } from './AuthCookieService';
import { AuthRequestValidators } from './AuthRequestValidators';
import { AuthHttpErrors } from './AuthHttpErrors';
import {
  AuthenticatedSession,
  AuthPermission,
  AuthRole,
  SafeAuthUser
} from '../../application/auth/types';

type SensitiveAuthFields = {
  passwordHash?: unknown;
  sessionTokenHash?: unknown;
  rawSessionToken?: unknown;
};

export interface AdminUsersOperations {
  validateSession(
    companyId: string,
    rawSessionToken: string
  ): Promise<{ authenticated: boolean; session?: AuthenticatedSession }>;

  listUsers(
    companyId: string,
    session: AuthenticatedSession
  ): Promise<SafeAuthUser[]>;

  updateStatus(
    companyId: string,
    session: AuthenticatedSession,
    targetUserId: string,
    active: boolean
  ): Promise<void>;

  updatePermissions(
    companyId: string,
    session: AuthenticatedSession,
    targetUserId: string,
    permissions: AuthPermission[]
  ): Promise<void>;

  updateRole(
    companyId: string,
    session: AuthenticatedSession,
    targetUserId: string,
    role: AuthRole
  ): Promise<void>;

  resetPassword(
    companyId: string,
    session: AuthenticatedSession,
    targetUserId: string,
    newPasswordHash: string
  ): Promise<void>;
}

const ALLOWED_ADMIN_PERMISSIONS = new Set<string>([
  'admin:users:view',
  'admin:users:manage',
  'admin:users:create',
  'admin:users:update',
  'admin:users:permissions:update',
  'admin:users:password:reset',
  'admin:audit:view'
]);

const ALLOWED_ROLES = new Set<string>([
  'owner',
  'admin',
  'employee',
  'accountant',
  'support'
]);

export class AdminUsersHttpHandlers {
  constructor(private readonly ops: AdminUsersOperations) {}

  private extractCompanyId(req: Request): string | null {
    const companyId = req.headers['x-yopoy-company-id'];

    if (typeof companyId === 'string' && AuthRequestValidators.isValidUuid(companyId)) {
      return companyId;
    }

    return null;
  }

  private getErrorCode(error: unknown): string | null {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
      return null;
    }

    const code = (error as { code?: unknown }).code;
    return typeof code === 'string' ? code : null;
  }

  private handleError(res: Response, error: unknown): void {
    const code = this.getErrorCode(error);

    if (code === 'AUTH_PERMISSION_DENIED') {
      AuthHttpErrors.sendForbidden(res);
      return;
    }

    if (code === 'ADMIN_USER_NOT_FOUND' || code === 'AUTH_MEMBERSHIP_NOT_FOUND') {
      AuthHttpErrors.sendError(res, 404, 'NOT_FOUND', 'Usuário ou vínculo não encontrado.');
      return;
    }

    AuthHttpErrors.sendInternalServerError(res);
  }

  private sanitizeUsers(users: SafeAuthUser[]): SafeAuthUser[] {
    return users.map((user) => {
      const {
        passwordHash: removedPasswordHash,
        sessionTokenHash: removedSessionTokenHash,
        rawSessionToken: removedRawSessionToken,
        ...safeUser
      } = user as SafeAuthUser & SensitiveAuthFields;

      void removedPasswordHash;
      void removedSessionTokenHash;
      void removedRawSessionToken;

      return safeUser as SafeAuthUser;
    });
  }

  private parsePermissions(value: unknown): AuthPermission[] | null {
    if (!Array.isArray(value)) {
      return null;
    }

    const allValid = value.every((permission) => (
      typeof permission === 'string'
      && ALLOWED_ADMIN_PERMISSIONS.has(permission)
    ));

    if (!allValid) {
      return null;
    }

    return value as AuthPermission[];
  }

  private parseRole(value: unknown): AuthRole | null {
    if (typeof value !== 'string') {
      return null;
    }

    if (!ALLOWED_ROLES.has(value)) {
      return null;
    }

    return value as AuthRole;
  }

  private async withSession(
    req: Request,
    res: Response,
    companyId: string,
    callback: (session: AuthenticatedSession) => Promise<void>
  ): Promise<void> {
    const rawSessionToken = AuthCookieService.getSessionToken(req);

    if (!rawSessionToken) {
      AuthHttpErrors.sendUnauthorized(res);
      return;
    }

    const sessionResult = await this.ops.validateSession(companyId, rawSessionToken);

    if (!sessionResult.authenticated || !sessionResult.session) {
      AuthHttpErrors.sendUnauthorized(res);
      return;
    }

    if (sessionResult.session.companyId !== companyId) {
      AuthHttpErrors.sendForbidden(res);
      return;
    }

    await callback(sessionResult.session);
  }

  public handleListUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const companyId = this.extractCompanyId(req);

      if (!companyId) {
        AuthHttpErrors.sendUnauthorized(res);
        return;
      }

      await this.withSession(req, res, companyId, async (session) => {
        const users = await this.ops.listUsers(companyId, session);
        res.status(200).json({ users: this.sanitizeUsers(users) });
      });
    } catch (error: unknown) {
      this.handleError(res, error);
    }
  };

  public handleUpdateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const targetUserId = req.params.userId;
      const { active } = req.body as { active?: unknown };

      if (!targetUserId || !AuthRequestValidators.isValidUuid(targetUserId)) {
        AuthHttpErrors.sendInvalidInput(res, 'ID de usuário inválido.');
        return;
      }

      if (typeof active !== 'boolean') {
        AuthHttpErrors.sendInvalidInput(res, 'active precisa ser boolean.');
        return;
      }

      const companyId = this.extractCompanyId(req);

      if (!companyId) {
        AuthHttpErrors.sendUnauthorized(res);
        return;
      }

      await this.withSession(req, res, companyId, async (session) => {
        await this.ops.updateStatus(companyId, session, targetUserId, active);
        res.status(200).json({ ok: true });
      });
    } catch (error: unknown) {
      this.handleError(res, error);
    }
  };

  public handleUpdatePermissions = async (req: Request, res: Response): Promise<void> => {
    try {
      const targetUserId = req.params.userId;
      const { permissions } = req.body as { permissions?: unknown };

      if (!targetUserId || !AuthRequestValidators.isValidUuid(targetUserId)) {
        AuthHttpErrors.sendInvalidInput(res, 'ID de usuário inválido.');
        return;
      }

      const parsedPermissions = this.parsePermissions(permissions);

      if (!parsedPermissions) {
        AuthHttpErrors.sendInvalidInput(res, 'permissions precisa ser um array de permissões válidas.');
        return;
      }

      const companyId = this.extractCompanyId(req);

      if (!companyId) {
        AuthHttpErrors.sendUnauthorized(res);
        return;
      }

      await this.withSession(req, res, companyId, async (session) => {
        await this.ops.updatePermissions(companyId, session, targetUserId, parsedPermissions);
        res.status(200).json({ ok: true });
      });
    } catch (error: unknown) {
      this.handleError(res, error);
    }
  };

  public handleUpdateRole = async (req: Request, res: Response): Promise<void> => {
    try {
      const targetUserId = req.params.userId;
      const { role } = req.body as { role?: unknown };

      if (!targetUserId || !AuthRequestValidators.isValidUuid(targetUserId)) {
        AuthHttpErrors.sendInvalidInput(res, 'ID de usuário inválido.');
        return;
      }

      const parsedRole = this.parseRole(role);

      if (!parsedRole) {
        AuthHttpErrors.sendInvalidInput(res, 'role inválida.');
        return;
      }

      const companyId = this.extractCompanyId(req);

      if (!companyId) {
        AuthHttpErrors.sendUnauthorized(res);
        return;
      }

      await this.withSession(req, res, companyId, async (session) => {
        await this.ops.updateRole(companyId, session, targetUserId, parsedRole);
        res.status(200).json({ ok: true });
      });
    } catch (error: unknown) {
      this.handleError(res, error);
    }
  };

  public handleResetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const targetUserId = req.params.userId;
      const { newPasswordHash } = req.body as { newPasswordHash?: unknown };

      if (!targetUserId || !AuthRequestValidators.isValidUuid(targetUserId)) {
        AuthHttpErrors.sendInvalidInput(res, 'ID de usuário inválido.');
        return;
      }

      if (typeof newPasswordHash !== 'string' || newPasswordHash.trim() === '') {
        AuthHttpErrors.sendInvalidInput(res, 'newPasswordHash inválido.');
        return;
      }

      const companyId = this.extractCompanyId(req);

      if (!companyId) {
        AuthHttpErrors.sendUnauthorized(res);
        return;
      }

      await this.withSession(req, res, companyId, async (session) => {
        await this.ops.resetPassword(companyId, session, targetUserId, newPasswordHash);
        res.status(200).json({ ok: true });
      });
    } catch (error: unknown) {
      this.handleError(res, error);
    }
  };
}

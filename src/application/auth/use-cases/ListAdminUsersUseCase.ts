import { AuthUserRepository } from '../contracts/AuthUserRepository';
import { RequirePermissionUseCase } from './RequirePermissionUseCase';
import { AuthenticatedSession, SafeAuthUser } from '../types';

export interface ListAdminUsersInput {
  session: AuthenticatedSession;
}

export class ListAdminUsersUseCase {
  constructor(
    private readonly userRepository: AuthUserRepository,
    private readonly requirePermissionUseCase: RequirePermissionUseCase
  ) {}

  async execute(input: ListAdminUsersInput): Promise<SafeAuthUser[]> {
    await this.requirePermissionUseCase.execute({
      session: input.session,
      permission: 'admin:users:view'
    });

    const users = await this.userRepository.listCompanyUsers(input.session.companyId);

    return users.map((user) => {
      const { passwordHash, sessionTokenHash, rawSessionToken, ...safeUser } = user as any;
      return safeUser as SafeAuthUser;
    });
  }
}

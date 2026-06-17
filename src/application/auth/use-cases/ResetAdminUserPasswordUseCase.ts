import { AuthUserRepository } from '../contracts/AuthUserRepository';
import { RequirePermissionUseCase } from './RequirePermissionUseCase';
import { AuthenticatedSession } from '../types';
import { AdminUserNotFoundError } from '../AuthErrors';

export interface ResetAdminUserPasswordInput {
  session: AuthenticatedSession;
  targetUserId: string;
  newPasswordHash: string;
}

export class ResetAdminUserPasswordUseCase {
  constructor(
    private readonly userRepository: AuthUserRepository,
    private readonly requirePermissionUseCase: RequirePermissionUseCase
  ) {}

  async execute(input: ResetAdminUserPasswordInput): Promise<void> {
    await this.requirePermissionUseCase.execute({
      session: input.session,
      permission: 'admin:users:password:reset'
    });

    const targetUser = await this.userRepository.findById(input.targetUserId);

    if (!targetUser || targetUser.companyId !== input.session.companyId) {
      throw new AdminUserNotFoundError();
    }

    await this.userRepository.updatePasswordHash(
      input.targetUserId,
      input.newPasswordHash
    );
  }
}

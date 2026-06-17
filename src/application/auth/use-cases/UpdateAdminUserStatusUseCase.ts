import { AuthUserRepository } from '../contracts/AuthUserRepository';
import { RequirePermissionUseCase } from './RequirePermissionUseCase';
import { AuthenticatedSession } from '../types';

export interface UpdateAdminUserStatusInput {
  session: AuthenticatedSession;
  targetUserId: string;
  active: boolean;
}

export class UpdateAdminUserStatusUseCase {
  constructor(
    private readonly userRepository: AuthUserRepository,
    private readonly requirePermissionUseCase: RequirePermissionUseCase
  ) {}

  async execute(input: UpdateAdminUserStatusInput): Promise<void> {
    await this.requirePermissionUseCase.execute({
      session: input.session,
      permission: 'admin:users:update'
    });

    await this.userRepository.updateUserStatus(
      input.targetUserId,
      input.session.companyId,
      input.active
    );
  }
}

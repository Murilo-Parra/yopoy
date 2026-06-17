import { MembershipRepository } from '../contracts/MembershipRepository';
import { RequirePermissionUseCase } from './RequirePermissionUseCase';
import { AuthenticatedSession, AuthPermission } from '../types';
import { AuthMembershipNotFoundError } from '../AuthErrors';

export interface UpdateAdminUserPermissionsInput {
  session: AuthenticatedSession;
  targetUserId: string;
  permissions: AuthPermission[];
}

export class UpdateAdminUserPermissionsUseCase {
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly requirePermissionUseCase: RequirePermissionUseCase
  ) {}

  async execute(input: UpdateAdminUserPermissionsInput): Promise<void> {
    await this.requirePermissionUseCase.execute({
      session: input.session,
      permission: 'admin:users:permissions:update'
    });

    const membership = await this.membershipRepository.findMembership(
      input.targetUserId,
      input.session.companyId
    );

    if (!membership) {
      throw new AuthMembershipNotFoundError();
    }

    await this.membershipRepository.updatePermissions(
      membership.id,
      input.permissions
    );
  }
}

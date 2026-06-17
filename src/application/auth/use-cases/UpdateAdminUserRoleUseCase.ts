import { MembershipRepository } from '../contracts/MembershipRepository';
import { RequirePermissionUseCase } from './RequirePermissionUseCase';
import { AuthenticatedSession, AuthRole } from '../types';
import { AuthMembershipNotFoundError } from '../AuthErrors';

export interface UpdateAdminUserRoleInput {
  session: AuthenticatedSession;
  targetUserId: string;
  role: AuthRole;
}

export class UpdateAdminUserRoleUseCase {
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly requirePermissionUseCase: RequirePermissionUseCase
  ) {}

  async execute(input: UpdateAdminUserRoleInput): Promise<void> {
    await this.requirePermissionUseCase.execute({
      session: input.session,
      permission: 'admin:users:manage'
    });

    const membership = await this.membershipRepository.findMembership(
      input.targetUserId,
      input.session.companyId
    );

    if (!membership) {
      throw new AuthMembershipNotFoundError();
    }

    await this.membershipRepository.updateRole(membership.id, input.role);
  }
}

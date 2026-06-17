import { MembershipRepository } from '../contracts/MembershipRepository';
import { Membership, AuthRole, AuthPermission } from '../types';

export class InMemoryMembershipRepository implements MembershipRepository {
  public memberships: Membership[] = [];

  async findMembership(userId: string, companyId: string): Promise<Membership | null> {
    const found = this.memberships.find((m) => m.userId === userId && m.companyId === companyId);
    return found ? { ...found } : null;
  }

  async listMembershipsByUser(userId: string): Promise<Membership[]> {
    return this.memberships.filter((m) => m.userId === userId).map((m) => ({ ...m }));
  }

  async listMembershipsByCompany(companyId: string): Promise<Membership[]> {
    return this.memberships.filter((m) => m.companyId === companyId).map((m) => ({ ...m }));
  }

  async createMembership(
    input: Omit<Membership, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>
  ): Promise<Membership> {
    const membership: Membership = {
      id: `mem_${Math.random().toString(36).substring(2, 9)}`,
      userId: input.userId,
      companyId: input.companyId,
      role: input.role,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.memberships.push(membership);
    return { ...membership };
  }

  async updateRole(membershipId: string, role: AuthRole): Promise<void> {
    const index = this.memberships.findIndex((m) => m.id === membershipId);
    if (index !== -1) {
      this.memberships[index].role = role;
      this.memberships[index].updatedAt = new Date();
    }
  }

  async disableMembership(membershipId: string): Promise<void> {
    const index = this.memberships.findIndex((m) => m.id === membershipId);
    if (index !== -1) {
      this.memberships[index].isActive = false;
      this.memberships[index].updatedAt = new Date();
    }
  }

async updateMembershipStatus(membershipId: string, active: boolean): Promise<void> {
    const index = this.memberships.findIndex((m) => m.id === membershipId);
    if (index !== -1) {
      this.memberships[index].isActive = active;
      this.memberships[index].updatedAt = new Date();
    }
  }

  async updatePermissions(membershipId: string, permissions: AuthPermission[]): Promise<void> {
    const index = this.memberships.findIndex((m) => m.id === membershipId);
    if (index !== -1) {
      this.memberships[index].permissions = permissions;
      this.memberships[index].updatedAt = new Date();
    }
  }
}

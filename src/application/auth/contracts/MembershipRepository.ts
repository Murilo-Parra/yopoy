import { Membership, AuthRole, AuthPermission } from '../types';

export interface MembershipRepository {
  findMembership(userId: string, companyId: string): Promise<Membership | null>;
  listMembershipsByUser(userId: string): Promise<Membership[]>;
  listMembershipsByCompany(companyId: string): Promise<Membership[]>;
  createMembership(input: Omit<Membership, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Membership>;
  updateRole(membershipId: string, role: AuthRole): Promise<void>;
  disableMembership(membershipId: string): Promise<void>;
  updateMembershipStatus(membershipId: string, active: boolean): Promise<void>;
  updatePermissions(membershipId: string, permissions: AuthPermission[]): Promise<void>;
}

import { PendingItem } from '../../domain/entities';

export interface PendingItemRepository {
  create(item: PendingItem): Promise<PendingItem>;
  update(item: PendingItem): Promise<PendingItem>;
  findById(companyId: string, id: string): Promise<PendingItem | null>;
  listByCompany(companyId: string): Promise<PendingItem[]>;
}

import { PendingItem } from '../../domain/entities';
import { PendingItemRepository } from '../../application/repositories/PendingItemRepository';

export class InMemoryPendingItemRepository implements PendingItemRepository {
  private items: PendingItem[] = [];

  async create(item: PendingItem): Promise<PendingItem> {
    this.items.push(item);
    return item;
  }

  async update(item: PendingItem): Promise<PendingItem> {
    const index = this.items.findIndex(i => i.id === item.id && i.company_id === item.company_id);
    if (index >= 0) {
      this.items[index] = item;
    }
    return item;
  }

  async findById(companyId: string, id: string): Promise<PendingItem | null> {
    return this.items.find(i => i.id === id && i.company_id === companyId) || null;
  }

  async listByCompany(companyId: string): Promise<PendingItem[]> {
    return this.items.filter(i => i.company_id === companyId);
  }
}

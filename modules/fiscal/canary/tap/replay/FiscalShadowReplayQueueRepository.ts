import { FiscalShadowReplayItem, FiscalShadowReplayItemStatus } from "./FiscalShadowReplayTypes";

export class FiscalShadowReplayQueueRepository {
  private queue: FiscalShadowReplayItem[] = [];

  public enqueue(item: FiscalShadowReplayItem): void {
    this.queue.push(item);
  }

  public list(filters: any = {}): FiscalShadowReplayItem[] {
    let result = this.queue;
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    return result;
  }

  public getById(id: string): FiscalShadowReplayItem | undefined {
    return this.queue.find(item => item.id === id);
  }

  public updateStatus(id: string, status: FiscalShadowReplayItemStatus): void {
    const item = this.getById(id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
    }
  }

  /* Expose full queue for reporting purposes */
  public getAll(): FiscalShadowReplayItem[] {
    return this.queue;
  }
}

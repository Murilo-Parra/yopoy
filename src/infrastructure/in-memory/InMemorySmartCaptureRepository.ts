import { SmartCaptureDraft } from '../../domain/entities';
import { SmartCaptureRepository } from '../../application/repositories/SmartCaptureRepository';

export class InMemorySmartCaptureRepository implements SmartCaptureRepository {
  private drafts: SmartCaptureDraft[] = [];

  async create(draft: SmartCaptureDraft): Promise<SmartCaptureDraft> {
    this.drafts.push(draft);
    return draft;
  }

  async update(draft: SmartCaptureDraft): Promise<SmartCaptureDraft> {
    const index = this.drafts.findIndex(d => d.id === draft.id && d.company_id === draft.company_id);
    if (index >= 0) {
      this.drafts[index] = draft;
    }
    return draft;
  }

  async findById(companyId: string, id: string): Promise<SmartCaptureDraft | null> {
    return this.drafts.find(d => d.id === id && d.company_id === companyId) || null;
  }
}

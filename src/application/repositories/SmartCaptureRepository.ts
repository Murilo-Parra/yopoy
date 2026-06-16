import { SmartCaptureDraft } from '../../domain/entities';

export interface SmartCaptureRepository {
  create(draft: SmartCaptureDraft): Promise<SmartCaptureDraft>;
  update(draft: SmartCaptureDraft): Promise<SmartCaptureDraft>;
  findById(companyId: string, id: string): Promise<SmartCaptureDraft | null>;
}

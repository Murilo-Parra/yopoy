import { SmartCaptureDraft } from '../../domain/entities';
import { SmartCaptureDraftResponse } from '../dtos/smartCapture.dto';

export function mapSmartCaptureDraftToResponse(draft: SmartCaptureDraft): SmartCaptureDraftResponse {
  return {
    id: draft.id,
    rawText: draft.raw_text,
    attachmentId: draft.attachment_id,
    status: draft.status,
    createdAt: draft.created_at.toISOString(),
  };
}

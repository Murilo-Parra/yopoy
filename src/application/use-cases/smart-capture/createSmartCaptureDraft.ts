import { SmartCaptureDraft } from '../../../domain/entities';
import { SmartCaptureRepository } from '../../repositories/SmartCaptureRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface CreateSmartCaptureDraftInput {
  companyId: string;
  userId: string;
  rawText: string;
  attachmentId?: string;
}

export async function createSmartCaptureDraft(
  input: CreateSmartCaptureDraftInput,
  draftRepo: SmartCaptureRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<SmartCaptureDraft>> {
  if (!input.rawText) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'Raw text is required'));
  }

  const draft: SmartCaptureDraft = {
    id: randomUUID(),
    company_id: input.companyId,
    raw_text: input.rawText,
    attachment_id: input.attachmentId,
    status: 'PENDING',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId,
    version: 1
  };

  await draftRepo.create(draft);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'SmartCaptureDraft',
    entity_id: draft.id,
    action: 'CREATE',
    current_state: JSON.stringify(draft),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(draft);
}

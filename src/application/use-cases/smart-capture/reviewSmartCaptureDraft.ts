import { SmartCaptureRepository } from '../../repositories/SmartCaptureRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface ReviewSmartCaptureDraftInput {
  companyId: string;
  userId: string;
  draftId: string;
}

export async function reviewSmartCaptureDraft(
  input: ReviewSmartCaptureDraftInput,
  draftRepo: SmartCaptureRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<void>> {
  const draft = await draftRepo.findById(input.companyId, input.draftId);

  if (!draft) {
    return failure(new ApplicationError('NOT_FOUND', 'Smart capture draft not found'));
  }

  if (draft.status !== 'PENDING') {
    return failure(new ApplicationError('INVALID_STATUS_TRANSITION', 'Draft is not pending review'));
  }

  const previousState = JSON.stringify(draft);

  draft.status = 'ACTIVE'; // active means reviewed
  draft.updated_at = new Date();
  draft.updated_by = input.userId;
  draft.version += 1;

  await draftRepo.update(draft);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'SmartCaptureDraft',
    entity_id: draft.id,
    action: 'UPDATE',
    previous_state: previousState,
    current_state: JSON.stringify(draft),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(undefined);
}

import { LedgerEntry } from '../../../domain/entities';
import { LedgerRepository } from '../../repositories/LedgerRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface CreateLedgerEntryInput {
  companyId: string;
  userId: string;
  account: string;
  debit: number;
  credit: number;
  referenceId?: string;
}

export async function createLedgerEntry(
  input: CreateLedgerEntryInput,
  ledgerRepo: LedgerRepository
): Promise<UseCaseResult<LedgerEntry>> {
  if (input.debit < 0 || input.credit < 0) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'Debit and credit must be non-negative'));
  }

  const entry: LedgerEntry = {
    id: randomUUID(),
    company_id: input.companyId,
    account: input.account,
    debit: input.debit,
    credit: input.credit,
    reference_id: input.referenceId,
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId
  };

  await ledgerRepo.create(entry);

  return success(entry);
}

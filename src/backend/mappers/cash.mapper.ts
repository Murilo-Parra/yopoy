import { CashSession } from '../../domain/entities';
import { CashSessionResponse } from '../dtos/cash.dto';

export function mapCashSessionToResponse(session: CashSession): CashSessionResponse {
  return {
    id: session.id,
    openedAt: session.opened_at.toISOString(),
    closedAt: session.closed_at?.toISOString(),
    initialBalance: session.initial_balance,
    finalBalance: session.final_balance,
  };
}

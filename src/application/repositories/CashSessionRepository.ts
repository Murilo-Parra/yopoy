import { CashSession, CashMovement } from '../../domain/entities';

export interface CashSessionRepository {
  create(session: CashSession): Promise<CashSession>;
  update(session: CashSession): Promise<CashSession>;
  findById(companyId: string, id: string): Promise<CashSession | null>;
  findActiveSession(companyId: string): Promise<CashSession | null>;
  addMovement(movement: CashMovement): Promise<void>;
}

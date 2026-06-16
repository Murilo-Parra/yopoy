import { CashSession, CashMovement } from '../../domain/entities';
import { CashSessionRepository } from '../../application/repositories/CashSessionRepository';

export class InMemoryCashSessionRepository implements CashSessionRepository {
  private sessions: CashSession[] = [];
  private movements: CashMovement[] = [];

  async create(session: CashSession): Promise<CashSession> {
    this.sessions.push(session);
    return session;
  }

  async update(session: CashSession): Promise<CashSession> {
    const index = this.sessions.findIndex(s => s.id === session.id && s.company_id === session.company_id);
    if (index >= 0) {
      this.sessions[index] = session;
    }
    return session;
  }

  async findById(companyId: string, id: string): Promise<CashSession | null> {
    return this.sessions.find(s => s.id === id && s.company_id === companyId) || null;
  }

  async findActiveSession(companyId: string): Promise<CashSession | null> {
    return this.sessions.find(s => s.company_id === companyId && !s.closed_at) || null;
  }

  async addMovement(movement: CashMovement): Promise<void> {
    this.movements.push(movement);
  }
}

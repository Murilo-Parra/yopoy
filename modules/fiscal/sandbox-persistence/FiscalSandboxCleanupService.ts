import { FiscalSandboxPersistenceRepository } from './FiscalSandboxPersistenceRepository';

export class FiscalSandboxCleanupService {
  private repository: FiscalSandboxPersistenceRepository;

  constructor() {
    this.repository = new FiscalSandboxPersistenceRepository();
  }

  public async cleanup(companyId: string, options: { olderThanDays?: number; status?: string } = {}): Promise<{ deletedCount: number }> {
    if (!companyId) {
      throw new Error('companyId is strictly required for cleanup. Global cleanup is prohibited in this phase.');
    }

    const deletedCount = await this.repository.cleanup(companyId, options);
    
    return { deletedCount };
  }
}

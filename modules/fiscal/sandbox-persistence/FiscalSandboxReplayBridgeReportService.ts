import { FiscalSandboxReplayBridgeReport } from './FiscalSandboxReplayBridgeTypes';
import { FiscalSandboxReplayBridgeAuditService } from './FiscalSandboxReplayBridgeAuditService';

export class FiscalSandboxReplayBridgeReportService {
  
  public async generateReport(): Promise<FiscalSandboxReplayBridgeReport> {
    const attempts = FiscalSandboxReplayBridgeAuditService.getAttempts();

    let totalBridgeAttempts = attempts.length;
    let totalStored = 0;
    let totalBlocked = 0;
    let totalFailedSafe = 0;

    const bySource: Record<string, number> = {};
    const byOperation: Record<string, number> = {};

    for (const attempt of attempts) {
      if (attempt.status === 'SUCCESS') totalStored++;
      if (attempt.status === 'BLOCKED') totalBlocked++;
      if (attempt.status === 'FAILED_SAFE') totalFailedSafe++;

      if (!bySource[attempt.source]) bySource[attempt.source] = 0;
      bySource[attempt.source]++;

      if (!byOperation[attempt.operation]) byOperation[attempt.operation] = 0;
      byOperation[attempt.operation]++;
    }

    return {
      generatedAt: new Date().toISOString(),
      totalBridgeAttempts,
      totalStored,
      totalBlocked,
      totalFailedSafe,
      bySource,
      byOperation,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}

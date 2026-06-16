import { FiscalReleaseGateEvaluationInput, FiscalReleaseGateStatus } from './FiscalReleaseGateTypes';

export class FiscalReleaseGatePolicy {
  public static evaluateRequest(input: FiscalReleaseGateEvaluationInput): {
    go: false;
    noGo: true;
    approvedForRelease: false;
    status: FiscalReleaseGateStatus | string;
    blockers: string[];
    releaseActivated: false;
    trafficChanged: false;
  } {
    const blockers: string[] = [];

    if (input.forceApproval === true) {
      blockers.push('forceApproval is explicitly blocked in Phase 9.1.');
    }

    if (input.targetDomain && (input.targetDomain.toLowerCase().includes('prod') || input.targetDomain.toLowerCase().includes('real'))) {
      blockers.push('Productive target domains are prohibited.');
    }

    blockers.push('Release Gate 9.1 é uma avaliação administrativa. Release real, Canary real e Produção V2 permanecem bloqueados.');

    return {
      go: false,
      noGo: true,
      approvedForRelease: false,
      status: FiscalReleaseGateStatus.RELEASE_BLOCKED,
      blockers,
      releaseActivated: false,
      trafficChanged: false
    };
  }
}

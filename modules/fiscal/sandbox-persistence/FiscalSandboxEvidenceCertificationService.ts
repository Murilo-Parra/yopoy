import { FiscalSandboxEvidenceReadModel } from './FiscalSandboxEvidenceReadModel';
import { FiscalSandboxEvidenceChecklist } from './FiscalSandboxEvidenceChecklist';
import { FiscalSandboxEvidenceStatus, FiscalSandboxEvidenceCertification, FiscalSandboxEvidenceSummary } from './FiscalSandboxEvidenceTypes';
import crypto from 'crypto';

export class FiscalSandboxEvidenceCertificationService {
  private readModel: FiscalSandboxEvidenceReadModel;

  constructor() {
    this.readModel = new FiscalSandboxEvidenceReadModel();
  }
  
  public async getSummary(companyId: string): Promise<FiscalSandboxEvidenceSummary> {
    const data = await this.readModel.getEvidenceSummary(companyId);
    const scoreData = data.integrityReport?.qualityScore;
    
    return {
      generatedAt: new Date().toISOString(),
      companyId,
      totalSnapshots: scoreData?.totalSnapshots || 0,
      totalReviewed: scoreData?.reviewedSnapshots || 0,
      totalRetained: scoreData?.retainedSnapshots || 0,
      totalCleanupEligible: 0,
      totalBlocked: scoreData?.blockedSnapshots || 0,
      totalExpired: scoreData?.expiredSnapshots || 0,
      qualityScore: scoreData?.score || 0,
      status: scoreData?.status || 'UNKNOWN',
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }

  public async getCertification(companyId: string): Promise<FiscalSandboxEvidenceCertification> {
    const data = await this.readModel.getEvidenceSummary(companyId);
    const summary = await this.getSummary(companyId);
    const checklist = FiscalSandboxEvidenceChecklist.evaluate(data.integrityReport);
    
    let status = FiscalSandboxEvidenceStatus.SANDBOX_CERTIFIED_WITH_WARNINGS;
    if (summary.totalSnapshots === 0) status = FiscalSandboxEvidenceStatus.INSUFFICIENT_DATA;
    if (summary.totalBlocked > 0 || (summary.qualityScore < 50 && summary.totalSnapshots > 0)) status = FiscalSandboxEvidenceStatus.BLOCKED_BY_RISK;

    const certificationMessage = 'Este pacote certifica apenas evidências sandbox. Ele não autoriza ativação real do Fiscal V2, SEFAZ, XML assinado ou PDF.';
    const strToHash = `${companyId}-${summary.totalSnapshots}-${summary.qualityScore}-${status}-${new Date().toISOString()}`;
    const certificationHash = crypto.createHash('sha256').update(strToHash).digest('hex');

    return {
      generatedAt: new Date().toISOString(),
      companyId,
      status,
      summary,
      checklist,
      risks: data.integrityReport?.risks || [],
      certificationMessage,
      certificationHash,
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }

  public getFinalReview(): any {
    return {
      go: false,
      noGo: true,
      reason: 'Aprovação real restrita para as próximas fases de produção/canário. A certificação atual é puramente administrativa e sandbox-only.',
      requiredBeforeGo: [
        'Habilitação explícita do canário real',
        'Assinatura de certificado válida em ambiente homologação SEFAZ',
        'Liberação global de master admin toggle'
      ],
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}

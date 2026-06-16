import { FiscalOperationalCommitteeDryRunInput, FiscalOperationalCommitteeDryRunResult, FiscalOperationalCommitteeDryRunStatus } from './FiscalOperationalCommitteeDryRunTypes';
import { FiscalOperationalCommitteeDryRunValidator } from './FiscalOperationalCommitteeDryRunValidator';

export class FiscalOperationalCommitteeDryRunPolicy {
  public static enforce(input: FiscalOperationalCommitteeDryRunInput): Partial<FiscalOperationalCommitteeDryRunResult> | null {
    const blockers: string[] = [];
    const validation = FiscalOperationalCommitteeDryRunValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Architecture & Risk Committee Dry-Run 20.3 é apenas simulação administrativa de comitê, aprovação documental, quórum, risk acceptance, waiver e revisão de evidências. Nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador externo foi notificado, nenhum ticket real foi criado, nenhum incidente real foi aberto, nenhum runbook real foi executado, nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalOperationalCommitteeDryRunStatus.BLOCKED_FOR_REAL_COMMITTEE_APPROVAL,
        validationExecuted: true,
        evaluationExecuted: false,
        decisionSimulated: false,
        go: false,
        noGo: true,
        blockers,
        warnings: validation.warnings
      };
    }

    return null;
  }

  public static getBaseResult(): FiscalOperationalCommitteeDryRunResult {
    return {
      success: true,
      status: FiscalOperationalCommitteeDryRunStatus.ARCHITECTURE_RISK_COMMITTEE_DRY_RUN_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      architectureCharterGenerated: true,
      approvalMatrixGenerated: true,
      quorumSimulationGenerated: true,
      riskAcceptanceSimulationGenerated: true,
      exceptionWaiverSimulationGenerated: true,
      evidenceReviewMatrixGenerated: true,
      finalRecommendationGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Architecture & Risk Committee Dry-Run 20.3 é apenas simulação administrativa de comitê, aprovação documental, quórum, risk acceptance, waiver e revisão de evidências. Nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador externo foi notificado, nenhum ticket real foi criado, nenhum incidente real foi aberto, nenhum runbook real foi executado, nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      architectureRiskCommitteeDryRunOnly: true,
      committeeApprovalSimulationOnly: true,
      committeeApprovalGranted: false,
      realRiskAccepted: false,
      realWaiverGranted: false,
      externalApproverNotified: false,
      realTicketCreated: false,
      realIncidentOpened: false,
      runbookExecuted: false,
      observabilityInstalled: false,
      productionAlertCreated: false,
      productionV2Activated: false,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      appUseModified: false,
      middlewareInstalled: false,
      tapInstalled: false,
      workersCreated: false,
      schedulersCreated: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      dmlExecuted: false,
      ddlExecuted: false,
      realDatabaseConnected: false,
      realSefazCalled: false,
      realCertificateLoaded: false,
      xmlSigned: false,
      pdfGenerated: false,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForCommitteeDryRun: true,
      approvedForCommitteeApprovalSimulation: true,
      approvedForRealCommitteeApproval: false,
      approvedForRealRiskAcceptance: false,
      approvedForRealOperationalHandoff: false,
      approvedForProductionV2: false
    };
  }
}

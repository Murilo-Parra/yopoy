import { FiscalOperationalHandoffInput, FiscalOperationalHandoffResult, FiscalOperationalHandoffStatus } from './FiscalOperationalHandoffTypes';
import { FiscalOperationalHandoffValidator } from './FiscalOperationalHandoffValidator';

export class FiscalOperationalHandoffPolicy {
  public static enforce(input: FiscalOperationalHandoffInput): Partial<FiscalOperationalHandoffResult> | null {
    const blockers: string[] = [];
    const validation = FiscalOperationalHandoffValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Operational Handoff 20.1 é apenas blueprint administrativo e contrato de prontidão de runbook. Nenhum runbook real foi executado, nenhum incidente real foi aberto, nenhum operador externo foi notificado, nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalOperationalHandoffStatus.BLOCKED_FOR_REAL_OPERATIONAL_HANDOFF,
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

  public static getBaseResult(): FiscalOperationalHandoffResult {
    return {
      success: true,
      status: FiscalOperationalHandoffStatus.OPERATIONAL_HANDOFF_BLUEPRINT_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      runbookBlueprintGenerated: true,
      responsibilityMatrixGenerated: true,
      supportEscalationGenerated: true,
      incidentResponseGenerated: true,
      observabilityReadinessGenerated: true,
      changeFreezeGenerated: true,
      communicationMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Operational Handoff 20.1 é apenas blueprint administrativo e contrato de prontidão de runbook. Nenhum runbook real foi executado, nenhum incidente real foi aberto, nenhum operador externo foi notificado, nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      operationalHandoffBlueprintOnly: true,
      runbookReadinessContractOnly: true,
      runbookExecuted: false,
      realIncidentOpened: false,
      externalOperatorNotified: false,
      observabilityInstalled: false,
      productionAlertCreated: false,
      productionV2Activated: false,
      releaseActivated: false,
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
      approvedForOperationalHandoffBlueprint: true,
      approvedForRunbookReadinessContract: true,
      approvedForRealOperationalHandoff: false,
      approvedForRunbookExecution: false,
      approvedForProductionV2: false
    };
  }
}

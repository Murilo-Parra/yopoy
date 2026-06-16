import { FiscalProductionActivationInput, FiscalProductionActivationResult, FiscalProductionActivationStatus } from './FiscalProductionActivationTypes';
import { FiscalProductionActivationValidator } from './FiscalProductionActivationValidator';

export class FiscalProductionActivationPolicy {
  public static enforce(input: FiscalProductionActivationInput): Partial<FiscalProductionActivationResult> | null {
    const blockers: string[] = [];
    
    const validation = FiscalProductionActivationValidator.validate(input);
    if (!validation.valid) blockers.push(...validation.blockers);

    blockers.push('Production Activation 19.1 é apenas blueprint administrativo e contrato de release zero-execution. Nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum Canary real foi instalado, nenhum release real foi executado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum ledger/trilha legal real foi persistido, nenhum DML/DDL real foi executado, SEFAZ real, certificado real, XML/PDF real, workers e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalProductionActivationStatus.BLOCKED_FOR_REAL_PRODUCTION_ACTIVATION,
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

  public static getBaseResult(): FiscalProductionActivationResult {
    return {
        success: true,
        status: FiscalProductionActivationStatus.PRODUCTION_ACTIVATION_BLUEPRINT_READY,
        validationExecuted: true,
        evaluationExecuted: true,
        decisionSimulated: true,
        activationBlueprintGenerated: true,
        releaseContractGenerated: true,
        trafficSwitchPlanGenerated: true,
        canaryPlanGenerated: true,
        rollbackPlanGenerated: true,
        killSwitchPlanGenerated: true,
        readinessChecklistGenerated: true,
        dependencyInventoryGenerated: true,
        go: false,
        noGo: true,
        blockers: ['Production Activation 19.1 é apenas blueprint administrativo e contrato de release zero-execution. Nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum Canary real foi instalado, nenhum release real foi executado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum ledger/trilha legal real foi persistido, nenhum DML/DDL real foi executado, SEFAZ real, certificado real, XML/PDF real, workers e rotas produtivas permanecem bloqueados.'],
        warnings: [],
        productionActivationBlueprintOnly: true,
        zeroExecutionReleaseContractOnly: true,
        productionV2Activated: false,
        releaseActivated: false,
        canaryActivated: false,
        trafficChanged: false,
        routeToV2: false,
        routeToLegacy: true,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realAuthorizationGranted: false,
        dualApprovalCompleted: false,
        realLedgerCreated: false,
        legalAuditTrailPersisted: false,
        legalTrailDefinitive: false,
        realHashCalculated: false,
        legalTrailSigned: false,
        dmlExecuted: false,
        ddlExecuted: false,
        realDatabaseConnected: false,
        realSefazCalled: false,
        realCertificateLoaded: false,
        xmlSigned: false,
        pdfGenerated: false,
        workersCreated: false,
        schedulersCreated: false,
        readOnly: true,
        governanceOnly: true,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        approvedForProductionActivationBlueprint: true,
        approvedForZeroExecutionReleaseContract: true,
        approvedForRealProductionActivation: false,
        approvedForRealTrafficSwitch: false,
        approvedForRealCanary: false,
        approvedForRealRelease: false,
        approvedForSefazConnection: false,
        approvedForProductionV2: false
    };
  }
}

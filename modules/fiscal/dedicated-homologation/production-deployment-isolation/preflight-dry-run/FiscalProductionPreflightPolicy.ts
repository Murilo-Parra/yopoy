import { FiscalProductionPreflightInput, FiscalProductionPreflightResult, FiscalProductionPreflightStatus } from './FiscalProductionPreflightTypes';
import { FiscalProductionPreflightValidator } from './FiscalProductionPreflightValidator';

export class FiscalProductionPreflightPolicy {
  public static enforce(input: FiscalProductionPreflightInput): Partial<FiscalProductionPreflightResult> | null {
    let blockers: string[] = [];
    const validation = FiscalProductionPreflightValidator.validate(input);

    blockers = [...validation.blockers];

    blockers.push('Production Deployment Preflight 24.4 é apenas validação administrativa de prontidão pré-deploy, checklist de ambiente, artefatos, cutover, rollback, tráfego, segurança e dependências. Nenhum deploy real foi aprovado, nenhum deploy real foi executado, nenhum release real foi executado, nenhum rollout real foi executado, nenhum cutover real foi aprovado, nenhum cutover real foi executado, nenhum rollback real foi executado, nenhum pacote real foi publicado, nenhum artefato executável real foi gerado, nenhuma Produção V2 foi ativada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalProductionPreflightStatus.BLOCKED_FOR_REAL_DEPLOYMENT,
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

  public static getBaseResult(): FiscalProductionPreflightResult {
    return {
      success: true,
      status: FiscalProductionPreflightStatus.PRODUCTION_DEPLOYMENT_PREFLIGHT_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      deploymentReadinessChecklistGenerated: true,
      environmentReadinessGenerated: true,
      artifactReadinessGenerated: true,
      cutoverReadinessGenerated: true,
      rollbackReadinessGenerated: true,
      trafficReadinessGenerated: true,
      securityBoundaryCheckGenerated: true,
      dependencyMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Production Deployment Preflight 24.4 é apenas validação administrativa de prontidão pré-deploy, checklist de ambiente, artefatos, cutover, rollback, tráfego, segurança e dependências. Nenhum deploy real foi aprovado, nenhum deploy real foi executado, nenhum release real foi executado, nenhum rollout real foi executado, nenhum cutover real foi aprovado, nenhum cutover real foi executado, nenhum rollback real foi executado, nenhum pacote real foi publicado, nenhum artefato executável real foi gerado, nenhuma Produção V2 foi ativada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      productionDeploymentPreflightOnly: true,
      deploymentReadinessDryRunOnly: true,
      preflightCheckOnly: true,
      realDeployApproved: false,
      realDeployExecuted: false,
      releaseActivated: false,
      realRolloutExecuted: false,
      realCutoverApproved: false,
      cutoverExecuted: false,
      realRollbackExecuted: false,
      executableArtifactGenerated: false,
      realPackagePublished: false,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      appUseModified: false,
      routerUseModified: false,
      realEndpointCalled: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      workersCreated: false,
      schedulersCreated: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      dmlExecuted: false,
      ddlExecuted: false,
      realDatabaseConnected: false,
      realSefazCalled: false,
      realCertificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realCryptoUsed: false,
      xmlSigned: false,
      pdfGenerated: false,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForPreflightDryRun: true,
      approvedForDeploymentReadinessDryRun: true,
      approvedForRealDeploy: false,
      approvedForRealRelease: false,
      approvedForRealCutover: false,
      approvedForRealRollback: false,
      approvedForProductionV2: false
    };
  }
}

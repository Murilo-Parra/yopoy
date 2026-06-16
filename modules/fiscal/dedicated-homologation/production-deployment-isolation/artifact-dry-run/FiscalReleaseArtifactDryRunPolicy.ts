import { FiscalReleaseArtifactDryRunInput, FiscalReleaseArtifactDryRunResult, FiscalReleaseArtifactDryRunStatus } from './FiscalReleaseArtifactDryRunTypes';
import { FiscalReleaseArtifactDryRunValidator } from './FiscalReleaseArtifactDryRunValidator';

export class FiscalReleaseArtifactDryRunPolicy {
  public static enforce(input: FiscalReleaseArtifactDryRunInput): Partial<FiscalReleaseArtifactDryRunResult> | null {
    let blockers: string[] = [];
    const validation = FiscalReleaseArtifactDryRunValidator.validate(input);

    blockers = [...validation.blockers];

    blockers.push('Release Artifact Dry-Run 24.2 é apenas manifesto administrativo de artefatos e validação documental de pacote de deployment. Nenhum artefato executável real foi gerado, nenhum pacote real foi publicado, nenhum release real foi executado, nenhum deploy real foi executado, nenhum rollout real foi executado, nenhuma Produção V2 foi ativada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalReleaseArtifactDryRunStatus.BLOCKED_FOR_REAL_RELEASE_PACKAGE,
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

  public static getBaseResult(): FiscalReleaseArtifactDryRunResult {
    return {
      success: true,
      status: FiscalReleaseArtifactDryRunStatus.RELEASE_ARTIFACT_MANIFEST_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      releaseArtifactManifestGenerated: true,
      deploymentPackageManifestGenerated: true,
      artifactIntegrityPlanGenerated: true,
      packageShapeValidatorGenerated: true,
      nonExecutableContractGenerated: true,
      packageBoundaryPlanGenerated: true,
      dependencyMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Release Artifact Dry-Run 24.2 é apenas manifesto administrativo de artefatos e validação documental de pacote de deployment. Nenhum artefato executável real foi gerado, nenhum pacote real foi publicado, nenhum release real foi executado, nenhum deploy real foi executado, nenhum rollout real foi executado, nenhuma Produção V2 foi ativada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      releaseArtifactManifestOnly: true,
      deploymentPackageDryRunOnly: true,
      nonExecutableArtifactOnly: true,
      executableArtifactGenerated: false,
      realPackagePublished: false,
      releaseActivated: false,
      realDeployExecuted: false,
      realRolloutExecuted: false,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      appUseModified: false,
      routerUseModified: false,
      realRouteExecuted: false,
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
      approvedForReleaseArtifactManifest: true,
      approvedForDeploymentPackageDryRun: true,
      approvedForRealPackagePublication: false,
      approvedForRealRelease: false,
      approvedForRealDeploy: false,
      approvedForProductionV2: false
    };
  }
}

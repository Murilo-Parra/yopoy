import { FiscalProductionCanaryTrafficSwitchInput } from './FiscalProductionCanaryTrafficSwitchTypes';

export class FiscalProductionCanaryTrafficSwitchValidator {
  public static validate(input: FiscalProductionCanaryTrafficSwitchInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const strJson = JSON.stringify(input || {}).toUpperCase();
    const lowerJson = strJson.toLowerCase();

    if (strJson.includes('APP.USE(') || strJson.includes('ROUTER.USE(') || strJson.includes('NEXT(')) {
      blockers.push('app.use/router.use/next blocked');
    }

    if (strJson.includes('FETCH(') || strJson.includes('AXIOS') || strJson.includes('REQUEST(')) {
      blockers.push('fetch/axios/request blocked');
    }

    if (lowerJson.includes('webhook') || lowerJson.includes('slack') || lowerJson.includes('whatsapp') || lowerJson.includes('email.send') || lowerJson.includes('nodemailer')) {
      blockers.push('webhook/slack/whatsapp/email.send/nodemailer blocked');
    }
    
    if (lowerJson.includes('crypto') || lowerJson.includes('node-forge') || lowerJson.includes('xml-crypto')) {
      blockers.push('crypto/node-forge/xml-crypto blocked');
    }

    if (strJson.includes('DATABASE_URL') || strJson.includes('PRIVATEKEY') || strJson.includes('PFX') || strJson.includes('CERTIFICATE') || strJson.includes('PASSWORD') || strJson.includes('TOKEN')) {
      blockers.push('DATABASE_URL/privateKey/pfx/certificate/password/token blocked');
    }

    if (strJson.includes('INSERT INTO') || strJson.includes('UPDATE ') || strJson.includes('DELETE ') || strJson.includes('COMMIT')) {
      blockers.push('INSERT/UPDATE/DELETE/COMMIT blocked');
    }

    if (strJson.includes('CREATE TABLE') || strJson.includes('ALTER TABLE') || strJson.includes('DROP TABLE')) {
      blockers.push('CREATE/ALTER/DROP TABLE blocked');
    }

    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');
    
    if (lowerJson.includes('request.body') || lowerJson.includes('response.body') || lowerJson.includes('req.rawbody')) {
       blockers.push('request.body/response.body/req.rawBody blocked');
    }

    if (lowerJson.includes('res.send') || lowerJson.includes('res.json')) {
       if (lowerJson.includes('override') || strJson.includes('OVERRIDE')) {
         blockers.push('res.send override/res.json override blocked');
       }
       if (strJson.includes('RES.SEND =') || strJson.includes('RES.JSON =')) {
          blockers.push('res.send override/res.json override blocked');
       }
    }

    const keywordGroup1 = ['canary', 'switchtraffic', 'activatev2', 'disablelegacy'];
    if (keywordGroup1.some(kw => lowerJson.includes(kw))) {
       if (!lowerJson.includes('dryrun') && !lowerJson.includes('dry-run') && !lowerJson.includes('simulation') && !lowerJson.includes('plan')) {
             blockers.push('canary/switchTraffic/activateV2/disableLegacy blocked');
       }
    }

    const keywordGroup2 = ['mirrortraffic', 'shadowtraffic', 'duplicaterequest', 'captureresponse'];
    if (keywordGroup2.some(kw => lowerJson.includes(kw))) {
       if (!lowerJson.includes('dryrun') && !lowerJson.includes('dry-run') && !lowerJson.includes('simulation') && !lowerJson.includes('plan')) {
             blockers.push('mirrorTraffic/shadowTraffic/duplicateRequest/captureResponse blocked');
       }
    }

    const keywordGroup3 = ['deploy', 'rollout', 'releaseproduction', 'activateproduction'];
    if (keywordGroup3.some(kw => lowerJson.includes(kw))) {
       if (!lowerJson.includes('dryrun') && !lowerJson.includes('dry-run') && !lowerJson.includes('simulation') && !lowerJson.includes('plan')) {
             blockers.push('deploy/rollout/releaseProduction/activateProduction blocked');
       }
    }

    const keywordGroup4 = ['executableartifact', 'publishpackage', 'binaryartifact', 'shellcommand'];
    if (keywordGroup4.some(kw => lowerJson.includes(kw))) {
        blockers.push('executableArtifact/publishPackage/binaryArtifact/shellCommand blocked');
    }

    const keywordGroup5 = ['reversibleactivation', 'productiontrafficswitch'];
    if (keywordGroup5.some(kw => lowerJson.includes(kw))) {
       if (!lowerJson.includes('dryrun') && !lowerJson.includes('dry-run') && !lowerJson.includes('simulation') && !lowerJson.includes('plan')) {
           blockers.push('reversibleActivation/productionTrafficSwitch blocked');
       }
    }

    const forceKeys = [
      'forceActivateRealCanary', 'forceActivateProductionV2', 'forceChangeTraffic',
      'forceRouteToV2', 'forceDisableLegacyRoute', 'forceInstallProxy', 'forceInstallMiddleware',
      'forceInstallTap', 'forceModifyAppUse', 'forceModifyRouterUse', 'forceCallRealEndpoint',
      'forceCallLegacyHandler', 'forceCallV2Handler', 'forceCaptureRequest', 'forceCaptureResponse',
      'forceCapturePayload', 'forceDuplicateRequest', 'forceMirrorRealTraffic', 'forceEnableShadowTraffic',
      'forceExecuteRealRelease', 'forceExecuteRealDeploy', 'forceExecuteRealRollout',
      'forceApproveRealCutover', 'forceExecuteRealCutover', 'forceExecuteRealRollback',
      'forcePublishRealPackage', 'forceGenerateExecutableArtifact', 'forceCreateWorker',
      'forceCreateScheduler', 'forceUnlockGate', 'forceGrantRealAuthorization', 'forceConnectRealDatabase',
      'forceExecuteDml', 'forceExecuteDdl', 'forceCallRealSefaz', 'forceLoadRealCertificate',
      'forceReadRealPfx', 'forceReadCertificatePassword', 'forceUseRealCrypto', 'forceSignRealXml',
      'forceGenerateRealPdf'
    ];

    for (const key of forceKeys) {
      if ((input as any)[key]) {
        blockers.push(`${key} blocked`);
      }
    }

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

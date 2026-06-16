import { FiscalProductionCutoverApprovalInput } from './FiscalProductionCutoverApprovalTypes';

export class FiscalProductionCutoverApprovalValidator {
  public static validate(input: FiscalProductionCutoverApprovalInput) {
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
    
    // Additional strict 24.3 blockers
    if (lowerJson.includes('cutover') || lowerJson.includes('rollback') || lowerJson.includes('switchtraffic')) {
        if (!lowerJson.includes('dryrun') && !lowerJson.includes('dry-run') && !lowerJson.includes('plan')) {
             blockers.push('cutover/rollback/switchTraffic blocked');
        } else {
             // Accept valid terms with 'dryrun' etc., block standalone action keywords
            if (strJson.includes('"CUTOVER":TRUE') || strJson.includes('"ROLLBACK":TRUE')) {
               blockers.push('cutover/rollback real keywords blocked');
            }
        }
    }
    
    if (lowerJson.includes('activatev2') || lowerJson.includes('disablelegacy') || lowerJson.includes('deploy') || lowerJson.includes('rollout') || lowerJson.includes('releaseproduction') || lowerJson.includes('activateproduction')) {
        blockers.push('activateV2/disableLegacy/deploy/rollout/releaseProduction/activateProduction blocked');
    }

    if (lowerJson.includes('executableartifact') || lowerJson.includes('publishpackage') || lowerJson.includes('binaryartifact') || lowerJson.includes('shellcommand')) {
        blockers.push('executableArtifact/publishPackage/binaryArtifact/shellCommand blocked');
    }

    const forceKeys = [
      'forceApproveRealCutover', 'forceExecuteRealCutover', 'forceExecuteRealRollback',
      'forceActivateProductionV2', 'forceExecuteRealRelease', 'forceExecuteRealDeploy',
      'forceExecuteRealRollout', 'forcePublishRealPackage', 'forceGenerateExecutableArtifact',
      'forceChangeTraffic', 'forceRouteToV2', 'forceDisableLegacyRoute',
      'forceInstallProxy', 'forceInstallMiddleware', 'forceInstallTap',
      'forceModifyAppUse', 'forceModifyRouterUse', 'forceCallRealEndpoint',
      'forceCallLegacyHandler', 'forceCallV2Handler', 'forceCaptureRequest',
      'forceCaptureResponse', 'forceCapturePayload', 'forceCreateWorker',
      'forceCreateScheduler', 'forceUnlockGate', 'forceGrantRealAuthorization',
      'forceConnectRealDatabase', 'forceExecuteDml', 'forceExecuteDdl',
      'forceCallRealSefaz', 'forceLoadRealCertificate', 'forceReadRealPfx',
      'forceReadCertificatePassword', 'forceUseRealCrypto', 'forceSignRealXml',
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

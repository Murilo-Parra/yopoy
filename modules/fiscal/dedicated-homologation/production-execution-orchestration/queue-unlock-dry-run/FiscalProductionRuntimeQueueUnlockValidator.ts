import { FiscalProductionRuntimeQueueUnlockInput } from './FiscalProductionRuntimeQueueUnlockTypes';

export class FiscalProductionRuntimeQueueUnlockValidator {
  public static validate(input: FiscalProductionRuntimeQueueUnlockInput) {
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

    // specific to 26.3
    const kwToBlock = [
      'canary', 'cutover', 'rollback', 'switchtraffic', 'activatev2', 'disablelegacy',
      'mirrortraffic', 'shadowtraffic', 'duplicaterequest', 'captureresponse',
      'deploy', 'rollout', 'releaseproduction', 'activateproduction',
      'executableartifact', 'publishpackage', 'binaryartifact', 'shellcommand',
      'reversibleactivation', 'productiontrafficswitch', 'finalrelease', 'golive',
      'unlockgate', 'grantauthorization', 'executeproduction', 'commandrunner',
      'runcommand', 'exec(', 'spawn(', 'child_process', 'queue.process', 'setinterval',
      'scheduler', 'cron', 'startworker', 'workerthread', 'runtimeexecution',
      'orchestrationrun', 'productionexecution', 'queueunlock', 'enqueuejob',
      'dispatchworker', 'processjob', 'jobpayload'
    ];

    for (const kw of kwToBlock) {
       if (lowerJson.includes(kw)) {
          if (!lowerJson.includes('dryrun') && !lowerJson.includes('dry-run') && !lowerJson.includes('simulation') && !lowerJson.includes('plan') && !lowerJson.includes('closure') && !lowerJson.includes('evidence') && !lowerJson.includes('blueprint') && !lowerJson.includes('boundary') && !lowerJson.includes('intake') && !lowerJson.includes('sanitizer') && !lowerJson.includes('envelope') && !lowerJson.includes('orchestration') && !lowerJson.includes('manifest') && !lowerJson.includes('noop') && !lowerJson.includes('no-op')) {
             blockers.push(`${kw} blocked`);
          }
       }
    }

    const forceKeys = [
      'forceUnlockRealQueue', 'forceStartCommandQueue', 'forceEnqueueRealJob', 'forceDispatchRealWorker',
      'forceCreateWorker', 'forceCreateScheduler', 'forceCreateCron', 'forceRunCommandRunner', 'forceExecuteShellCommand',
      'forceStartRuntimeExecution', 'forceExecuteProduction', 'forceGrantRealAuthorization', 'forceUnlockRealGate',
      'forceApproveRealDeploy', 'forceExecuteRealDeploy', 'forceExecuteRealRelease', 'forceExecuteRealRollout',
      'forceActivateRealCanary', 'forceApproveRealCutover', 'forceExecuteRealCutover', 'forceExecuteRealRollback',
      'forcePublishRealPackage', 'forceGenerateExecutableArtifact', 'forceActivateProductionV2', 'forceChangeTraffic',
      'forceRouteToV2', 'forceDisableLegacyRoute', 'forceInstallProxy', 'forceInstallMiddleware', 'forceInstallTap',
      'forceModifyAppUse', 'forceModifyRouterUse', 'forceCallRealEndpoint', 'forceCallLegacyHandler', 'forceCallV2Handler',
      'forceCaptureRequest', 'forceCaptureResponse', 'forceCapturePayload', 'forceDuplicateRequest', 'forceMirrorRealTraffic',
      'forceEnableShadowTraffic', 'forceConnectRealDatabase', 'forceExecuteDml', 'forceExecuteDdl', 'forceCallRealSefaz',
      'forceLoadRealCertificate', 'forceReadRealPfx', 'forceReadCertificatePassword', 'forceUseRealCrypto', 'forceSignRealXml',
      'forceGenerateRealPdf'
    ];

    for (const force of forceKeys) {
      if ((input as any)[force]) {
         blockers.push(`${force} blocked`);
      }
    }

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

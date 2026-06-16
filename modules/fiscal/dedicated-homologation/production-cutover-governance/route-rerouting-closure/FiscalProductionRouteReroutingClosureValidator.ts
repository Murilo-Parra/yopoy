import { FiscalProductionRouteReroutingClosureInput } from './FiscalProductionRouteReroutingClosureTypes';

export class FiscalProductionRouteReroutingClosureValidator {
  public static validate(input: FiscalProductionRouteReroutingClosureInput) {
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

    const kwToBlock = [
      'canary', 'cutover', 'rollback', 'switchtraffic', 'activatev2', 'disablelegacy',
      'mirrortraffic', 'shadowtraffic', 'duplicaterequest', 'captureresponse',
      'deploy', 'rollout', 'releaseproduction', 'activateproduction',
      'executableartifact', 'publishpackage', 'binaryartifact', 'shellcommand',
      'commandrunner', 'runcommand', 'exec(', 'spawn(', 'child_process', 'queue.process', 'setinterval',
      'scheduler', 'cron', 'startworker', 'workerthread', 'runtimeexecution',
      'executiongraph', 'executegraph', 'queueunlock', 'enqueuejob', 'dispatchworker',
      'processjob', 'opentransaction', 'committransaction', 'rollbacktransaction',
      'dbtransaction', 'sefazcall', 'signxml', 'generatepdf', 'cryptosign',
      'productionexecution', 'golive', 'reversiblegolive', 'routetov2', 'trafficswitch',
      'reroute', 'rerouting', 'routeswap', 'finalrouteswitch', 'legacydisable',
      'unlockgate', 'grantauthorization', 'executeproduction'
    ];

    for (const kw of kwToBlock) {
       if (lowerJson.includes(kw)) {
          if (!lowerJson.includes('closure') && !lowerJson.includes('inventory') && !lowerJson.includes('noop') && !lowerJson.includes('no-op') && !lowerJson.includes('evidence') && !lowerJson.includes('plan') && !lowerJson.includes('matrix') && !lowerJson.includes('safety') && !lowerJson.includes('comparison')) {
             blockers.push(`${kw} blocked`);
          }
       }
    }

    const forceKeys = [
      'forceExecuteRealRerouting', 'forceApproveRealCutover', 'forceExecuteRealCutover', 'forceExecuteGoLive',
      'forceActivateProductionV2', 'forceChangeTraffic', 'forceRouteToV2', 'forceDisableLegacyRoute',
      'forceInstallProxy', 'forceInstallMiddleware', 'forceInstallTap', 'forceInstallMirror', 'forceInstallSniffer',
      'forceEnableShadowTraffic', 'forceMirrorRealTraffic', 'forceDuplicateRequest', 'forceCaptureRequest',
      'forceCaptureResponse', 'forceCapturePayload', 'forceModifyAppUse', 'forceModifyRouterUse',
      'forceCallRealEndpoint', 'forceCallLegacyHandler', 'forceCallV2Handler', 'forceStartRuntimeExecution',
      'forceStartCommandQueue', 'forceUnlockRealQueue', 'forceEnqueueRealJob', 'forceDispatchRealWorker',
      'forceCreateWorker', 'forceCreateScheduler', 'forceCreateCron', 'forceRunCommandRunner', 'forceExecuteShellCommand',
      'forceOpenRealTransaction', 'forceCommitRealTransaction', 'forceRollbackRealTransaction', 'forceConnectRealDatabase',
      'forceExecuteDml', 'forceExecuteDdl', 'forceCallRealSefaz', 'forceLoadRealCertificate', 'forceReadRealPfx',
      'forceReadCertificatePassword', 'forceUseRealCrypto', 'forceSignRealXml', 'forceGenerateRealPdf',
      'forceExecuteProduction', 'forceGrantRealAuthorization', 'forceUnlockRealGate', 'forceApproveRealDeploy',
      'forceExecuteRealDeploy', 'forceExecuteRealRelease', 'forceExecuteRealRollout', 'forceActivateRealCanary',
      'forceExecuteRealRollback', 'forcePublishRealPackage', 'forceGenerateExecutableArtifact'
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

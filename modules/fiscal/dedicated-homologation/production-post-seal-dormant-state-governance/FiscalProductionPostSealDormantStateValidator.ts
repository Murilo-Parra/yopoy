import { FiscalProductionPostSealDormantStateInput } from './FiscalProductionPostSealDormantStateTypes';

export class FiscalProductionPostSealDormantStateValidator {
  public static validate(input: FiscalProductionPostSealDormantStateInput): string[] {
    const blockers: string[] = [];

    const prohibitedKeys = [
      'forceResumeRealAuthority',
      'forceResumeRealActivation',
      'forceResumeRealRouting',
      'forceResumeRealRuntime',
      'forceResumeRealDatabase',
      'forceResumeRealExternalIntegration',
      'forceResumeRealSensitiveDataAccess',
      'forceCreateRealReentryPath',
      'forceCreateRealActivationPath',
      'forceCreateRealProductionV2Path',
      'forceCreateRealDormancyRecord',
      'forceCreateRealLegalRecord',
      'forceCreateRealOperationalRecord',
      'forceCreateRealHash',
      'forceCreateRealSignature',
      'forceCreateRealProof',
      'forceCreateCryptographicProof',
      'forceGenerateRealPdf',
      'forceGenerateRealZip',
      'forceGenerateRealJson',
      'forceGenerateRealCsv',
      'forceExportRealPackage',
      'forceSendRealPackage',
      'forceNotifyRealStakeholder',
      'forceNotifyRealDirector',
      'forceNotifyRealAuditor',
      'forceNotifyRealRegulator',
      'forceApproveRealGoLive',
      'forceExecuteRealGoLive',
      'forceExecuteRealCutover',
      'forceGrantRealActivationAuthority',
      'forceUnlockRealGate',
      'forceIssueRealAuthorizationToken',
      'forceActivateProductionV2',
      'forceRouteToV2',
      'forceDisableLegacyRoute',
      'forceChangeRealTraffic',
      'forceChangeRealLoadBalancer',
      'forceChangeRealDns',
      'forceInstallRealProxy',
      'forceInstallRealMiddleware',
      'forceInstallRealTap',
      'forceActivateRealMirror',
      'forceActivateRealSniffer',
      'forceActivateRealShadowTraffic',
      'forceStartRealRuntime',
      'forceStartRealQueue',
      'forceEnqueueRealJob',
      'forceDispatchRealWorker',
      'forceCreateRealScheduler',
      'forceCreateRealCron',
      'forceExecuteRealShell',
      'forceExecuteRealCommandRunner',
      'forceConnectRealDatabase',
      'forceOpenRealTransaction',
      'forceExecuteDml',
      'forceExecuteDdl',
      'forceRunRealMigration',
      'forceCallRealSefaz',
      'forceCallRealExternalApi',
      'forceSendRealWebhook',
      'forceSendRealSlack',
      'forceSendRealWhatsapp',
      'forceSendRealEmail',
      'forceSendRealPager',
      'forceReadRealPayload',
      'forceReadRealXml',
      'forceReadRealPdf',
      'forceReadRealTenantData',
      'forceReadRealFiscalDocument',
      'forceReadToken',
      'forceReadRealSecret',
      'forceReadApiKey',
      'forceReadClientSecret',
      'forceReadAuthorizationHeader',
      'forceReadDatabaseUrl',
      'forceReadConnectionString',
      'forceReadRealCertificate',
      'forceReadRealPfx',
      'forceReadCertificatePassword',
      'forceReadPrivateKey',
      'forceUseRealCrypto',
      'forceSignRealXml',
      'forceWriteFilesystem',
      'forceUploadStorage',
      'forceWriteDatabase'
    ];

    for (const key of prohibitedKeys) {
      if ((input as any)[key] === true) {
        blockers.push(`The flag ${key} is strictly prohibited in Module 46.1.`);
      }
    }

    const payloadString = JSON.stringify(input ? input : {}).toLowerCase();
    
    const stringProhibitions = [
      'resumerealauthority', 'resumerealactivation', 'resumerealrouting', 'resumerealruntime',
      'resumerealdatabase', 'resumerealexternalintegration', 'resumerealsensitivedataaccess',
      'createrealreentrypath', 'createrealactivationpath', 'createrealproductionv2path',
      'createrealdormancyrecord', 'createreallegalrecord', 'createrealoperationalrecord',
      'createrealhash', 'createrealsignature', 'createrealproof', 'createcryptographicproof',
      'generaterealpdf', 'generaterealzip', 'generaterealjson', 'generaterealcsv',
      'exportrealpackage', 'sendrealpackage', 'notifyrealstakeholder', 'notifyrealdirector', 'notifyrealauditor', 'notifyrealregulator',
      'approverealgolive', 'executerealgolive', 'executerealcutover', 'grantrealactivationauthority', 'unlockrealgate',
      'issurealauthorizationtoken', 'activateproductionv2', 'routetov2', 'disablelegacy', 'changerealtraffic', 'changerealloadbalancer',
      'changerealdns', 'installrealproxy', 'installrealmiddleware', 'installrealtap', 'activaterealmirror', 'activaterealsniffer',
      'activaterealshadowtraffic', 'startrealruntime', 'startrealqueue', 'enqueuerealjob', 'dispatchrealworker', 'createrealscheduler',
      'createrealcron', 'executerealshell', 'executerealcommandrunner', 'connectdatabase', 'openrealtransaction', 'executedml',
      'executeddl', 'migration', 'migrate', 'callrealsefaz', 'callrealexternalapi', 'sendrealwebhook', 'sendrealslack',
      'sendrealwhatsapp', 'sendrealemail', 'sendrealpager', 'readrealpayload', 'readrealxml', 'readrealpdf', 'readrealtenantdata',
      'readrealfiscaldocument', 'readtoken', 'readrealsecret', 'readapikey', 'readclientsecret', 'readauthorizationheader',
      'readdatabaseurl', 'readconnectionstring', 'readrealcertificate', 'readrealpfx', 'readcertificatepassword', 'readprivatekey',
      'userealcrypto', 'signrealxml', 'writefilesystem', 'uploadstorage', 'writedatabase',
      'fetch(', 'axios', 'request(', 'http.request', 'https.request', 'webhook', 'callback', 'sefaz', 'emitirnfe', 'consultarnfe',
      'autorizarnfe', 'cancelarnfe', 'inutilizarnfe', 'bearer', 'apikey', 'clientsecret', 'token', 'secret', 'privatekey', 'pfx',
      'certificate', 'password', 'certpassword', 'database_url', 'connectionstring', 'fs.write', 'writefile', 'appendfile',
      'createwritestream', 'crypto.createhash', 'createhash', 'createhmac', 'digest', 'checksum', 'sign', 'verify', 'upload',
      's3', 'bucket', 'storage', 'xml bruto', 'pdf/base64 extenso', 'request.body', 'response.body', 'req.rawbody',
      'res.send override', 'res.json override'
    ];

    for (const term of stringProhibitions) {
      if (payloadString.includes(term)) {
        blockers.push(`The term ${term} is strictly prohibited in Module 46.1 payload.`);
      }
    }

    return blockers;
  }
}

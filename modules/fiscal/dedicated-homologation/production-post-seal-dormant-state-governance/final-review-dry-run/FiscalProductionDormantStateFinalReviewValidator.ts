import { FiscalProductionDormantStateFinalReviewInput } from './FiscalProductionDormantStateFinalReviewTypes';

export class FiscalProductionDormantStateFinalReviewValidator {
  public static validate(input: FiscalProductionDormantStateFinalReviewInput): string[] {
    const blockers: string[] = [];

    const prohibitedKeys = [
      'forceCreateRealExecutiveApproval', 'forceCollectRealAcknowledgement', 'forceCollectRealSignature',
      'forceCreateRealMinutes', 'forceCreateRealLegalEffect', 'forceCreateRealLegalRecord',
      'forceCreateRealOperationalRecord', 'forceGenerateRealPdf', 'forceGenerateRealZip',
      'forceGenerateRealJson', 'forceGenerateRealCsv', 'forceExportRealPackage', 'forceSendRealPackage',
      'forceNotifyRealDirector', 'forceNotifyRealAuditor', 'forceNotifyRealRegulator', 'forceNotifyRealStakeholder',
      'forceConcludeRealHandoff', 'forceResumeRealAuthority', 'forceResumeRealActivation', 'forceCreateRealReentryPath',
      'forceUnlockRealGate', 'forceIssueRealAuthorizationToken', 'forceActivateProductionV2', 'forceRouteToV2',
      'forceDisableLegacyRoute', 'forceChangeRealTraffic', 'forceStartRealRuntime', 'forceConnectRealDatabase',
      'forceOpenRealTransaction', 'forceExecuteDml', 'forceExecuteDdl', 'forceRunRealMigration', 'forceCallRealSefaz',
      'forceCallRealExternalApi', 'forceSendRealWebhook', 'forceReadRealPayload', 'forceReadRealXml', 'forceReadRealPdf',
      'forceReadRealTenantData', 'forceReadRealFiscalDocument', 'forceReadToken', 'forceReadRealSecret',
      'forceReadApiKey', 'forceReadClientSecret', 'forceReadAuthorizationHeader', 'forceReadDatabaseUrl',
      'forceReadConnectionString', 'forceReadRealCertificate', 'forceReadRealPfx', 'forceReadCertificatePassword',
      'forceReadPrivateKey', 'forceUseRealCrypto', 'forceSignRealXml', 'forceWriteFilesystem', 'forceUploadStorage',
      'forceWriteDatabase'
    ];

    for (const key of prohibitedKeys) {
      if ((input as any)[key] === true) {
        blockers.push(`The flag ${key} is strictly prohibited in Module 46.4.`);
      }
    }

    const payloadString = JSON.stringify(input ? input : {}).toLowerCase();
    
    const stringProhibitions = [
      'createrealexecutiveapproval', 'collectrealacknowledgement', 'collectrealsignature', 'createrealminutes',
      'createreallegaleffect', 'createreallegalrecord', 'createrealoperationalrecord', 'generaterealpdf',
      'generaterealzip', 'generaterealjson', 'generaterealcsv', 'exportrealpackage', 'sendrealpackage',
      'notifyrealdirector', 'notifyrealauditor', 'notifyrealregulator', 'notifyrealstakeholder', 'concluderealhandoff',
      'resumerealauthority', 'resumerealactivation', 'createrealreentrypath', 'unlockrealgate', 'issurealauthorizationtoken',
      'activateproductionv2', 'routetov2', 'disablelegacy', 'changerealtraffic', 'startrealruntime', 'connectdatabase',
      'openrealtransaction', 'executedml', 'executeddl', 'migration', 'migrate', 'callrealsefaz', 'callrealexternalapi',
      'sendrealwebhook', 'readrealpayload', 'readrealxml', 'readrealpdf', 'readrealtenantdata', 'readrealfiscaldocument',
      'readtoken', 'readrealsecret', 'readapikey', 'readclientsecret', 'readauthorizationheader', 'readdatabaseurl',
      'readconnectionstring', 'readrealcertificate', 'readrealpfx', 'readcertificatepassword', 'readprivatekey',
      'userealcrypto', 'signrealxml', 'writefilesystem', 'uploadstorage', 'writedatabase', 'fetch(', 'axios',
      'request(', 'http.request', 'https.request', 'webhook', 'callback', 'sefaz', 'authorizationheader', 'bearer',
      'apikey', 'clientsecret', 'token', 'secret', 'privatekey', 'pfx', 'certificate', 'password', 'certpassword',
      'database_url', 'connectionstring', 'fs.readfile', 'fs.write', 'writefile', 'appendfile', 'createwritestream',
      'crypto.createhash', 'createhash', 'createhmac', 'digest', 'checksum', 'sign', 'verify', 'upload', 's3',
      'bucket', 'storage', 'xml bruto', 'pdf/base64 extenso', 'request.body', 'response.body', 'req.rawbody',
      'res.send override', 'res.json override'
    ];

    for (const term of stringProhibitions) {
      if (payloadString.includes(term)) {
        blockers.push(`The term ${term} is strictly prohibited in Module 46.4 payload.`);
      }
    }

    return blockers;
  }
}

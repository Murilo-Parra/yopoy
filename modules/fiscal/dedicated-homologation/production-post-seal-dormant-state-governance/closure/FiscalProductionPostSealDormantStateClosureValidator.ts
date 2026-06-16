import { FiscalProductionPostSealDormantStateClosureInput } from './FiscalProductionPostSealDormantStateClosureTypes';

export class FiscalProductionPostSealDormantStateClosureValidator {
  public static validate(input: FiscalProductionPostSealDormantStateClosureInput): string[] {
    const blockers: string[] = [];

    const prohibitedKeys = [
      'forceExecuteRealClosure', 'forceConcludeRealHandoff', 'forceCreateRealReentry', 'forceUnlockRealResumption',
      'forceResumeRealAuthority', 'forceResumeRealActivation', 'forceCreateRealExecutiveApproval', 'forceCollectRealSignature',
      'forceCreateRealLegalEffect', 'forceUnlockRealGate', 'forceIssueRealAuthorizationToken', 'forceActivateProductionV2',
      'forceRouteToV2', 'forceDisableLegacyRoute', 'forceChangeRealTraffic', 'forceStartRealRuntime',
      'forceConnectRealDatabase', 'forceOpenRealTransaction', 'forceExecuteDml', 'forceExecuteDdl',
      'forceRunRealMigration', 'forceCallRealSefaz', 'forceCallRealExternalApi', 'forceSendRealWebhook',
      'forceReadRealPayload', 'forceReadRealXml', 'forceReadRealPdf', 'forceReadRealTenantData',
      'forceReadRealFiscalDocument', 'forceReadToken', 'forceReadRealSecret', 'forceReadApiKey',
      'forceReadClientSecret', 'forceReadAuthorizationHeader', 'forceReadDatabaseUrl', 'forceReadConnectionString',
      'forceReadRealCertificate', 'forceReadRealPfx', 'forceReadPrivateKey', 'forceUseRealCrypto',
      'forceSignRealXml', 'forceWriteFilesystem', 'forceUploadStorage', 'forceWriteDatabase'
    ];

    for (const key of prohibitedKeys) {
      if ((input as any)[key] === true) {
        blockers.push(`The flag ${key} is strictly prohibited in Module 46.5.`);
      }
    }

    return blockers;
  }
}

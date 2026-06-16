import { FiscalFinalGoLiveInput } from './FiscalFinalGoLiveTypes';

export class FiscalFinalGoLiveValidator {
  public static validate(input: FiscalFinalGoLiveInput) {
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
    
    if (lowerJson.includes('jira') || lowerJson.includes('trello') || lowerJson.includes('asana')) {
      blockers.push('jira/trello/asana blocked');
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

    const forceKeys = [
      'forceActivateProductionV2', 'forceChangeTraffic', 'forceRouteToV2',
      'forceDisableLegacyRoute', 'forceActivateRelease', 'forceActivateCanary',
      'forceModifyAppUse', 'forceInstallMiddleware', 'forceInstallTap',
      'forceCreateWorker', 'forceCreateScheduler', 'forceUnlockGate',
      'forceGrantRealAuthorization', 'forceGrantLegalSignOff', 'forcePersistLegalSignature',
      'forceCreateDefinitiveLegalRecord', 'forceAcceptRealRisk', 'forceGrantRealWaiver',
      'forceNotifyExternalApprover', 'forceNotifyExternalSigner', 'forceSendWebhook',
      'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail', 'forceConnectRealDatabase',
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

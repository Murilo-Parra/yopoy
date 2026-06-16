import { FiscalOperationalObservabilityDryRunInput } from './FiscalOperationalObservabilityDryRunTypes';

export class FiscalOperationalObservabilityDryRunValidator {
  public static validate(input: FiscalOperationalObservabilityDryRunInput) {
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

    if (input.forceInstallObservability) blockers.push('forceInstallObservability blocked');
    if (input.forceCreateProductionAlert) blockers.push('forceCreateProductionAlert blocked');
    if (input.forceOpenRealIncident) blockers.push('forceOpenRealIncident blocked');
    if (input.forceNotifyExternalOperator) blockers.push('forceNotifyExternalOperator blocked');
    if (input.forceSendWebhook) blockers.push('forceSendWebhook blocked');
    if (input.forceSendSlack) blockers.push('forceSendSlack blocked');
    if (input.forceSendWhatsapp) blockers.push('forceSendWhatsapp blocked');
    if (input.forceSendEmail) blockers.push('forceSendEmail blocked');
    if (input.forceCaptureRealRequest) blockers.push('forceCaptureRealRequest blocked');
    if (input.forceCaptureRealResponse) blockers.push('forceCaptureRealResponse blocked');
    if (input.forceExecuteRunbook) blockers.push('forceExecuteRunbook blocked');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 blocked');
    if (input.forceChangeTraffic) blockers.push('forceChangeTraffic blocked');
    if (input.forceModifyAppUse) blockers.push('forceModifyAppUse blocked');
    if (input.forceInstallMiddleware) blockers.push('forceInstallMiddleware blocked');
    if (input.forceInstallTap) blockers.push('forceInstallTap blocked');
    if (input.forceCreateWorker) blockers.push('forceCreateWorker blocked');
    if (input.forceCreateScheduler) blockers.push('forceCreateScheduler blocked');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization blocked');
    if (input.forceConnectRealDatabase) blockers.push('forceConnectRealDatabase blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml blocked');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl blocked');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz blocked');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate blocked');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml blocked');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf blocked');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

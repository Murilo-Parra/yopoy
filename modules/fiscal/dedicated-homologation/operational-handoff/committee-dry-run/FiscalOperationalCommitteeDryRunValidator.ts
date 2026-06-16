import { FiscalOperationalCommitteeDryRunInput } from './FiscalOperationalCommitteeDryRunTypes';

export class FiscalOperationalCommitteeDryRunValidator {
  public static validate(input: FiscalOperationalCommitteeDryRunInput) {
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

    if (lowerJson.includes('webhook') || lowerJson.includes('slack') || lowerJson.includes('whatsapp') || lowerJson.includes('email.send') || lowerJson.includes('nodemailer') || lowerJson.includes('jira') || lowerJson.includes('trello') || lowerJson.includes('asana')) {
      blockers.push('webhook/slack/whatsapp/email.send/nodemailer/jira/trello/asana blocked');
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

    if (input.forceGrantCommitteeApproval) blockers.push('forceGrantCommitteeApproval blocked');
    if (input.forceAcceptRealRisk) blockers.push('forceAcceptRealRisk blocked');
    if (input.forceGrantRealWaiver) blockers.push('forceGrantRealWaiver blocked');
    if (input.forceNotifyExternalApprover) blockers.push('forceNotifyExternalApprover blocked');
    if (input.forceCreateRealTicket) blockers.push('forceCreateRealTicket blocked');
    if (input.forceOpenRealIncident) blockers.push('forceOpenRealIncident blocked');
    if (input.forceExecuteRunbook) blockers.push('forceExecuteRunbook blocked');
    if (input.forceInstallObservability) blockers.push('forceInstallObservability blocked');
    if (input.forceCreateProductionAlert) blockers.push('forceCreateProductionAlert blocked');
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

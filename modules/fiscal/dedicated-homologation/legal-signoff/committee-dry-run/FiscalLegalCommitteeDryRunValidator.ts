import { FiscalLegalCommitteeDryRunInput } from './FiscalLegalCommitteeDryRunTypes';

export class FiscalLegalCommitteeDryRunValidator {
  public static validate(input: FiscalLegalCommitteeDryRunInput) {
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

    // Force variables
    const forceKeys = [
      'forceGrantLegalSignOff', 'forcePersistLegalSignature', 'forceCreateDefinitiveLegalRecord',
      'forceGrantCommitteeApproval', 'forceAcceptRealRisk', 'forceGrantRealWaiver',
      'forceNotifyExternalApprover', 'forceNotifyExternalSigner', 'forceSendWebhook',
      'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail', 'forceLoadRealCertificate',
      'forceReadRealPfx', 'forceReadCertificatePassword', 'forceSignRealXml', 'forceGenerateRealPdf',
      'forceExecuteRunbook', 'forceActivateProductionV2', 'forceChangeTraffic', 'forceModifyAppUse',
      'forceInstallMiddleware', 'forceInstallTap', 'forceCreateWorker', 'forceCreateScheduler',
      'forceUnlockGate', 'forceGrantRealAuthorization', 'forceConnectRealDatabase', 'forceExecuteDml',
      'forceExecuteDdl', 'forceCallRealSefaz'
    ];

    for (const key of forceKeys) {
      if ((input as any)[key]) {
        blockers.push(`${key} blocked`);
      }
    }

    // Role SoD validation
    if (input.committeePurpose) {
      if (!input.committeeChair) blockers.push('committeeChair missing for approval simulation');
      if (input.committeeChair === input.requestedBy) {
        blockers.push('committeeChair cannot be requestedBy');
      }
    }

    if (input.committeePurpose === 'legal-review' || input.committeePurpose === 'approval') {
      if (!input.legalReviewer) blockers.push('legalReviewer missing for legal review');
      if (input.legalReviewer === input.requestedBy) {
        blockers.push('legalReviewer cannot be requestedBy');
      }
    }

    if (input.committeePurpose === 'risk-acceptance') {
      if (!input.riskReviewer) blockers.push('riskReviewer missing for risk acceptance');
      if (input.riskReviewer === input.requestedBy) {
        blockers.push('riskReviewer cannot be requestedBy');
      }
    }

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

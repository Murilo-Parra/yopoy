import { FiscalLegalSignatureDryRunInput } from './FiscalLegalSignatureDryRunTypes';

export class FiscalLegalSignatureDryRunValidator {
  public static validate(input: FiscalLegalSignatureDryRunInput) {
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

    if (input.forceGrantLegalSignOff) blockers.push('forceGrantLegalSignOff blocked');
    if (input.forcePersistLegalSignature) blockers.push('forcePersistLegalSignature blocked');
    if (input.forceCreateDefinitiveLegalRecord) blockers.push('forceCreateDefinitiveLegalRecord blocked');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate blocked');
    if (input.forceReadRealPfx) blockers.push('forceReadRealPfx blocked');
    if (input.forceReadCertificatePassword) blockers.push('forceReadCertificatePassword blocked');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml blocked');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf blocked');
    if (input.forceNotifyExternalSigner) blockers.push('forceNotifyExternalSigner blocked');
    if (input.forceSendWebhook) blockers.push('forceSendWebhook blocked');
    if (input.forceSendSlack) blockers.push('forceSendSlack blocked');
    if (input.forceSendWhatsapp) blockers.push('forceSendWhatsapp blocked');
    if (input.forceSendEmail) blockers.push('forceSendEmail blocked');
    if (input.forceGrantCommitteeApproval) blockers.push('forceGrantCommitteeApproval blocked');
    if (input.forceAcceptRealRisk) blockers.push('forceAcceptRealRisk blocked');
    if (input.forceGrantRealWaiver) blockers.push('forceGrantRealWaiver blocked');
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

    // SoD Review Blocks logic applied to valid check
    if (input.requestedBy && (input.requestedBy === input.signerA || input.requestedBy === input.signerB)) {
      blockers.push('requestedBy === signerA/signerB blocked');
    }
    if (input.signerA && input.signerA === input.signerB) {
      blockers.push('signerA === signerB blocked');
    }
    
    // Additional requirement: signerA/signerB missing when simulating signature intent
    if (input.signaturePurpose) {
      if (!input.signerA) blockers.push('signerA missing for signature attempt');
      if (!input.signerB) blockers.push('signerB missing for signature attempt');
    }

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

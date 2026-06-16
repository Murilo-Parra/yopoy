import { FiscalLegalAuditImmutabilityInput } from './FiscalLegalAuditImmutabilityTypes';

export class FiscalLegalAuditImmutabilityValidator {
  public static validate(input: FiscalLegalAuditImmutabilityInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toUpperCase();

    if (jsonStr.includes('PRIVATEKEY') || jsonStr.includes('PFX') || jsonStr.includes('CERTIFICATE') || jsonStr.includes('PASSWORD') || jsonStr.includes('TOKEN') || jsonStr.includes('DATABASE_URL') || jsonStr.includes('SEFAZ_CERT_PASSWORD') || jsonStr.includes('A1_CERTIFICATE_PFX')) {
      blockers.push('DATABASE_URL/privateKey/pfx/certificate/password/token blocked');
    }
    
    if (jsonStr.includes('NODE-FORGE') || jsonStr.includes('XML-CRYPTO') || jsonStr.includes('CRYPTO.SIGN')) {
      blockers.push('node-forge/xml-crypto/crypto.sign blocked');
    }

    if (jsonStr.includes('FETCH(') || jsonStr.includes('AXIOS') || jsonStr.includes('REQUEST(')) {
      blockers.push('fetch/axios/request blocked');
    }
    
    if (jsonStr.includes('INSERT INTO') || jsonStr.includes('UPDATE ') || jsonStr.includes('DELETE ') || jsonStr.includes('COMMIT')) {
      blockers.push('INSERT/UPDATE/DELETE/COMMIT blocked');
    }
    
    if (jsonStr.includes('CREATE TABLE') || jsonStr.includes('ALTER TABLE') || jsonStr.includes('DROP TABLE')) {
      blockers.push('CREATE/ALTER/DROP TABLE blocked');
    }
    
    const lowerJson = jsonStr.toLowerCase();
    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    if (input.forceCalculateRealHash) blockers.push('forceCalculateRealHash blocked');
    if (input.forceSignLegalTrail) blockers.push('forceSignLegalTrail blocked');
    if (input.forceSignApprovalRecord) blockers.push('forceSignApprovalRecord blocked');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate blocked');
    if (input.forceReadRealPfx) blockers.push('forceReadRealPfx blocked');
    if (input.forceReadCertificatePassword) blockers.push('forceReadCertificatePassword blocked');
    if (input.forceCallExternalEndpoint) blockers.push('forceCallExternalEndpoint blocked');
    if (input.forcePersistLegalTrail) blockers.push('forcePersistLegalTrail blocked');
    if (input.forcePersistLegalEvent) blockers.push('forcePersistLegalEvent blocked');
    if (input.forcePersistApprovalRecord) blockers.push('forcePersistApprovalRecord blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml blocked');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl blocked');
    if (input.forceCommit) blockers.push('forceCommit blocked');
    if (input.forceConnectRealDatabase) blockers.push('forceConnectRealDatabase blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization blocked');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate blocked');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz blocked');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 blocked');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

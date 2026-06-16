import { FiscalRealApprovalMockSignatureInput } from './FiscalRealApprovalMockSignatureTypes';

export class FiscalRealApprovalSignatureValidator {
  public static validate(input: FiscalRealApprovalMockSignatureInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toUpperCase();

    if (jsonStr.includes('NODE-FORGE')) blockers.push('node-forge blocked');
    if (jsonStr.includes('XML-CRYPTO')) blockers.push('xml-crypto blocked');
    if (jsonStr.includes('PRIVATEKEY')) blockers.push('privateKey blocked');
    if (jsonStr.includes('PFX')) blockers.push('pfx blocked');
    if (jsonStr.includes('CERTIFICATE')) blockers.push('certificate blocked');
    if (jsonStr.includes('PASSWORD') || jsonStr.includes('TOKEN')) blockers.push('password/token blocked');
    if (jsonStr.includes('SEFAZ_CERT_PASSWORD')) blockers.push('SEFAZ_CERT_PASSWORD blocked');
    if (jsonStr.includes('A1_CERTIFICATE_PFX')) blockers.push('A1_CERTIFICATE_PFX blocked');
    if (jsonStr.includes('FETCH(')) blockers.push('fetch( blocked');
    if (jsonStr.includes('AXIOS')) blockers.push('axios blocked');
    if (jsonStr.includes('REQUEST(')) blockers.push('request( blocked');
    if (jsonStr.includes('INSERT INTO')) blockers.push('INSERT INTO blocked');
    if (jsonStr.includes('UPDATE ')) blockers.push('UPDATE blocked');
    if (jsonStr.includes('DELETE ')) blockers.push('DELETE blocked');
    if (jsonStr.includes('COMMIT')) blockers.push('COMMIT blocked');

    const lowerJson = jsonStr.toLowerCase();
    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate blocked');
    if (input.forceReadRealPfx) blockers.push('forceReadRealPfx blocked');
    if (input.forceReadCertificatePassword) blockers.push('forceReadCertificatePassword blocked');
    if (input.forceSignRealApprovalRecord) blockers.push('forceSignRealApprovalRecord blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization blocked');
    if (input.forceNotifyExternalApprover) blockers.push('forceNotifyExternalApprover blocked');
    if (input.forceCallExternalAuthorizationEndpoint) blockers.push('forceCallExternalAuthorizationEndpoint blocked');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz blocked');
    if (input.forcePersistApprovalRecord) blockers.push('forcePersistApprovalRecord blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml blocked');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate blocked');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 blocked');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

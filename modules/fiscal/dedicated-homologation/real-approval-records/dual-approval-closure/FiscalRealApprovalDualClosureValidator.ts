import { FiscalRealApprovalDualClosureInput } from './FiscalRealApprovalDualClosureTypes';

export class FiscalRealApprovalDualClosureValidator {
  public static validate(input: FiscalRealApprovalDualClosureInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toUpperCase();

    if (jsonStr.includes('PRIVATEKEY') || jsonStr.includes('PFX') || jsonStr.includes('CERTIFICATE') || jsonStr.includes('PASSWORD') || jsonStr.includes('TOKEN')) {
      blockers.push('privateKey/pfx/certificate/password/token blocked');
    }
    if (jsonStr.includes('DATABASE_URL')) blockers.push('DATABASE_URL blocked');
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

    if (input.forceCompleteDualApproval) blockers.push('forceCompleteDualApproval blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization blocked');
    if (input.forcePersistApprovalRecord) blockers.push('forcePersistApprovalRecord blocked');
    if (input.forceSignApprovalRecord) blockers.push('forceSignApprovalRecord blocked');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate blocked');
    if (input.forceNotifyExternalApprover) blockers.push('forceNotifyExternalApprover blocked');
    if (input.forceCallExternalEndpoint) blockers.push('forceCallExternalEndpoint blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml blocked');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl blocked');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate blocked');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply blocked');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz blocked');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 blocked');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

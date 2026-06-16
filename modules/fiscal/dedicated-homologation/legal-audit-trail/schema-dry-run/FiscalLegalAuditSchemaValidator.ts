import { FiscalLegalAuditSchemaDryRunInput } from './FiscalLegalAuditSchemaDryRunTypes';

export class FiscalLegalAuditSchemaValidator {
  public static validate(input: FiscalLegalAuditSchemaDryRunInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toUpperCase();

    if (jsonStr.includes('PRIVATEKEY') || jsonStr.includes('PFX') || jsonStr.includes('CERTIFICATE') || jsonStr.includes('PASSWORD') || jsonStr.includes('TOKEN')) {
      blockers.push('DATABASE_URL/privateKey/pfx/certificate/password/token blocked');
    }
    if (jsonStr.includes('DATABASE_URL')) blockers.push('DATABASE_URL/privateKey/pfx/certificate/password/token blocked');
    
    if (jsonStr.includes('FETCH(') || jsonStr.includes('AXIOS') || jsonStr.includes('REQUEST(')) {
      blockers.push('fetch/axios/request blocked');
    }
    
    if (jsonStr.includes('INSERT INTO') || jsonStr.includes('UPDATE ') || jsonStr.includes('DELETE ') || jsonStr.includes('COMMIT')) {
      blockers.push('INSERT/UPDATE/DELETE/COMMIT blocked');
    }
    
    if (jsonStr.includes('CREATE TABLE') || jsonStr.includes('ALTER TABLE') || jsonStr.includes('DROP TABLE')) {
      blockers.push('CREATE/ALTER/DROP TABLE blocked');
    }
    
    if (jsonStr.includes('CREATE INDEX') || jsonStr.includes('CREATE POLICY') || jsonStr.includes('ALTER POLICY') || jsonStr.includes('DROP POLICY')) {
      blockers.push('CREATE INDEX / CREATE POLICY / ALTER POLICY blocked');
    }
    
    if (jsonStr.includes('BEGIN') || jsonStr.includes('TRANSACTION')) {
      blockers.push('BEGIN/TRANSACTION blocked');
    }
    
    const lowerJson = jsonStr.toLowerCase();
    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    if (input.forceCreateRealLedger) blockers.push('forceCreateRealLedger blocked');
    if (input.forceExecuteMigration) blockers.push('forceExecuteMigration blocked');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml blocked');
    if (input.forceCreateTable) blockers.push('forceCreateTable blocked');
    if (input.forceAlterTable) blockers.push('forceAlterTable blocked');
    if (input.forceDropTable) blockers.push('forceDropTable blocked');
    if (input.forceCreateIndex) blockers.push('forceCreateIndex blocked');
    if (input.forceApplyRls) blockers.push('forceApplyRls blocked');
    if (input.forceApplyRetentionPolicy) blockers.push('forceApplyRetentionPolicy blocked');
    if (input.forceDeleteRetentionData) blockers.push('forceDeleteRetentionData blocked');
    if (input.forceCommit) blockers.push('forceCommit blocked');
    if (input.forceConnectRealDatabase) blockers.push('forceConnectRealDatabase blocked');
    if (input.forcePersistLegalTrail) blockers.push('forcePersistLegalTrail blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization blocked');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate blocked');
    if (input.forceCallExternalEndpoint) blockers.push('forceCallExternalEndpoint blocked');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz blocked');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 blocked');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

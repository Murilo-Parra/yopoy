import { FiscalRealApprovalSchemaDryRunInput, FiscalRealApprovalSchemaDryRunResult } from './FiscalRealApprovalSchemaDryRunTypes';

export class FiscalRealApprovalSchemaValidator {
  public static validate(input: FiscalRealApprovalSchemaDryRunInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toUpperCase();

    if (jsonStr.includes('CREATE TABLE')) blockers.push('CREATE TABLE blocked');
    if (jsonStr.includes('ALTER TABLE')) blockers.push('ALTER TABLE blocked');
    if (jsonStr.includes('DROP TABLE')) blockers.push('DROP TABLE blocked');
    if (jsonStr.includes('CREATE INDEX')) blockers.push('CREATE INDEX blocked');
    if (jsonStr.includes('CREATE POLICY')) blockers.push('CREATE POLICY blocked');
    if (jsonStr.includes('ALTER POLICY')) blockers.push('ALTER POLICY blocked');
    if (jsonStr.includes('INSERT INTO')) blockers.push('INSERT INTO blocked');
    if (jsonStr.includes('UPDATE ')) blockers.push('UPDATE blocked');
    if (jsonStr.includes('DELETE ')) blockers.push('DELETE blocked');
    if (jsonStr.includes('COMMIT')) blockers.push('COMMIT blocked');
    if (jsonStr.includes('DATABASE_URL')) blockers.push('DATABASE_URL blocked');

    const lowerJson = jsonStr.toLowerCase();
    if (lowerJson.includes('privatekey')) blockers.push('privateKey blocked');
    if (lowerJson.includes('pfx')) blockers.push('pfx blocked');
    if (lowerJson.includes('password') || lowerJson.includes('token') || lowerJson.includes('certificate')) blockers.push('password/token/certificate blocked');
    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    if (input.forceExecuteMigration) blockers.push('forceExecuteMigration blocked');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml blocked');
    if (input.forceCreateTable) blockers.push('forceCreateTable blocked');
    if (input.forceAlterTable) blockers.push('forceAlterTable blocked');
    if (input.forceDropTable) blockers.push('forceDropTable blocked');
    if (input.forceCreateIndex) blockers.push('forceCreateIndex blocked');
    if (input.forceApplyRls) blockers.push('forceApplyRls blocked');
    if (input.forceCommit) blockers.push('forceCommit blocked');
    if (input.forceConnectRealDatabase) blockers.push('forceConnectRealDatabase blocked');
    if (input.forcePersistApprovalRecord) blockers.push('forcePersistApprovalRecord blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization blocked');
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

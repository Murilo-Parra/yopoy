import { FiscalRealApprovalRecordDryRunInput } from './FiscalRealApprovalRecordDryRunTypes';

export class FiscalRealApprovalRecordIntegrityValidator {
  public static validate(input: FiscalRealApprovalRecordDryRunInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toLowerCase();

    if (jsonStr.includes('payload') || jsonStr.includes('raw_body')) blockers.push('Raw payload content detected in dry-run request. Blocked.');
    if (jsonStr.includes('database_url')) blockers.push('DATABASE_URL detected. Blocked.');
    if (jsonStr.includes('privatekey') || jsonStr.includes('pfx')) blockers.push('Private key or PFX material detected. Blocked.');
    if (jsonStr.includes('password') || jsonStr.includes('token') || jsonStr.includes('certificate')) blockers.push('Credential fields detected. Blocked.');
    if (jsonStr.includes('<xml') && jsonStr.length > 500) blockers.push('Raw XML payload detected. Blocked.');
    if (jsonStr.includes('pdf') || jsonStr.includes('base64')) warnings.push('Extended Base64 or binary indicators present. Filtered in dry-run.');
    if (jsonStr.includes('exec(') || jsonStr.includes('spawn(')) blockers.push('Command execution fragment detected. Blocked.');

    if (input.forcePersistApprovalRecord) blockers.push('forcePersistApprovalRecord is blocked.');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl is blocked.');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml is blocked.');
    if (input.forceCommit) blockers.push('forceCommit is blocked.');
    if (input.forceSignApprovalRecord) blockers.push('forceSignApprovalRecord is blocked.');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization is blocked.');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate is blocked.');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply is blocked.');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz is blocked.');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 is blocked.');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

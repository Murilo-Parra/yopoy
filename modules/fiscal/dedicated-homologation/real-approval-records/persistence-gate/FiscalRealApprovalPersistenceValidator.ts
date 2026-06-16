import { FiscalRealApprovalPersistenceGateInput } from './FiscalRealApprovalPersistenceGateTypes';

export class FiscalRealApprovalPersistenceValidator {
  public static validate(input: FiscalRealApprovalPersistenceGateInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toLowerCase();

    if (jsonStr.includes('terraform apply')) blockers.push('terraform apply blocked');
    if (jsonStr.includes('pulumi up')) blockers.push('pulumi up blocked');
    if (jsonStr.includes('cloudformation deploy')) blockers.push('cloudformation deploy blocked');
    if (jsonStr.includes('exec(') || jsonStr.includes('spawn(') || jsonStr.includes('child_process')) blockers.push('exec/spawn/child_process blocked');
    if (jsonStr.includes('database_url')) blockers.push('DATABASE_URL blocked');
    if (jsonStr.includes('privatekey')) blockers.push('privateKey blocked');
    if (jsonStr.includes('pfx')) blockers.push('pfx blocked');
    if (jsonStr.includes('password') || jsonStr.includes('token') || jsonStr.includes('certificate')) blockers.push('password/token/certificate blocked');
    if (jsonStr.includes('<xml') && jsonStr.length > 500) blockers.push('XML bruto blocked');
    if (jsonStr.includes('pdf') || jsonStr.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    if (input.forcePersistApprovalRecord) blockers.push('forcePersistApprovalRecord is blocked');
    if (input.forceExecuteMigration) blockers.push('forceExecuteMigration is blocked');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl is blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml is blocked');
    if (input.forceInsert) blockers.push('forceInsert is blocked');
    if (input.forceUpdate) blockers.push('forceUpdate is blocked');
    if (input.forceDelete) blockers.push('forceDelete is blocked');
    if (input.forceCommit) blockers.push('forceCommit is blocked');
    if (input.forceSignApprovalRecord) blockers.push('forceSignApprovalRecord is blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization is blocked');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate is blocked');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply is blocked');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz is blocked');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 is blocked');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

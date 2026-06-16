import { FiscalRealApprovalRecordInput } from './FiscalRealApprovalRecordTypes';

export class FiscalRealApprovalRecordValidator {
  public static validate(input: FiscalRealApprovalRecordInput): { valid: boolean; blockers: string[]; warnings: string[] } {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toLowerCase();

    if (jsonStr.includes('terraform apply')) blockers.push('Terraform apply fragment detected in request metadata. Blocked.');
    if (jsonStr.includes('pulumi up')) blockers.push('Pulumi up fragment detected in request metadata. Blocked.');
    if (jsonStr.includes('cloudformation deploy')) blockers.push('CloudFormation deploy fragment detected in request metadata. Blocked.');
    if (jsonStr.includes('exec(') || jsonStr.includes('spawn(') || jsonStr.includes('child_process')) blockers.push('Node shell fragment detected in request metadata. Blocked.');
    if (jsonStr.includes('database_url')) blockers.push('DATABASE_URL detected. Blocked.');
    if (jsonStr.includes('privatekey')) blockers.push('privateKey detected. Blocked.');
    if (jsonStr.includes('password') || jsonStr.includes('token') || jsonStr.includes('certificate')) blockers.push('Credential field names detected. Blocked.');
    if (jsonStr.includes('<xml') && jsonStr.length > 500) blockers.push('Raw XML payload detected. Blocked.');
    if (jsonStr.startsWith('jvber') || jsonStr.includes('base64')) warnings.push('Base64 large structure masked/warned.');
    if (jsonStr.includes('production') || jsonStr.includes('prod_v2')) blockers.push('Attempt to plan records for absolute production detected and blocked.');

    if (input.forcePersistApprovalRecord) blockers.push('forcePersistApprovalRecord is blocked.');
    if (input.forceSignApprovalRecord) blockers.push('forceSignApprovalRecord is blocked.');
    if (input.forceCompleteDualApproval) blockers.push('forceCompleteDualApproval is blocked.');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization is blocked.');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate is blocked.');
    if (input.forceAuthorizeRealExecution) blockers.push('forceAuthorizeRealExecution is blocked.');
    if (input.forceStartExecution) blockers.push('forceStartExecution is blocked.');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply is blocked.');
    if (input.forcePulumiUp) blockers.push('forcePulumiUp is blocked.');
    if (input.forceCloudDeploy) blockers.push('forceCloudDeploy is blocked.');
    if (input.forceCreateRealDatabase) blockers.push('forceCreateRealDatabase is blocked.');
    if (input.forceCreateRealVault) blockers.push('forceCreateRealVault is blocked.');
    if (input.forceWriteRealSecret) blockers.push('forceWriteRealSecret is blocked.');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate is blocked.');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz is blocked.');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml is blocked.');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf is blocked.');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 is blocked.');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

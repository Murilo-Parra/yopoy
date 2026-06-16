import { FiscalRealAuthorizationPayloadInput } from './FiscalRealExecutionActionPlanTypes';

export class FiscalRealAuthorizationPayloadValidator {
  public static validate(input: FiscalRealAuthorizationPayloadInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    if (input.forceUnlockGate) blockers.push('forceUnlockGate is blocked.');
    if (input.forceAuthorizeRealExecution) blockers.push('forceAuthorizeRealExecution is blocked.');
    if (input.forceStartExecution) blockers.push('forceStartExecution is blocked.');
    if (input.forceTerraformApply) blockers.push('forceTerraformApply is blocked.');
    if (input.forcePulumiUp) blockers.push('forcePulumiUp is blocked.');
    if (input.forceCloudDeploy) blockers.push('forceCloudDeploy is blocked.');

    const metadataStr = JSON.stringify(input.metadata || {});
    
    if (metadataStr.includes('terraform apply')) blockers.push('terraform apply command detected in payload.');
    if (metadataStr.includes('pulumi up')) blockers.push('pulumi up command detected in payload.');
    if (metadataStr.includes('cloudformation deploy')) blockers.push('cloudformation deploy command detected in payload.');
    if (metadataStr.includes('DATABASE_URL')) blockers.push('DATABASE_URL detected in payload.');
    if (metadataStr.includes('.pfx')) blockers.push('PFX detected in payload.');
    if (metadataStr.includes('privateKey')) blockers.push('privateKey detected in payload.');
    if (metadataStr.includes('password')) blockers.push('password detected in payload.');
    if (metadataStr.includes('token')) blockers.push('token detected in payload.');
    if (metadataStr.includes('certificate')) blockers.push('certificate detected in payload.');
    if (metadataStr.includes('<?xml')) blockers.push('XML content detected in payload.');
    if (metadataStr.length > 5000) warnings.push('Payload exceeds normal length limits; could contain binary data or large strings.');

    return { blockers, warnings, valid: blockers.length === 0 };
  }
}

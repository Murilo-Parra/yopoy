import { FiscalRealCommandManifestInput } from './FiscalRealCommandManifestTypes';

export class FiscalRealCommandManifestValidator {
  public static validate(input: FiscalRealCommandManifestInput): { valid: boolean; blockers: string[]; warnings: string[] } {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const jsonStr = JSON.stringify(input || {}).toLowerCase();

    if (jsonStr.includes('terraform apply')) blockers.push('Terraform apply fragment detected in command preview. Blocked.');
    if (jsonStr.includes('pulumi up')) blockers.push('Pulumi up fragment detected in command preview. Blocked.');
    if (jsonStr.includes('cloudformation deploy')) blockers.push('CloudFormation deploy fragment detected in command preview. Blocked.');
    if (jsonStr.includes('exec(') || jsonStr.includes('spawn(') || jsonStr.includes('child_process')) blockers.push('Node shell fragment detected in command preview. Blocked.');
    if (jsonStr.includes('kubectl apply')) blockers.push('Kubernetes apply fragment detected in command preview. Blocked.');
    if (jsonStr.includes('vault write')) blockers.push('Vault write fragment detected in command preview. Blocked.');
    if (jsonStr.includes('psql')) blockers.push('Database execution fragment detected. Blocked.');
    if (jsonStr.includes('database_url')) blockers.push('DATABASE_URL detected. Blocked.');
    if (jsonStr.includes('privatekey')) blockers.push('privateKey detected. Blocked.');
    if (jsonStr.includes('<xml') && jsonStr.length > 500) blockers.push('Raw XML payload detected. Blocked.');
    if (jsonStr.startsWith('jvber') || jsonStr.includes('base64')) warnings.push('Base64 large structure masked/warned.');

    if (input.proposedCommands?.some((c: any) => c.executable)) blockers.push('Commands marked executable are strictly forbidden.');
    
    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}

export class FiscalDeploymentPackageShapeValidator {
  public static validateShape(input: any) {
    const blockers: string[] = [];
    const warnings: string[] = [];
    
    // Simulate shape validation blocking raw payloads, xml, pdf, base64 and secrets
    const strObj = JSON.stringify(input || {}).toLowerCase();
    
    if (strObj.includes('payload_bruto') || strObj.includes('raw_payload')) {
      blockers.push('raw payload blocked');
    }
    if (strObj.includes('<xml') && strObj.length > 500) {
      blockers.push('XML bruto blocked');
    }
    if (strObj.includes('pdf') || strObj.includes('base64')) {
      warnings.push('PDF/base64 mock warning');
    }
    if (strObj.includes('secret') || strObj.includes('password') || strObj.includes('token')) {
      blockers.push('secrets exposure blocked');
    }

    return {
      packageShapeValidatorGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      valid: blockers.length === 0,
      blockers,
      warnings,
      description: 'Validates only the package shape, blocking raw payloads and secrets administrative execution.'
    };
  }
}

import { FiscalSandboxReplayBridgeSource, FiscalSandboxReplayBridgeOperation } from './FiscalSandboxReplayBridgeTypes';

export class FiscalSandboxReplayBridgeValidator {
  
  public static validate(input: any): { valid: boolean; blockers: string[]; safeInput: any } {
    const blockers: string[] = [];
    
    if (!input.companyId) {
      blockers.push('companyId is required');
    }
    if (!input.source) {
      blockers.push('source is required');
    }
    if (!input.operation) {
      blockers.push('operation is required');
    }

    const safeShape = input.safeShape || {};
    
    // Explicit safety checks against sensitive data
    this.checkForSensitiveData(safeShape, blockers);
    if (input.metadata && typeof input.metadata === 'object') {
      this.checkForSensitiveData(input.metadata, blockers);
    }
    
    // Check if critical routes attempt to simulate real emission
    if (input.route && input.route.toLowerCase().includes('critical') && input.operation.toLowerCase() === 'emit') {
       blockers.push('Route attempting to simulate real emission is BLOCKED');
    }

    const safeInput = {
      ...input,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      marker: 'fiscal-v2-sandbox-persistence',
    };

    if (blockers.length > 0) {
      safeInput.safeShape = {}; // Sanitize completely if blocked
    }

    return {
      valid: blockers.length === 0,
      blockers,
      safeInput
    };
  }
  
  private static checkForSensitiveData(obj: any, blockers: string[]) {
    const strObj = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
    if (!strObj) return;
    
    const lowerObj = strObj.toLowerCase();
    if (lowerObj.includes('password')) blockers.push('password found in shape');
    if (lowerObj.includes('token')) blockers.push('token found in shape');
    if (lowerObj.includes('privatekey')) blockers.push('privateKey found in shape');
    if (lowerObj.includes('certificate')) blockers.push('certificate found in shape');
    if (lowerObj.includes('raw_xml') || lowerObj.includes('xml_content')) blockers.push('Raw XML found in shape');
    if (lowerObj.includes('payload') && typeof obj === 'object' && obj.payload !== undefined) blockers.push('Raw payload found in shape');
  }
}

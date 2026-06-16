export class FiscalHomologationMockPayloadValidator {
  public static validate(safeShape: any): { valid: boolean; blockers: string[] } {
    const blockers: string[] = [];

    if (!safeShape) {
      return { valid: false, blockers: ['Payload is missing'] };
    }

    const str = JSON.stringify(safeShape).toLowerCase();

    if (str.includes('<nfe') || str.includes('<?xml')) {
      blockers.push('Raw XML payload is strictly forbidden.');
    }

    if (str.includes('.pfx') || str.includes('pfx') || str.includes('certificate') || str.includes('privatekey')) {
      blockers.push('Certificates or private keys are strictly forbidden.');
    }

    if (str.includes('password') || str.includes('token') || str.includes('secret')) {
      blockers.push('Passwords or tokens are strictly forbidden.');
    }

    if (str.length > 5000) {
      blockers.push('String limits exceeded. This is a mock harness, not for full payload debugging.');
    }

    return {
      valid: blockers.length === 0,
      blockers
    };
  }
}

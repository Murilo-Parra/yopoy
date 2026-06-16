import { FiscalSandboxReviewDecision } from './FiscalSandboxReviewTypes';

export class FiscalSandboxReviewValidator {
  
  public static validateReviewAction(input: any): { valid: boolean; blockers: string[] } {
    const blockers: string[] = [];
    
    if (!input.companyId) {
      blockers.push('companyId is required');
    }
    if (!input.recordId) {
      blockers.push('recordId is required');
    }
    if (!input.marker || input.marker !== 'fiscal-v2-sandbox-persistence') {
      blockers.push('marker must be exactly fiscal-v2-sandbox-persistence');
    }

    if (input.decision && !Object.values(FiscalSandboxReviewDecision).includes(input.decision as any)) {
      blockers.push('Invalid review decision');
    }

    // Prohibit sensitive data operations here
    if (input.payload || input.rawXml) {
       blockers.push('Cannot mix payload or raw XML in review process');
    }

    return {
      valid: blockers.length === 0,
      blockers
    };
  }

  public static validateCleanupAction(input: any): { valid: boolean; blockers: string[] } {
    const blockers: string[] = [];
    
    if (!input.companyId) {
      blockers.push('companyId is required for cleanup');
    }
    if (!input.marker || input.marker !== 'fiscal-v2-sandbox-persistence') {
      blockers.push('marker must be exactly fiscal-v2-sandbox-persistence for cleanup block');
    }

    // Ensure we are not attempting a global wipe or cross-company wipe
    if (input.targetTable && input.targetTable !== 'fiscal_v2_sandbox_snapshots') {
       blockers.push('Cannot cleanup target table other than fiscal_v2_sandbox_snapshots');
    }

    return {
      valid: blockers.length === 0,
      blockers
    };
  }
}

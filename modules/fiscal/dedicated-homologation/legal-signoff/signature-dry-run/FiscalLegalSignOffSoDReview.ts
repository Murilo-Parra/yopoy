import { FiscalLegalSignatureDryRunInput } from './FiscalLegalSignatureDryRunTypes';

export class FiscalLegalSignOffSoDReview {
  public static simulateReview(input: FiscalLegalSignatureDryRunInput) {
    const blockers: string[] = [];
    
    if (input.requestedBy && (input.requestedBy === input.signerA || input.requestedBy === input.signerB)) {
      blockers.push('requestedBy cannot be the same as signerA or signerB (SoD violation)');
    }
    
    if (input.signerA && input.signerA === input.signerB) {
      blockers.push('signerA cannot be the same as signerB (SoD violation)');
    }
    
    return {
      sodReviewGenerated: true,
      description: 'Simulated Segregation of Duties. Real signature not granted.',
      blockers
    };
  }
}

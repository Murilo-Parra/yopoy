import { FiscalRealDualApprovalInput } from './FiscalRealDualApprovalTypes';

export class FiscalRealSegregationOfDutiesReview {
  public static review(input: FiscalRealDualApprovalInput) {
    const blockers: string[] = [];
    let segregationOfDutiesPassed = true;

    if (input.requestedBy && input.approverA && input.requestedBy === input.approverA) {
      blockers.push('Requester não pode ser Approver A.');
      segregationOfDutiesPassed = false;
    }
    
    if (input.requestedBy && input.approverB && input.requestedBy === input.approverB) {
      blockers.push('Requester não pode ser Approver B.');
      segregationOfDutiesPassed = false;
    }
    
    if (input.approverA && input.approverB && input.approverA === input.approverB) {
      blockers.push('Approver A não pode ser Approver B.');
      segregationOfDutiesPassed = false;
    }

    if (input.approverARole && input.approverBRole && input.approverARole === input.approverBRole && segregationOfDutiesPassed) {
       blockers.push('Approver A e Approver B devem ter papéis distintos para maior segurança em simulação estrita.');
       segregationOfDutiesPassed = false;
    }

    return {
      sodReviewed: true,
      sameUserApprovalBlocked: true,
      segregationOfDutiesPassed,
      dualApprovalCompleted: false,
      realApprovalGranted: false,
      realAuthorizationGranted: false,
      warnings: blockers.length > 0 ? blockers : ['SoD Check OK in simulation.']
    };
  }
}

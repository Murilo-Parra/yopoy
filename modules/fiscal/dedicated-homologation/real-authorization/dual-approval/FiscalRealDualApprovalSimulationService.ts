import { FiscalRealDualApprovalInput } from './FiscalRealDualApprovalTypes';
import { FiscalRealDualApprovalValidator } from './FiscalRealDualApprovalValidator';
import { FiscalRealSegregationOfDutiesReview } from './FiscalRealSegregationOfDutiesReview';

export class FiscalRealDualApprovalSimulationService {
  public static simulate(input: FiscalRealDualApprovalInput) {
    FiscalRealDualApprovalValidator.validate(input);
    FiscalRealSegregationOfDutiesReview.review(input);

    return {
      simulationExecuted: true,
      dualApprovalSimulated: true,
      dualApprovalCompleted: false,
      realApprovalGranted: false,
      realAuthorizationGranted: false,
      approvalRecordPersisted: false,
      approverANotifiedExternally: false,
      approverBNotifiedExternally: false,
      message: 'Novo módulo explícito é necessário para avaliação real.'
    };
  }
}

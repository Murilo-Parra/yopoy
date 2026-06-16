import { FiscalRealApprovalDmlPolicy } from './FiscalRealApprovalDmlPolicy';
import { FiscalRealApprovalSeedPlan } from './FiscalRealApprovalSeedPlan';
import { FiscalRealApprovalControlledInsertSimulator } from './FiscalRealApprovalControlledInsertSimulator';
import { FiscalRealApprovalControlledUpdateSimulator } from './FiscalRealApprovalControlledUpdateSimulator';
import { FiscalRealApprovalControlledDeleteSimulator } from './FiscalRealApprovalControlledDeleteSimulator';
import { FiscalRealApprovalCommitSimulationPlan } from './FiscalRealApprovalCommitSimulationPlan';
import { FiscalRealApprovalMutationDiffService } from './FiscalRealApprovalMutationDiffService';

export class FiscalRealApprovalDmlEvaluationService {
  public static evaluate(input: any) {
    const policyEnforced = FiscalRealApprovalDmlPolicy.enforce(input);
    if (policyEnforced && !policyEnforced.success) {
      return policyEnforced;
    }
    
    const base = FiscalRealApprovalDmlPolicy.getBaseResult();
    
    return {
      ...base,
      evaluationExecuted: true,
      seedPlanGenerated: FiscalRealApprovalSeedPlan.generatePlan().seedPlanGenerated,
      insertSimulationGenerated: FiscalRealApprovalControlledInsertSimulator.simulateInsert().insertSimulationGenerated,
      updateSimulationGenerated: FiscalRealApprovalControlledUpdateSimulator.simulateUpdate().updateSimulationGenerated,
      deleteSimulationGenerated: FiscalRealApprovalControlledDeleteSimulator.simulateDelete().deleteSimulationGenerated,
      commitPlanGenerated: FiscalRealApprovalCommitSimulationPlan.generatePlan().commitPlanGenerated,
      mutationDiffGenerated: FiscalRealApprovalMutationDiffService.generateDiff().mutationDiffGenerated
    };
  }
}

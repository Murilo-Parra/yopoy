import { FiscalRealApprovalSchemaPolicy } from './FiscalRealApprovalSchemaPolicy';
import { FiscalRealApprovalSchemaMigrationPlan } from './FiscalRealApprovalSchemaMigrationPlan';
import { FiscalRealApprovalControlledDdlSimulator } from './FiscalRealApprovalControlledDdlSimulator';
import { FiscalRealApprovalSchemaDiffService } from './FiscalRealApprovalSchemaDiffService';
import { FiscalRealApprovalSchemaRlsPlan } from './FiscalRealApprovalSchemaRlsPlan';
import { FiscalRealApprovalSchemaIndexPlan } from './FiscalRealApprovalSchemaIndexPlan';

export class FiscalRealApprovalSchemaEvaluationService {
  public static evaluate(input: any) {
    const policyEnforced = FiscalRealApprovalSchemaPolicy.enforce(input);
    if (policyEnforced && !policyEnforced.success) {
      return policyEnforced;
    }
    
    const base = FiscalRealApprovalSchemaPolicy.getBaseResult();
    
    return {
      ...base,
      evaluationExecuted: true,
      migrationPlanGenerated: FiscalRealApprovalSchemaMigrationPlan.generatePlan().migrationPlanGenerated,
      controlledDdlSimulationGenerated: FiscalRealApprovalControlledDdlSimulator.simulateDdl().controlledDdlSimulationGenerated,
      schemaDiffGenerated: FiscalRealApprovalSchemaDiffService.generateDiff().schemaDiffGenerated,
      rlsPlanGenerated: FiscalRealApprovalSchemaRlsPlan.generatePlan().rlsPlanGenerated,
      indexPlanGenerated: FiscalRealApprovalSchemaIndexPlan.generatePlan().indexPlanGenerated
    };
  }
}

import { FiscalLegalAuditSchemaDryRunInput, FiscalLegalAuditSchemaDryRunResult, FiscalLegalAuditSchemaDryRunStatus } from './FiscalLegalAuditSchemaDryRunTypes';
import { FiscalLegalAuditSchemaEvaluationService } from './FiscalLegalAuditSchemaEvaluationService';

export class FiscalLegalAuditSchemaDecisionService {
  public static simulateDecision(input: FiscalLegalAuditSchemaDryRunInput): FiscalLegalAuditSchemaDryRunResult {
    const evaluation = FiscalLegalAuditSchemaEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalAuditSchemaDryRunStatus.RETENTION_RLS_DDL_SIMULATION_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}

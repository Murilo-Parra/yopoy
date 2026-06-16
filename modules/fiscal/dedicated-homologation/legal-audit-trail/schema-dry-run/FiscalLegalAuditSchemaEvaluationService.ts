import { FiscalLegalAuditSchemaDryRunInput, FiscalLegalAuditSchemaDryRunResult } from './FiscalLegalAuditSchemaDryRunTypes';
import { FiscalLegalAuditSchemaPolicy } from './FiscalLegalAuditSchemaPolicy';
import { FiscalLegalAuditSchemaBlockerRegister } from './FiscalLegalAuditSchemaBlockerRegister';
import { FiscalLegalAuditSchemaRiskRegister } from './FiscalLegalAuditSchemaRiskRegister';
import { FiscalLegalAuditLedgerSchemaPlan } from './FiscalLegalAuditLedgerSchemaPlan';
import { FiscalLegalAuditControlledDdlSimulator } from './FiscalLegalAuditControlledDdlSimulator';
import { FiscalLegalAuditRlsSimulationPlan } from './FiscalLegalAuditRlsSimulationPlan';
import { FiscalLegalAuditRetentionDdlPlan } from './FiscalLegalAuditRetentionDdlPlan';
import { FiscalLegalAuditIndexPlan } from './FiscalLegalAuditIndexPlan';
import { FiscalLegalAuditSchemaDiffService } from './FiscalLegalAuditSchemaDiffService';

export class FiscalLegalAuditSchemaEvaluationService {
  public static evaluate(input: FiscalLegalAuditSchemaDryRunInput): FiscalLegalAuditSchemaDryRunResult {
    const policyResult = FiscalLegalAuditSchemaPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalAuditSchemaDryRunResult;
    }

    // Call sims to verify correctness (even if we return the generic result)
    FiscalLegalAuditLedgerSchemaPlan.generatePlan();
    FiscalLegalAuditControlledDdlSimulator.simulateDdl();
    FiscalLegalAuditRlsSimulationPlan.generatePlan();
    FiscalLegalAuditRetentionDdlPlan.generatePlan();
    FiscalLegalAuditIndexPlan.generatePlan();
    FiscalLegalAuditSchemaDiffService.generateDiff();

    const baseResult = FiscalLegalAuditSchemaPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalAuditSchemaBlockerRegister.getBlockers(),
      warnings: FiscalLegalAuditSchemaRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}

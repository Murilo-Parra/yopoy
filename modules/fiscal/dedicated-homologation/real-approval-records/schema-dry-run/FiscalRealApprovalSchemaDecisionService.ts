import { FiscalRealApprovalSchemaEvaluationService } from './FiscalRealApprovalSchemaEvaluationService';

export class FiscalRealApprovalSchemaDecisionService {
  public static simulateDecision(input: any) {
    const evaluation = FiscalRealApprovalSchemaEvaluationService.evaluate(input);
    if (!evaluation.success) return evaluation;

    return {
      ...evaluation,
      decisionSimulated: true,
      go: false,
      noGo: true,
      schemaApplied: false,
      migrationExecuted: false,
      ddlExecuted: false,
      dmlExecuted: false,
      createTableExecuted: false,
      alterTableExecuted: false,
      dropTableExecuted: false,
      createIndexExecuted: false,
      rlsApplied: false,
      commitExecuted: false,
      realDatabaseConnected: false,
      approvalRecordPersisted: false,
      realAuthorizationGranted: false,
      approvedForSchemaDryRunClosure: true,
      approvedForControlledDdlSimulation: true,
      approvedForRealSchemaMigration: false,
      approvedForRealDdlExecution: false,
      approvedForRealDmlExecution: false,
      approvedForRealApprovalRecordPersistence: false,
      approvedForRealAuthorizationGrant: false,
      approvedForProductionV2: false
    };
  }
}

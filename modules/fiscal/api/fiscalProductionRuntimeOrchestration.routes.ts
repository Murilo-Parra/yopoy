import { Router } from 'express';
import { FiscalProductionRuntimeOrchestrationController } from './FiscalProductionRuntimeOrchestrationController';

const router = Router();

router.get('/policy', FiscalProductionRuntimeOrchestrationController.getPolicy);
router.get('/runtime-orchestration-governance-blueprint', FiscalProductionRuntimeOrchestrationController.getRuntimeOrchestrationGovernanceBlueprint);
router.get('/hard-runtime-no-execution-contract', FiscalProductionRuntimeOrchestrationController.getHardRuntimeNoExecutionContract);
router.get('/runtime-scope-inventory', FiscalProductionRuntimeOrchestrationController.getRuntimeScopeInventory);
router.get('/queue-worker-no-start-plan', FiscalProductionRuntimeOrchestrationController.getQueueWorkerNoStartPlan);
router.get('/job-dispatch-no-op-matrix', FiscalProductionRuntimeOrchestrationController.getJobDispatchNoOpMatrix);
router.get('/scheduler-cron-no-create-plan', FiscalProductionRuntimeOrchestrationController.getSchedulerCronNoCreatePlan);
router.get('/command-runner-no-execute-plan', FiscalProductionRuntimeOrchestrationController.getCommandRunnerNoExecutePlan);
router.get('/lifecycle-runner-no-op-matrix', FiscalProductionRuntimeOrchestrationController.getLifecycleRunnerNoOpMatrix);
router.get('/runtime-transaction-no-open-plan', FiscalProductionRuntimeOrchestrationController.getRuntimeTransactionNoOpenPlan);
router.get('/runtime-external-integration-no-call-plan', FiscalProductionRuntimeOrchestrationController.getRuntimeExternalIntegrationNoCallPlan);
router.get('/runtime-data-boundary-no-read-plan', FiscalProductionRuntimeOrchestrationController.getRuntimeDataBoundaryNoReadPlan);
router.get('/runtime-execution-block-matrix', FiscalProductionRuntimeOrchestrationController.getRuntimeExecutionBlockMatrix);
router.get('/dependency-matrix', FiscalProductionRuntimeOrchestrationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRuntimeOrchestrationController.getBlockers);
router.get('/risks', FiscalProductionRuntimeOrchestrationController.getRisks);
router.post('/validate', FiscalProductionRuntimeOrchestrationController.validate);
router.post('/evaluate', FiscalProductionRuntimeOrchestrationController.evaluate);
router.post('/simulate-decision', FiscalProductionRuntimeOrchestrationController.simulateDecision);
router.get('/report', FiscalProductionRuntimeOrchestrationController.getReport);
router.get('/audit', FiscalProductionRuntimeOrchestrationController.getAudit);
router.get('/health', FiscalProductionRuntimeOrchestrationController.getHealth);

export const fiscalProductionRuntimeOrchestrationRoutes = router;

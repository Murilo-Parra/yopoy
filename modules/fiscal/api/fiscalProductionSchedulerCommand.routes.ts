import { Router } from 'express';
import { FiscalProductionSchedulerCommandController } from './FiscalProductionSchedulerCommandController';

const router = Router();

router.get('/policy', FiscalProductionSchedulerCommandController.getPolicy);
router.get('/scheduler-no-create-blueprint', FiscalProductionSchedulerCommandController.getSchedulerNoCreateBlueprint);
router.get('/cron-no-create-plan', FiscalProductionSchedulerCommandController.getCronNoCreatePlan);
router.get('/command-runner-no-execute-matrix', FiscalProductionSchedulerCommandController.getCommandRunnerNoExecuteMatrix);
router.get('/shell-command-no-execute-plan', FiscalProductionSchedulerCommandController.getShellCommandNoExecutePlan);
router.get('/process-manager-no-create-matrix', FiscalProductionSchedulerCommandController.getProcessManagerNoCreateMatrix);
router.get('/lifecycle-runner-no-create-plan', FiscalProductionSchedulerCommandController.getLifecycleRunnerNoCreatePlan);
router.get('/task-runner-no-execute-matrix', FiscalProductionSchedulerCommandController.getTaskRunnerNoExecuteMatrix);
router.get('/recurring-task-no-register-plan', FiscalProductionSchedulerCommandController.getRecurringTaskNoRegisterPlan);
router.get('/timeout-guard-no-activation-matrix', FiscalProductionSchedulerCommandController.getTimeoutGuardNoActivationMatrix);
router.get('/lifecycle-hook-no-call-plan', FiscalProductionSchedulerCommandController.getLifecycleHookNoCallPlan);
router.get('/scheduler-command-no-real-execution-evidence', FiscalProductionSchedulerCommandController.getSchedulerCommandNoRealExecutionEvidence);
router.get('/scheduler-command-no-real-process-evidence', FiscalProductionSchedulerCommandController.getSchedulerCommandNoRealProcessEvidence);
router.get('/dependency-matrix', FiscalProductionSchedulerCommandController.getDependencyMatrix);
router.get('/blockers', FiscalProductionSchedulerCommandController.getBlockers);
router.get('/risks', FiscalProductionSchedulerCommandController.getRisks);
router.post('/validate', FiscalProductionSchedulerCommandController.validate);
router.post('/evaluate', FiscalProductionSchedulerCommandController.evaluate);
router.post('/simulate-decision', FiscalProductionSchedulerCommandController.simulateDecision);
router.get('/report', FiscalProductionSchedulerCommandController.getReport);
router.get('/audit', FiscalProductionSchedulerCommandController.getAudit);
router.get('/health', FiscalProductionSchedulerCommandController.getHealth);

export const fiscalProductionSchedulerCommandRoutes = router;

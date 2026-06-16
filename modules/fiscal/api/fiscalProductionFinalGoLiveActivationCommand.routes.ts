import { Router } from 'express';
import { FiscalProductionFinalGoLiveActivationCommandController } from './FiscalProductionFinalGoLiveActivationCommandController';

const router = Router();

router.get('/policy', FiscalProductionFinalGoLiveActivationCommandController.getPolicy);
router.get('/activation-command-rehearsal-blueprint', FiscalProductionFinalGoLiveActivationCommandController.getActivationCommandRehearsalBlueprint);
router.get('/activation-command-non-executable-envelope', FiscalProductionFinalGoLiveActivationCommandController.getActivationCommandNonExecutableEnvelope);
router.get('/execution-denial-no-op-matrix', FiscalProductionFinalGoLiveActivationCommandController.getExecutionDenialNoOpMatrix);
router.get('/gate-unlock-denial-matrix', FiscalProductionFinalGoLiveActivationCommandController.getGateUnlockDenialMatrix);
router.get('/authorization-token-issue-denial-plan', FiscalProductionFinalGoLiveActivationCommandController.getAuthorizationTokenIssueDenialPlan);
router.get('/route-to-v2-command-denial-plan', FiscalProductionFinalGoLiveActivationCommandController.getRouteToV2CommandDenialPlan);
router.get('/traffic-switch-command-denial-matrix', FiscalProductionFinalGoLiveActivationCommandController.getTrafficSwitchCommandDenialMatrix);
router.get('/runtime-start-command-denial-plan', FiscalProductionFinalGoLiveActivationCommandController.getRuntimeStartCommandDenialPlan);
router.get('/database-command-denial-plan', FiscalProductionFinalGoLiveActivationCommandController.getDatabaseCommandDenialPlan);
router.get('/external-integration-command-denial-plan', FiscalProductionFinalGoLiveActivationCommandController.getExternalIntegrationCommandDenialPlan);
router.get('/sensitive-data-command-denial-plan', FiscalProductionFinalGoLiveActivationCommandController.getSensitiveDataCommandDenialPlan);
router.get('/no-real-activation-command-evidence', FiscalProductionFinalGoLiveActivationCommandController.getNoRealActivationCommandEvidence);
router.get('/no-real-execution-evidence', FiscalProductionFinalGoLiveActivationCommandController.getNoRealExecutionEvidence);
router.get('/no-real-gate-unlock-from-command-evidence', FiscalProductionFinalGoLiveActivationCommandController.getNoRealGateUnlockFromCommandEvidence);
router.get('/no-real-token-issue-from-command-evidence', FiscalProductionFinalGoLiveActivationCommandController.getNoRealTokenIssueFromCommandEvidence);
router.get('/dependency-matrix', FiscalProductionFinalGoLiveActivationCommandController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalGoLiveActivationCommandController.getBlockers);
router.get('/risks', FiscalProductionFinalGoLiveActivationCommandController.getRisks);
router.post('/validate', FiscalProductionFinalGoLiveActivationCommandController.validate);
router.post('/evaluate', FiscalProductionFinalGoLiveActivationCommandController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalGoLiveActivationCommandController.simulateDecision);
router.get('/report', FiscalProductionFinalGoLiveActivationCommandController.getReport);
router.get('/audit', FiscalProductionFinalGoLiveActivationCommandController.getAudit);
router.get('/health', FiscalProductionFinalGoLiveActivationCommandController.getHealth);

export const fiscalProductionFinalGoLiveActivationCommandRoutes = router;

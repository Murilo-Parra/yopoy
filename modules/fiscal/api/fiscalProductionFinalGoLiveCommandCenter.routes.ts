import { Router } from 'express';
import { FiscalProductionFinalGoLiveCommandCenterController } from './FiscalProductionFinalGoLiveCommandCenterController';

const router = Router();

router.get('/policy', FiscalProductionFinalGoLiveCommandCenterController.getPolicy);
router.get('/command-center-blueprint', FiscalProductionFinalGoLiveCommandCenterController.getCommandCenterBlueprint);
router.get('/hard-activation-non-authority-contract', FiscalProductionFinalGoLiveCommandCenterController.getHardActivationNonAuthorityContract);
router.get('/scope-inventory', FiscalProductionFinalGoLiveCommandCenterController.getScopeInventory);
router.get('/domain-readiness-aggregation-matrix', FiscalProductionFinalGoLiveCommandCenterController.getDomainReadinessAggregationMatrix);
router.get('/no-authority-activation-boundary', FiscalProductionFinalGoLiveCommandCenterController.getNoAuthorityActivationBoundary);
router.get('/final-go-live-decision-no-op-matrix', FiscalProductionFinalGoLiveCommandCenterController.getFinalGoLiveDecisionNoOpMatrix);
router.get('/command-center-no-execution-plan', FiscalProductionFinalGoLiveCommandCenterController.getCommandCenterNoExecutionPlan);
router.get('/command-center-no-routing-plan', FiscalProductionFinalGoLiveCommandCenterController.getCommandCenterNoRoutingPlan);
router.get('/command-center-no-runtime-plan', FiscalProductionFinalGoLiveCommandCenterController.getCommandCenterNoRuntimePlan);
router.get('/command-center-no-database-plan', FiscalProductionFinalGoLiveCommandCenterController.getCommandCenterNoDatabasePlan);
router.get('/command-center-no-external-integration-plan', FiscalProductionFinalGoLiveCommandCenterController.getCommandCenterNoExternalIntegrationPlan);
router.get('/command-center-no-sensitive-data-plan', FiscalProductionFinalGoLiveCommandCenterController.getCommandCenterNoSensitiveDataPlan);
router.get('/no-real-authority-evidence', FiscalProductionFinalGoLiveCommandCenterController.getNoRealAuthorityEvidence);
router.get('/no-activation-evidence', FiscalProductionFinalGoLiveCommandCenterController.getNoActivationEvidence);
router.get('/dependency-matrix', FiscalProductionFinalGoLiveCommandCenterController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalGoLiveCommandCenterController.getBlockers);
router.get('/risks', FiscalProductionFinalGoLiveCommandCenterController.getRisks);
router.post('/validate', FiscalProductionFinalGoLiveCommandCenterController.validate);
router.post('/evaluate', FiscalProductionFinalGoLiveCommandCenterController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalGoLiveCommandCenterController.simulateDecision);
router.get('/report', FiscalProductionFinalGoLiveCommandCenterController.getReport);
router.get('/audit', FiscalProductionFinalGoLiveCommandCenterController.getAudit);
router.get('/health', FiscalProductionFinalGoLiveCommandCenterController.getHealth);

export const fiscalProductionFinalGoLiveCommandCenterRoutes = router;

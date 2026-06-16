import { Router } from 'express';
import { FiscalProductionFinalGoLiveReadinessController } from './FiscalProductionFinalGoLiveReadinessController';

const router = Router();

router.get('/policy', FiscalProductionFinalGoLiveReadinessController.getPolicy);
router.get('/final-readiness-aggregation-blueprint', FiscalProductionFinalGoLiveReadinessController.getFinalReadinessAggregationBlueprint);
router.get('/executive-quorum-simulation-matrix', FiscalProductionFinalGoLiveReadinessController.getExecutiveQuorumSimulationMatrix);
router.get('/stakeholder-eligibility-no-authority-matrix', FiscalProductionFinalGoLiveReadinessController.getStakeholderEligibilityNoAuthorityMatrix);
router.get('/domain-evidence-review-no-read-matrix', FiscalProductionFinalGoLiveReadinessController.getDomainEvidenceReviewNoReadMatrix);
router.get('/final-go-live-vote-simulation', FiscalProductionFinalGoLiveReadinessController.getFinalGoLiveVoteSimulation);
router.get('/non-binding-decision-matrix', FiscalProductionFinalGoLiveReadinessController.getNonBindingDecisionMatrix);
router.get('/no-real-executive-approval-evidence', FiscalProductionFinalGoLiveReadinessController.getNoRealExecutiveApprovalEvidence);
router.get('/no-real-activation-authority-evidence', FiscalProductionFinalGoLiveReadinessController.getNoRealActivationAuthorityEvidence);
router.get('/no-real-gate-unlock-evidence', FiscalProductionFinalGoLiveReadinessController.getNoRealGateUnlockEvidence);
router.get('/no-real-token-issue-evidence', FiscalProductionFinalGoLiveReadinessController.getNoRealTokenIssueEvidence);
router.get('/no-execution-plan', FiscalProductionFinalGoLiveReadinessController.getNoExecutionPlan);
router.get('/no-routing-plan', FiscalProductionFinalGoLiveReadinessController.getNoRoutingPlan);
router.get('/no-runtime-plan', FiscalProductionFinalGoLiveReadinessController.getNoRuntimePlan);
router.get('/no-database-plan', FiscalProductionFinalGoLiveReadinessController.getNoDatabasePlan);
router.get('/no-external-integration-plan', FiscalProductionFinalGoLiveReadinessController.getNoExternalIntegrationPlan);
router.get('/dependency-matrix', FiscalProductionFinalGoLiveReadinessController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalGoLiveReadinessController.getBlockers);
router.get('/risks', FiscalProductionFinalGoLiveReadinessController.getRisks);
router.post('/validate', FiscalProductionFinalGoLiveReadinessController.validate);
router.post('/evaluate', FiscalProductionFinalGoLiveReadinessController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalGoLiveReadinessController.simulateDecision);
router.get('/report', FiscalProductionFinalGoLiveReadinessController.getReport);
router.get('/audit', FiscalProductionFinalGoLiveReadinessController.getAudit);
router.get('/health', FiscalProductionFinalGoLiveReadinessController.getHealth);

export const fiscalProductionFinalGoLiveReadinessRoutes = router;

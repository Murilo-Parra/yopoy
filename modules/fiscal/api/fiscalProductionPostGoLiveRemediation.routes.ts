import { Router } from 'express';
import { FiscalProductionPostGoLiveRemediationController } from './FiscalProductionPostGoLiveRemediationController';

const router = Router();

router.get('/policy', FiscalProductionPostGoLiveRemediationController.getPolicy);
router.get('/war-room-drill-no-activation-blueprint', FiscalProductionPostGoLiveRemediationController.getWarRoomDrillNoActivationBlueprint);
router.get('/remediation-readiness-no-execute-plan', FiscalProductionPostGoLiveRemediationController.getRemediationReadinessNoExecutePlan);
router.get('/mitigation-playbook-no-op-matrix', FiscalProductionPostGoLiveRemediationController.getMitigationPlaybookNoOpMatrix);
router.get('/support-handover-no-conclusion-plan', FiscalProductionPostGoLiveRemediationController.getSupportHandoverNoConclusionPlan);
router.get('/support-role-no-grant-matrix', FiscalProductionPostGoLiveRemediationController.getSupportRoleNoGrantMatrix);
router.get('/assisted-session-no-open-plan', FiscalProductionPostGoLiveRemediationController.getAssistedSessionNoOpenPlan);
router.get('/stabilization-decision-no-authorization-matrix', FiscalProductionPostGoLiveRemediationController.getStabilizationDecisionNoAuthorizationMatrix);
router.get('/war-room-communication-no-send-plan', FiscalProductionPostGoLiveRemediationController.getWarRoomCommunicationNoSendPlan);
router.get('/post-go-live-remediation-no-persistence-plan', FiscalProductionPostGoLiveRemediationController.getPostGoLiveRemediationNoPersistencePlan);
router.get('/no-real-war-room-evidence', FiscalProductionPostGoLiveRemediationController.getNoRealWarRoomEvidence);
router.get('/no-real-remediation-evidence', FiscalProductionPostGoLiveRemediationController.getNoRealRemediationEvidence);
router.get('/dependency-matrix', FiscalProductionPostGoLiveRemediationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionPostGoLiveRemediationController.getBlockers);
router.get('/risks', FiscalProductionPostGoLiveRemediationController.getRisks);
router.post('/validate', FiscalProductionPostGoLiveRemediationController.validate);
router.post('/evaluate', FiscalProductionPostGoLiveRemediationController.evaluate);
router.post('/simulate-decision', FiscalProductionPostGoLiveRemediationController.simulateDecision);
router.get('/report', FiscalProductionPostGoLiveRemediationController.getReport);
router.get('/audit', FiscalProductionPostGoLiveRemediationController.getAudit);
router.get('/health', FiscalProductionPostGoLiveRemediationController.getHealth);

export const fiscalProductionPostGoLiveRemediationRoutes = router;

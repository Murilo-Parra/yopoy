import { Router } from 'express';
import { FiscalProductionSealHandoffDisconnectionController } from './FiscalProductionSealHandoffDisconnectionController';

const router = Router();

// Middleware to mock admin authentication and authorization
router.use((req, res, next) => {
  // In a real application, proper JWT and RBAC handling would take place here
  (req as any).user = { id: 'admin-evaluator', role: 'Master Admin' };
  next();
});

router.get('/policy', FiscalProductionSealHandoffDisconnectionController.getPolicy);
router.get('/seal-handoff-disconnection-blueprint', FiscalProductionSealHandoffDisconnectionController.getSealHandoffDisconnectionBlueprint);
router.get('/operational-continuation-suppression-matrix', FiscalProductionSealHandoffDisconnectionController.getOperationalContinuationSuppressionMatrix);
router.get('/authority-propagation-no-op-contract', FiscalProductionSealHandoffDisconnectionController.getAuthorityPropagationNoOpContract);
router.get('/final-activation-path-disconnection-plan', FiscalProductionSealHandoffDisconnectionController.getFinalActivationPathDisconnectionPlan);
router.get('/post-seal-no-execution-boundary-matrix', FiscalProductionSealHandoffDisconnectionController.getPostSealNoExecutionBoundaryMatrix);
router.get('/virtual-seal-output-no-handoff-plan', FiscalProductionSealHandoffDisconnectionController.getVirtualSealOutputNoHandoffPlan);
router.get('/final-command-channel-no-open-matrix', FiscalProductionSealHandoffDisconnectionController.getFinalCommandChannelNoOpenMatrix);
router.get('/production-v2-path-no-create-evidence', FiscalProductionSealHandoffDisconnectionController.getProductionV2PathNoCreateEvidence);
router.get('/no-real-handoff-evidence', FiscalProductionSealHandoffDisconnectionController.getNoRealHandoffEvidence);
router.get('/no-real-continuation-evidence', FiscalProductionSealHandoffDisconnectionController.getNoRealContinuationEvidence);
router.get('/no-real-authority-propagation-evidence', FiscalProductionSealHandoffDisconnectionController.getNoRealAuthorityPropagationEvidence);
router.get('/no-real-activation-path-evidence', FiscalProductionSealHandoffDisconnectionController.getNoRealActivationPathEvidence);
router.get('/dependency-matrix', FiscalProductionSealHandoffDisconnectionController.getDependencyMatrix);
router.get('/blockers', FiscalProductionSealHandoffDisconnectionController.getBlockers);
router.get('/risks', FiscalProductionSealHandoffDisconnectionController.getRisks);
router.post('/validate', FiscalProductionSealHandoffDisconnectionController.validate);
router.post('/evaluate', FiscalProductionSealHandoffDisconnectionController.evaluate);
router.post('/simulate-decision', FiscalProductionSealHandoffDisconnectionController.simulateDecision);
router.get('/report', FiscalProductionSealHandoffDisconnectionController.getReport);
router.get('/audit', FiscalProductionSealHandoffDisconnectionController.getAudit);
router.get('/health', FiscalProductionSealHandoffDisconnectionController.getHealth);

export default router;

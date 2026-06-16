import { Router } from 'express';
import { FiscalProductionFinalHandshakeController } from './FiscalProductionFinalHandshakeController';

const router = Router();

router.get('/policy', FiscalProductionFinalHandshakeController.getPolicy);
router.get('/final-handshake-blueprint', FiscalProductionFinalHandshakeController.getFinalHandshakeBlueprint);
router.get('/virtual-sign-off-simulation-matrix', FiscalProductionFinalHandshakeController.getVirtualSignOffSimulationMatrix);
router.get('/authority-non-conversion-contract', FiscalProductionFinalHandshakeController.getAuthorityNonConversionContract);
router.get('/evidence-to-authority-denial-matrix', FiscalProductionFinalHandshakeController.getEvidenceToAuthorityDenialMatrix);
router.get('/handshake-no-operational-handoff-plan', FiscalProductionFinalHandshakeController.getHandshakeNoOperationalHandoffPlan);
router.get('/executive-acknowledgement-no-binding-matrix', FiscalProductionFinalHandshakeController.getExecutiveAcknowledgementNoBindingMatrix);
router.get('/final-seal-review-no-create-plan', FiscalProductionFinalHandshakeController.getFinalSealReviewNoCreatePlan);
router.get('/final-command-no-execute-matrix', FiscalProductionFinalHandshakeController.getFinalCommandNoExecuteMatrix);
router.get('/no-real-handshake-evidence', FiscalProductionFinalHandshakeController.getNoRealHandshakeEvidence);
router.get('/no-real-sign-off-evidence', FiscalProductionFinalHandshakeController.getNoRealSignOffEvidence);
router.get('/no-real-authority-conversion-evidence', FiscalProductionFinalHandshakeController.getNoRealAuthorityConversionEvidence);
router.get('/no-real-final-command-evidence', FiscalProductionFinalHandshakeController.getNoRealFinalCommandEvidence);
router.get('/dependency-matrix', FiscalProductionFinalHandshakeController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalHandshakeController.getBlockers);
router.get('/risks', FiscalProductionFinalHandshakeController.getRisks);
router.post('/validate', FiscalProductionFinalHandshakeController.validate);
router.post('/evaluate', FiscalProductionFinalHandshakeController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalHandshakeController.simulateDecision);
router.get('/report', FiscalProductionFinalHandshakeController.getReport);
router.get('/audit', FiscalProductionFinalHandshakeController.getAudit);
router.get('/health', FiscalProductionFinalHandshakeController.getHealth);

export const fiscalProductionFinalHandshakeRoutes = router;

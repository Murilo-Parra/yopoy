import { Router } from 'express';
import { FiscalProductionOperationsSignatureCommitteeController } from './FiscalProductionOperationsSignatureCommitteeController';

const router = Router();

// Middleware de autenticação mockado para simular exigência
router.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer master-admin-token') {
        return res.status(401).json({ error: 'Unauthorized. Master Admin required.' });
    }
    next();
});

router.get('/policy', FiscalProductionOperationsSignatureCommitteeController.getPolicy);
router.get('/committee-charter', FiscalProductionOperationsSignatureCommitteeController.getCommitteeCharter);
router.get('/committee-quorum-matrix', FiscalProductionOperationsSignatureCommitteeController.getCommitteeQuorumMatrix);
router.get('/consent-evidence-review-matrix', FiscalProductionOperationsSignatureCommitteeController.getConsentEvidenceReviewMatrix);
router.get('/mock-attestation-review-matrix', FiscalProductionOperationsSignatureCommitteeController.getMockAttestationReviewMatrix);
router.get('/signature-sod-revalidation-matrix', FiscalProductionOperationsSignatureCommitteeController.getSignatureSoDRevalidationMatrix);
router.get('/committee-vote-simulation', FiscalProductionOperationsSignatureCommitteeController.getCommitteeVoteSimulation);
router.get('/consent-decision-no-op-matrix', FiscalProductionOperationsSignatureCommitteeController.getConsentDecisionNoOpMatrix);
router.get('/risk-acceptance-no-op-review', FiscalProductionOperationsSignatureCommitteeController.getRiskAcceptanceNoOpReview);
router.get('/waiver-no-op-review', FiscalProductionOperationsSignatureCommitteeController.getWaiverNoOpReview);
router.get('/committee-final-recommendation', FiscalProductionOperationsSignatureCommitteeController.getCommitteeFinalRecommendation);
router.get('/deliberation-no-persistence-evidence', FiscalProductionOperationsSignatureCommitteeController.getDeliberationNoPersistenceEvidence);
router.get('/no-real-authorization-evidence', FiscalProductionOperationsSignatureCommitteeController.getNoRealAuthorizationEvidence);
router.get('/dependency-matrix', FiscalProductionOperationsSignatureCommitteeController.getDependencyMatrix);
router.get('/blockers', FiscalProductionOperationsSignatureCommitteeController.getBlockers);
router.get('/risks', FiscalProductionOperationsSignatureCommitteeController.getRisks);
router.post('/validate', FiscalProductionOperationsSignatureCommitteeController.validate);
router.post('/evaluate', FiscalProductionOperationsSignatureCommitteeController.evaluate);
router.post('/simulate-decision', FiscalProductionOperationsSignatureCommitteeController.simulateDecision);
router.get('/report', FiscalProductionOperationsSignatureCommitteeController.getReport);
router.get('/audit', FiscalProductionOperationsSignatureCommitteeController.getAudit);
router.get('/health', FiscalProductionOperationsSignatureCommitteeController.getHealth);

export default router;

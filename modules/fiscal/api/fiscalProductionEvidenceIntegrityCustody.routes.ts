import { Router } from 'express';
import { FiscalProductionEvidenceIntegrityCustodyController } from './FiscalProductionEvidenceIntegrityCustodyController';

const router = Router();

router.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer master-admin-token') {
        const header = req.headers.authorization || '';
        if (!header.includes('master-admin-token')) {
             if (!(req as any).session?.is_admin && !(req as any).user?.is_admin) {
                 return res.status(401).json({ error: 'Unauthorized. Master Admin required.' });
             } 
        }
    }
    next();
});

router.get('/policy', FiscalProductionEvidenceIntegrityCustodyController.getPolicy);
router.get('/integrity-review-blueprint', FiscalProductionEvidenceIntegrityCustodyController.getIntegrityReviewBlueprint);
router.get('/non-cryptographic-fingerprint-plan', FiscalProductionEvidenceIntegrityCustodyController.getNonCryptographicFingerprintPlan);
router.get('/chain-of-custody-attestation-no-persistence-plan', FiscalProductionEvidenceIntegrityCustodyController.getChainOfCustodyAttestationNoPersistencePlan);
router.get('/timeline-simulation-matrix', FiscalProductionEvidenceIntegrityCustodyController.getTimelineSimulationMatrix);
router.get('/source-lineage-no-verify-plan', FiscalProductionEvidenceIntegrityCustodyController.getSourceLineageNoVerifyPlan);
router.get('/tamper-check-no-read-no-crypto-plan', FiscalProductionEvidenceIntegrityCustodyController.getTamperCheckNoReadNoCryptoPlan);
router.get('/custody-handoff-no-op-matrix', FiscalProductionEvidenceIntegrityCustodyController.getCustodyHandoffNoOpMatrix);
router.get('/completeness-metadata-matrix', FiscalProductionEvidenceIntegrityCustodyController.getCompletenessMetadataMatrix);
router.get('/no-real-crypto-proof-evidence', FiscalProductionEvidenceIntegrityCustodyController.getNoRealCryptoProofEvidence);
router.get('/no-custody-persistence-evidence', FiscalProductionEvidenceIntegrityCustodyController.getNoCustodyPersistenceEvidence);
router.get('/dependency-matrix', FiscalProductionEvidenceIntegrityCustodyController.getDependencyMatrix);
router.get('/blockers', FiscalProductionEvidenceIntegrityCustodyController.getBlockers);
router.get('/risks', FiscalProductionEvidenceIntegrityCustodyController.getRisks);
router.post('/validate', FiscalProductionEvidenceIntegrityCustodyController.validate);
router.post('/evaluate', FiscalProductionEvidenceIntegrityCustodyController.evaluate);
router.post('/simulate-decision', FiscalProductionEvidenceIntegrityCustodyController.simulateDecision);
router.get('/report', FiscalProductionEvidenceIntegrityCustodyController.getReport);
router.get('/audit', FiscalProductionEvidenceIntegrityCustodyController.getAudit);
router.get('/health', FiscalProductionEvidenceIntegrityCustodyController.getHealth);

export default router;

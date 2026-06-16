import { Router } from 'express';
import { FiscalProductionEvidenceVaultGovernanceController } from './FiscalProductionEvidenceVaultGovernanceController';

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

router.get('/policy', FiscalProductionEvidenceVaultGovernanceController.getPolicy);
router.get('/vault-blueprint', FiscalProductionEvidenceVaultGovernanceController.getVaultBlueprint);
router.get('/no-persistence-audit-boundary-contract', FiscalProductionEvidenceVaultGovernanceController.getNoPersistenceAuditBoundaryContract);
router.get('/evidence-classification-matrix', FiscalProductionEvidenceVaultGovernanceController.getEvidenceClassificationMatrix);
router.get('/evidence-retention-no-op-plan', FiscalProductionEvidenceVaultGovernanceController.getEvidenceRetentionNoOpPlan);
router.get('/evidence-hashing-no-crypto-plan', FiscalProductionEvidenceVaultGovernanceController.getEvidenceHashingNoCryptoPlan);
router.get('/evidence-access-no-read-matrix', FiscalProductionEvidenceVaultGovernanceController.getEvidenceAccessNoReadMatrix);
router.get('/evidence-export-no-op-plan', FiscalProductionEvidenceVaultGovernanceController.getEvidenceExportNoOpPlan);
router.get('/audit-trail-in-memory-only-plan', FiscalProductionEvidenceVaultGovernanceController.getAuditTrailInMemoryOnlyPlan);
router.get('/dependency-matrix', FiscalProductionEvidenceVaultGovernanceController.getDependencyMatrix);
router.get('/blockers', FiscalProductionEvidenceVaultGovernanceController.getBlockers);
router.get('/risks', FiscalProductionEvidenceVaultGovernanceController.getRisks);
router.post('/validate', FiscalProductionEvidenceVaultGovernanceController.validate);
router.post('/evaluate', FiscalProductionEvidenceVaultGovernanceController.evaluate);
router.post('/simulate-decision', FiscalProductionEvidenceVaultGovernanceController.simulateDecision);
router.get('/report', FiscalProductionEvidenceVaultGovernanceController.getReport);
router.get('/audit', FiscalProductionEvidenceVaultGovernanceController.getAudit);
router.get('/health', FiscalProductionEvidenceVaultGovernanceController.getHealth);

export default router;

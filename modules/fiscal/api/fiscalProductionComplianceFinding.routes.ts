import { Router } from 'express';
import { FiscalProductionComplianceFindingController } from './FiscalProductionComplianceFindingController';

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

router.get('/policy', FiscalProductionComplianceFindingController.getPolicy);
router.get('/finding-review-blueprint', FiscalProductionComplianceFindingController.getFindingReviewBlueprint);
router.get('/finding-classification-matrix', FiscalProductionComplianceFindingController.getFindingClassificationMatrix);
router.get('/severity-impact-matrix', FiscalProductionComplianceFindingController.getSeverityImpactMatrix);
router.get('/remediation-action-no-op-plan', FiscalProductionComplianceFindingController.getRemediationActionNoOpPlan);
router.get('/owner-assignment-no-notification-matrix', FiscalProductionComplianceFindingController.getOwnerAssignmentNoNotificationMatrix);
router.get('/exception-waiver-no-persistence-plan', FiscalProductionComplianceFindingController.getExceptionWaiverNoPersistencePlan);
router.get('/evidence-to-finding-no-read-matrix', FiscalProductionComplianceFindingController.getEvidenceToFindingNoReadMatrix);
router.get('/remediation-verification-no-execute-plan', FiscalProductionComplianceFindingController.getRemediationVerificationNoExecutePlan);
router.get('/no-finding-persistence-evidence', FiscalProductionComplianceFindingController.getNoFindingPersistenceEvidence);
router.get('/no-remediation-execution-evidence', FiscalProductionComplianceFindingController.getNoRemediationExecutionEvidence);
router.get('/dependency-matrix', FiscalProductionComplianceFindingController.getDependencyMatrix);
router.get('/blockers', FiscalProductionComplianceFindingController.getBlockers);
router.get('/risks', FiscalProductionComplianceFindingController.getRisks);
router.post('/validate', FiscalProductionComplianceFindingController.validate);
router.post('/evaluate', FiscalProductionComplianceFindingController.evaluate);
router.post('/simulate-decision', FiscalProductionComplianceFindingController.simulateDecision);
router.get('/report', FiscalProductionComplianceFindingController.getReport);
router.get('/audit', FiscalProductionComplianceFindingController.getAudit);
router.get('/health', FiscalProductionComplianceFindingController.getHealth);

export default router;

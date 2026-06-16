import { Router } from 'express';
import { FiscalProductionActivationApprovalController } from './FiscalProductionActivationApprovalController';

const router = Router();

// Middleware de autenticação mockado para simular exigência
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

router.get('/policy', FiscalProductionActivationApprovalController.getPolicy);
router.get('/approval-charter', FiscalProductionActivationApprovalController.getApprovalCharter);
router.get('/stakeholder-matrix', FiscalProductionActivationApprovalController.getStakeholderMatrix);
router.get('/pre-approval-matrix', FiscalProductionActivationApprovalController.getPreApprovalMatrix);
router.get('/evidence-review-matrix', FiscalProductionActivationApprovalController.getEvidenceReviewMatrix);
router.get('/quorum-simulation', FiscalProductionActivationApprovalController.getQuorumSimulation);
router.get('/vote-simulation', FiscalProductionActivationApprovalController.getVoteSimulation);
router.get('/go-no-go-no-op-matrix', FiscalProductionActivationApprovalController.getGoNoGoNoOpMatrix);
router.get('/risk-acceptance-no-op-review', FiscalProductionActivationApprovalController.getRiskAcceptanceNoOpReview);
router.get('/waiver-no-op-review', FiscalProductionActivationApprovalController.getWaiverNoOpReview);
router.get('/no-real-authorization-evidence', FiscalProductionActivationApprovalController.getNoRealAuthorizationEvidence);
router.get('/no-gate-unlock-evidence', FiscalProductionActivationApprovalController.getNoGateUnlockEvidence);
router.get('/dependency-matrix', FiscalProductionActivationApprovalController.getDependencyMatrix);
router.get('/blockers', FiscalProductionActivationApprovalController.getBlockers);
router.get('/risks', FiscalProductionActivationApprovalController.getRisks);
router.post('/validate', FiscalProductionActivationApprovalController.validate);
router.post('/evaluate', FiscalProductionActivationApprovalController.evaluate);
router.post('/simulate-decision', FiscalProductionActivationApprovalController.simulateDecision);
router.get('/report', FiscalProductionActivationApprovalController.getReport);
router.get('/audit', FiscalProductionActivationApprovalController.getAudit);
router.get('/health', FiscalProductionActivationApprovalController.getHealth);

export default router;

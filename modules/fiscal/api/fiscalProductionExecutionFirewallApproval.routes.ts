import { Router } from 'express';
import { FiscalProductionExecutionFirewallApprovalController } from './FiscalProductionExecutionFirewallApprovalController';

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

router.get('/policy', FiscalProductionExecutionFirewallApprovalController.getPolicy);
router.get('/approval-package', FiscalProductionExecutionFirewallApprovalController.getApprovalPackage);
router.get('/executive-signoff-simulation-matrix', FiscalProductionExecutionFirewallApprovalController.getExecutiveSignOffSimulationMatrix);
router.get('/approver-eligibility-matrix', FiscalProductionExecutionFirewallApprovalController.getApproverEligibilityMatrix);
router.get('/separation-of-duties-matrix', FiscalProductionExecutionFirewallApprovalController.getSeparationOfDutiesMatrix);
router.get('/approval-scope-no-op-plan', FiscalProductionExecutionFirewallApprovalController.getApprovalScopeNoOpPlan);
router.get('/no-real-approval-evidence', FiscalProductionExecutionFirewallApprovalController.getNoRealApprovalEvidence);
router.get('/no-gate-unlock-evidence', FiscalProductionExecutionFirewallApprovalController.getNoGateUnlockEvidence);
router.get('/no-token-issue-evidence', FiscalProductionExecutionFirewallApprovalController.getNoTokenIssueEvidence);
router.get('/authorization-block-matrix', FiscalProductionExecutionFirewallApprovalController.getAuthorizationBlockMatrix);
router.get('/boundary-drift-review-matrix', FiscalProductionExecutionFirewallApprovalController.getBoundaryDriftReviewMatrix);
router.get('/dependency-matrix', FiscalProductionExecutionFirewallApprovalController.getDependencyMatrix);
router.get('/blockers', FiscalProductionExecutionFirewallApprovalController.getBlockers);
router.get('/risks', FiscalProductionExecutionFirewallApprovalController.getRisks);
router.post('/validate', FiscalProductionExecutionFirewallApprovalController.validate);
router.post('/evaluate', FiscalProductionExecutionFirewallApprovalController.evaluate);
router.post('/simulate-decision', FiscalProductionExecutionFirewallApprovalController.simulateDecision);
router.get('/report', FiscalProductionExecutionFirewallApprovalController.getReport);
router.get('/audit', FiscalProductionExecutionFirewallApprovalController.getAudit);
router.get('/health', FiscalProductionExecutionFirewallApprovalController.getHealth);

export default router;

import { Router } from 'express';
import { FiscalProductionComplianceReleaseGatekeeperController } from './FiscalProductionComplianceReleaseGatekeeperController';

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

router.get('/policy', FiscalProductionComplianceReleaseGatekeeperController.getPolicy);
router.get('/release-validation-blueprint', FiscalProductionComplianceReleaseGatekeeperController.getReleaseValidationBlueprint);
router.get('/regulatory-gatekeeper-no-op-contract', FiscalProductionComplianceReleaseGatekeeperController.getRegulatoryGatekeeperNoOpContract);
router.get('/release-readiness-simulation-matrix', FiscalProductionComplianceReleaseGatekeeperController.getReleaseReadinessSimulationMatrix);
router.get('/release-blocker-simulation-matrix', FiscalProductionComplianceReleaseGatekeeperController.getReleaseBlockerSimulationMatrix);
router.get('/regulatory-gate-no-unlock-plan', FiscalProductionComplianceReleaseGatekeeperController.getRegulatoryGateNoUnlockPlan);
router.get('/finding-clearance-no-persistence-matrix', FiscalProductionComplianceReleaseGatekeeperController.getFindingClearanceNoPersistenceMatrix);
router.get('/remediation-acceptance-no-op-plan', FiscalProductionComplianceReleaseGatekeeperController.getRemediationAcceptanceNoOpPlan);
router.get('/filing-status-no-submit-review-matrix', FiscalProductionComplianceReleaseGatekeeperController.getFilingStatusNoSubmitReviewMatrix);
router.get('/release-hold-no-activation-plan', FiscalProductionComplianceReleaseGatekeeperController.getReleaseHoldNoActivationPlan);
router.get('/no-release-approval-evidence', FiscalProductionComplianceReleaseGatekeeperController.getNoReleaseApprovalEvidence);
router.get('/no-regulatory-gate-unlock-evidence', FiscalProductionComplianceReleaseGatekeeperController.getNoRegulatoryGateUnlockEvidence);
router.get('/dependency-matrix', FiscalProductionComplianceReleaseGatekeeperController.getDependencyMatrix);
router.get('/blockers', FiscalProductionComplianceReleaseGatekeeperController.getBlockers);
router.get('/risks', FiscalProductionComplianceReleaseGatekeeperController.getRisks);
router.post('/validate', FiscalProductionComplianceReleaseGatekeeperController.validate);
router.post('/evaluate', FiscalProductionComplianceReleaseGatekeeperController.evaluate);
router.post('/simulate-decision', FiscalProductionComplianceReleaseGatekeeperController.simulateDecision);
router.get('/report', FiscalProductionComplianceReleaseGatekeeperController.getReport);
router.get('/audit', FiscalProductionComplianceReleaseGatekeeperController.getAudit);
router.get('/health', FiscalProductionComplianceReleaseGatekeeperController.getHealth);

export default router;

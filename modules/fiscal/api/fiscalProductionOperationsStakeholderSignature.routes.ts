import { Router } from 'express';
import { FiscalProductionOperationsStakeholderSignatureController } from './FiscalProductionOperationsStakeholderSignatureController';
import { requireFiscalAuth } from './helpers';

function requireAdminRole(req: any, res: any, next: any) {
  const session = req.session;
  const user = req.user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
  }
  next();
}

const router = Router();
const controller = new FiscalProductionOperationsStakeholderSignatureController();

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/health', controller.getHealth.bind(controller));
router.get('/policy', controller.getPolicy.bind(controller));
router.get('/signature-evidence-collection', controller.getSignatureEvidenceCollection.bind(controller));
router.get('/mock-attestation-envelope', controller.getMockAttestationEnvelope.bind(controller));
router.get('/signer-eligibility-review-matrix', controller.getSignerEligibilityReviewMatrix.bind(controller));
router.get('/stakeholder-quorum-simulation', controller.getStakeholderQuorumSimulation.bind(controller));
router.get('/stakeholder-sod-review', controller.getStakeholderSoDReview.bind(controller));
router.get('/attestation-evidence-review', controller.getAttestationEvidenceReview.bind(controller));
router.get('/attestation-divergence-matrix', controller.getAttestationDivergenceMatrix.bind(controller));
router.get('/no-real-stakeholder-notification-evidence', controller.getNoRealStakeholderNotificationEvidence.bind(controller));
router.get('/no-real-signature-persistence-evidence', controller.getNoRealSignaturePersistenceEvidence.bind(controller));
router.get('/dependency-matrix', controller.getDependencyMatrix.bind(controller));
router.get('/blockers', controller.getBlockers.bind(controller));
router.get('/risks', controller.getRisks.bind(controller));
router.post('/validate', controller.validate.bind(controller));
router.post('/evaluate', controller.evaluate.bind(controller));
router.post('/simulate-decision', controller.simulateDecision.bind(controller));
router.get('/report', controller.getReport.bind(controller));
router.get('/audit', controller.getAudit.bind(controller));

export default router;

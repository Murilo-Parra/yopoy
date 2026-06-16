import { Router } from 'express';
import { FiscalProductionOperationsSignatureGovernanceController } from './FiscalProductionOperationsSignatureGovernanceController';
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
const controller = new FiscalProductionOperationsSignatureGovernanceController();

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/health', controller.getHealth.bind(controller));
router.get('/policy', controller.getPolicy.bind(controller));
router.get('/signature-governance-blueprint', controller.getSignatureGovernanceBlueprint.bind(controller));
router.get('/non-executable-activation-consent-contract', controller.getNonExecutableActivationConsentContract.bind(controller));
router.get('/authorized-signer-matrix', controller.getAuthorizedSignerMatrix.bind(controller));
router.get('/two-person-signature-simulation', controller.getTwoPersonSignatureSimulation.bind(controller));
router.get('/signature-sod-matrix', controller.getSignatureSoDMatrix.bind(controller));
router.get('/non-cryptographic-signature-envelope', controller.getNonCryptographicSignatureEnvelope.bind(controller));
router.get('/signature-evidence-no-persistence-plan', controller.getSignatureEvidenceNoPersistencePlan.bind(controller));
router.get('/no-real-signature-evidence', controller.getNoRealSignatureEvidence.bind(controller));
router.get('/no-gate-unlock-evidence', controller.getNoGateUnlockEvidence.bind(controller));
router.get('/dependency-matrix', controller.getDependencyMatrix.bind(controller));
router.get('/blockers', controller.getBlockers.bind(controller));
router.get('/risks', controller.getRisks.bind(controller));
router.post('/validate', controller.validate.bind(controller));
router.post('/evaluate', controller.evaluate.bind(controller));
router.post('/simulate-decision', controller.simulateDecision.bind(controller));
router.get('/report', controller.getReport.bind(controller));
router.get('/audit', controller.getAudit.bind(controller));

export default router;

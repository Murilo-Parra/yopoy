import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalAuditImmutabilityController } from './FiscalLegalAuditImmutabilityController';
import { requireFiscalAuth } from './helpers';

const router = Router();

function requireAdminRole(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  const user = (req as any).user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
    return;
  }
  next();
}

// Exigir autenticação e papel administrativo
router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalLegalAuditImmutabilityController.getPolicy);
router.get('/hash-chain-plan', FiscalLegalAuditImmutabilityController.getHashChainPlan);
router.get('/mock-hash-provider', FiscalLegalAuditImmutabilityController.getMockHashProvider);
router.get('/evidence-digest', FiscalLegalAuditImmutabilityController.getEvidenceDigest);
router.get('/mock-signature-envelope', FiscalLegalAuditImmutabilityController.getMockSignatureEnvelope);
router.get('/integrity-verifier', FiscalLegalAuditImmutabilityController.getIntegrityVerifier);
router.get('/evidence-package', FiscalLegalAuditImmutabilityController.getEvidencePackage);
router.get('/blockers', FiscalLegalAuditImmutabilityController.getBlockers);
router.get('/risks', FiscalLegalAuditImmutabilityController.getRisks);
router.post('/validate', FiscalLegalAuditImmutabilityController.validate);
router.post('/evaluate', FiscalLegalAuditImmutabilityController.evaluate);
router.post('/simulate-decision', FiscalLegalAuditImmutabilityController.simulateDecision);
router.get('/report', FiscalLegalAuditImmutabilityController.getReport);
router.get('/audit', FiscalLegalAuditImmutabilityController.getAudit);
router.get('/health', FiscalLegalAuditImmutabilityController.getHealth);

export default router;

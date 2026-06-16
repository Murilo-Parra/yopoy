import { Router } from 'express';
import { FiscalProductionFinalStateLedgerController } from './FiscalProductionFinalStateLedgerController';

const router = Router();

router.get('/policy', FiscalProductionFinalStateLedgerController.getPolicy);
router.get('/final-state-ledger-governance-blueprint', FiscalProductionFinalStateLedgerController.getFinalStateLedgerGovernanceBlueprint);
router.get('/immutable-no-activation-record-contract', FiscalProductionFinalStateLedgerController.getImmutableNoActivationRecordContract);
router.get('/virtual-ledger-scope-inventory', FiscalProductionFinalStateLedgerController.getVirtualLedgerScopeInventory);
router.get('/final-no-activation-state-matrix', FiscalProductionFinalStateLedgerController.getFinalNoActivationStateMatrix);
router.get('/final-no-authority-state-matrix', FiscalProductionFinalStateLedgerController.getFinalNoAuthorityStateMatrix);
router.get('/final-no-routing-state-matrix', FiscalProductionFinalStateLedgerController.getFinalNoRoutingStateMatrix);
router.get('/final-no-runtime-state-matrix', FiscalProductionFinalStateLedgerController.getFinalNoRuntimeStateMatrix);
router.get('/final-no-database-state-matrix', FiscalProductionFinalStateLedgerController.getFinalNoDatabaseStateMatrix);
router.get('/final-no-external-integration-state-matrix', FiscalProductionFinalStateLedgerController.getFinalNoExternalIntegrationStateMatrix);
router.get('/final-no-sensitive-data-state-matrix', FiscalProductionFinalStateLedgerController.getFinalNoSensitiveDataStateMatrix);
router.get('/ledger-no-persistence-plan', FiscalProductionFinalStateLedgerController.getLedgerNoPersistencePlan);
router.get('/ledger-no-real-hash-plan', FiscalProductionFinalStateLedgerController.getLedgerNoRealHashPlan);
router.get('/ledger-no-real-signature-plan', FiscalProductionFinalStateLedgerController.getLedgerNoRealSignaturePlan);
router.get('/final-state-no-legal-effect-notice', FiscalProductionFinalStateLedgerController.getFinalStateNoLegalEffectNotice);
router.get('/dependency-matrix', FiscalProductionFinalStateLedgerController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalStateLedgerController.getBlockers);
router.get('/risks', FiscalProductionFinalStateLedgerController.getRisks);
router.post('/validate', FiscalProductionFinalStateLedgerController.validate);
router.post('/evaluate', FiscalProductionFinalStateLedgerController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalStateLedgerController.simulateDecision);
router.get('/report', FiscalProductionFinalStateLedgerController.getReport);
router.get('/audit', FiscalProductionFinalStateLedgerController.getAudit);
router.get('/health', FiscalProductionFinalStateLedgerController.getHealth);

export const fiscalProductionFinalStateLedgerRoutes = router;

import { Router } from "express";
import { FiscalShadowService } from "../shadow/FiscalShadowService";
import { extractCompanyId, requireFiscalAuth } from "./helpers";
import { FiscalShadowInput, FiscalShadowMode, FiscalShadowOperation } from "../shadow/fiscalShadow.types";
import { FiscalShadowConfig } from "../shadow/FiscalShadowConfig";
import { FiscalShadowLimiter } from "../shadow/FiscalShadowLimiter";
import { FiscalShadowDivergenceReport } from "../shadow/FiscalShadowDivergenceReport";
import { FiscalShadowAuditRepository } from "../shadow/FiscalShadowAuditRepository";

const router = Router();
const shadowService = new FiscalShadowService();
const auditRepo = new FiscalShadowAuditRepository();

// Middleware de autenticação obrigatória
router.use(requireFiscalAuth);

/**
 * Retorna saúde/status do Shadow Routing (não expõe dados sensíveis)
 */
router.get("/health", (req, res) => {
  res.json({
    enabled: FiscalShadowConfig.isEnabled(),
    mode: FiscalShadowConfig.getMode(),
    activeCount: FiscalShadowLimiter.getActiveCount()
  });
});

/**
 * Retorna relatório agregado de observabilidade e divergências (não expõe payloads)
 */
router.get("/report", (req, res) => {
  // Nota: o middleware 'requireFiscalAuth' já protege.
  // Em produção, a critério, exigir admin level via verificação explícita do token.
  res.json(FiscalShadowDivergenceReport.generateAggregatedReport());
});

/**
 * Retorna lista de auditoria persistida (banco de dados)
 */
router.get("/audit", async (req, res) => {
  try {
    const companyId = extractCompanyId(req);
    const limit = parseInt(req.query.limit as string) || 50;
    const records = await auditRepo.listByCompany(companyId, limit);
    res.json({ success: true, count: records.length, records });
  } catch (error: any) {
    res.status(500).json({ error: "Erro ao buscar auditoria shadow." });
  }
});

/**
 * Rota interna protegida para executar comparação shadow entre payloads
 * Esta rota não interfere com produção e não gera efeitos colaterais reais.
 */
router.post("/compare", async (req, res) => {
  try {
    const companyId = extractCompanyId(req); // Usa apenas sessão/contexto
    const { operation, legacyPayload, v2Payload, mode } = req.body;

    const input: FiscalShadowInput = {
      companyId,
      userId: (req as any).user?.id || (req as any).session?.user_id,
      operation: operation as FiscalShadowOperation || FiscalShadowOperation.FISCAL_DOCUMENT_CREATE,
      legacyPayload: legacyPayload || {},
      v2Payload: v2Payload || {},
      mode: mode as FiscalShadowMode || FiscalShadowMode.DRY_RUN_COMPARE,
      source: "fiscal-v2-shadow"
    };

    const result = await shadowService.executeComparison(input);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export { router as shadowRoutes };

import { Request, Response, NextFunction } from "express";

/**
 * Função helper para extrair de forma segura o companyId da requisição.
 * NUNCA aceita o companyId oriundo de req.body, req.query ou req.params como autoridade.
 */
export function extractCompanyId(req: Request): string {
  const session = (req as any).session;
  const user = (req as any).user;
  
  // Também aceita de res.locals se disponível
  const resLocals = (req as any).res?.locals?.session;
  
  const companyId = session?.company_id || user?.company_id || resLocals?.company_id;
  
  if (!companyId) {
    throw new Error("Sessão inválida ou companyId não presente.");
  }
  
  return companyId;
}

/**
 * Middleware para exigir que o usuário/sessão correspondente esteja autenticado.
 * Garante bloqueio imediato antes que as requisições cheguem aos controllers.
 */
export function requireFiscalAuth(req: Request, res: Response, next: NextFunction): void {
  try {
    const companyId = extractCompanyId(req);
    if (!companyId) {
      res.status(401).json({ error: "Sessão expirada ou Token inválido." });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Sessão expirada ou Token inválido." });
  }
}

/**
 * Helper para formatar a resposta padronizada de operações de simulação (dry-run)
 */
export function dryRunResponse(res: Response, operation: string, result: any): void {
  res.json({
    success: true,
    dryRun: true,
    blockedRealWrite: true,
    operation,
    message: `Operação validada em modo dry-run. Nenhuma escrita fiscal real foi executada.`,
    result
  });
}

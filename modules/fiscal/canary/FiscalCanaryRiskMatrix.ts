import { FiscalCanaryRiskLevel } from "./FiscalCanaryTypes";

export class FiscalCanaryRiskMatrix {
  private static routeRiskMap: Record<string, FiscalCanaryRiskLevel> = {
    "GET /api/fiscal-v2/documents": FiscalCanaryRiskLevel.LOW,
    "GET /api/fiscal-v2/nfe": FiscalCanaryRiskLevel.LOW,
    "GET /api/fiscal-v2/nfce": FiscalCanaryRiskLevel.LOW,
    "GET /api/fiscal-v2/danfe": FiscalCanaryRiskLevel.LOW,
    "GET /api/fiscal-v2/sefaz/protocols": FiscalCanaryRiskLevel.LOW,
    "POST /api/fiscal-v2/dry-run/documents": FiscalCanaryRiskLevel.MEDIUM,
    "POST /api/fiscal-v2/sandbox/documents": FiscalCanaryRiskLevel.MEDIUM,
    "POST /api/fiscal-v2/documents": FiscalCanaryRiskLevel.HIGH,     // Creates draft without transmission
    "POST /api/fiscal-v2/nfe/transmit": FiscalCanaryRiskLevel.CRITICAL, // Transmission
    "POST /api/fiscal-v2/nfce/transmit": FiscalCanaryRiskLevel.CRITICAL,
    "POST /api/fiscal-v2/nfe/cancel": FiscalCanaryRiskLevel.CRITICAL,
    "POST /api/fiscal-v2/nfe/inutilize": FiscalCanaryRiskLevel.CRITICAL,
    "POST /api/fiscal-v2/nfe/cce": FiscalCanaryRiskLevel.CRITICAL,
    // Catch-all rules will apply to anything else
  };

  public static getRiskLevel(route: string): FiscalCanaryRiskLevel {
    // Exact match
    if (this.routeRiskMap[route]) {
      return this.routeRiskMap[route];
    }
    // Sub-path matches for critical operations
    if (route.includes("/transmit") || route.includes("/cancel") || route.includes("/inutilize") || route.includes("/cce")) {
      return FiscalCanaryRiskLevel.CRITICAL;
    }
    if (route.startsWith("GET ")) {
      return FiscalCanaryRiskLevel.LOW;
    }
    return FiscalCanaryRiskLevel.CRITICAL; // Default to CRITICAL for unknown writes
  }

  public static isCanaryAllowed(level: FiscalCanaryRiskLevel): boolean {
    // Only LOW and MEDIUM are allowed to be evaluated for Canary in this stage.
    // HIGH is simulation only. CRITICAL is blocked.
    // The requirement says:
    // CRITICAL sempre bloqueado nesta Sprint.
    // HIGH somente simulação.
    // LOW/MEDIUM podem ser candidatas a canary futuro, não ativo.
    if (level === FiscalCanaryRiskLevel.CRITICAL) return false;
    return true; // We allow evaluating HIGH, MEDIUM, LOW 
  }

  public static getReason(level: FiscalCanaryRiskLevel): string {
    switch (level) {
      case FiscalCanaryRiskLevel.CRITICAL:
        return "Risco Crítico bloqueado: Rota possui efeitos colaterais reais (SEFAZ, Assinatura, PDF).";
      case FiscalCanaryRiskLevel.HIGH:
        return "Risco Alto: Simulação permitida, requer observação manual (ex: persistência sem transmissão).";
      case FiscalCanaryRiskLevel.MEDIUM:
        return "Risco Médio: Candidata a canary futuro controlado (ex: dry-run, sandbox).";
      case FiscalCanaryRiskLevel.LOW:
        return "Risco Baixo: Candidata preferencial a canary (rota de leitura).";
      default:
        return "Risco não classificado.";
    }
  }
}

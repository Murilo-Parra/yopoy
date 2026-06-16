import { FiscalShadowAuditRepository } from "./FiscalShadowAuditRepository";

export class FiscalShadowAuditRetention {
  private static repository = new FiscalShadowAuditRepository();

  public static async executeCleanup(companyId: string, customDays?: number): Promise<void> {
    const olderThanDays = customDays || parseInt(process.env.FISCAL_SHADOW_RETENTION_DAYS || "30", 10);
    try {
      await this.repository.cleanupOld(companyId, olderThanDays);
    } catch (err: any) {
      console.error("[FISCAL_SHADOW_RETENTION] Falha ao limpar auditoria shadow antiga:", err.message);
    }
  }
}

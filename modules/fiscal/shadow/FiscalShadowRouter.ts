import { FiscalShadowService } from "./FiscalShadowService";
import { FiscalShadowConfig } from "./FiscalShadowConfig";
import { FiscalShadowSafeLogger } from "./FiscalShadowSafeLogger";
import { FiscalShadowInput, FiscalShadowOperation, FiscalShadowMode } from "./fiscalShadow.types";
import { FiscalShadowLimiter } from "./FiscalShadowLimiter";
import { FiscalShadowMetrics } from "./FiscalShadowMetrics";
import { FiscalShadowMemoryStore } from "./FiscalShadowMemoryStore";
import { FiscalShadowAuditService } from "./FiscalShadowAuditService";

export interface PassiveShadowContext {
  route: string;
  operation: FiscalShadowOperation;
  companyId: string;
  userId?: string;
  legacyPayload: any;
  v2Payload?: any; 
  requestId?: string;
}

export class FiscalShadowRouter {
  private static shadowService = new FiscalShadowService();
  private static auditService = new FiscalShadowAuditService();

  /**
   * Executa uma comparação V2 shadow assíncrona, não-bloqueante e silenciosa para o legado.
   * Dispara via fire-and-forget para não onerar a rota oficial.
   */
  public static async runPassiveShadow(context: PassiveShadowContext): Promise<void> {
    // 1. Verificações de configuração
    if (!FiscalShadowConfig.isEnabled()) {
      return; 
    }

    if (!FiscalShadowConfig.isRouteAllowed(context.route)) {
      return;
    }

    // 2. Limite de Concorrência
    if (!FiscalShadowLimiter.canExecute()) {
      FiscalShadowMetrics.incrementDropped();
      console.warn(`[FISCAL_SHADOW_V2] Execution dropped for route ${context.route} due to concurrency limits.`);
      return;
    }

    FiscalShadowLimiter.acquire();
    const startTime = Date.now();

    // 3. Offload para Promise não-bloqueante
    Promise.resolve().then(async () => {
      try {
        const input: FiscalShadowInput = {
          companyId: context.companyId,
          userId: context.userId,
          operation: context.operation,
          legacyPayload: context.legacyPayload,
          v2Payload: context.v2Payload || context.legacyPayload, // Se a v2 não precisa de mapeamento, usa igual p comparar shape
          mode: FiscalShadowConfig.getMode(),
          source: "fiscal-v2-shadow"
        };

        const result = await this.shadowService.executeComparison(input);
        const durationMs = Date.now() - startTime;
        
        FiscalShadowMetrics.recordSuccess(context.route, context.operation, result.matched, durationMs, result.severity);
        
        FiscalShadowMemoryStore.addReport({
            route: context.route,
            operation: context.operation,
            matched: result.matched,
            severity: result.severity,
            differenceCount: result.differences?.length || 0,
            warningCount: result.warnings?.length || 0,
            durationMs,
            timestamp: new Date().toISOString(),
            requestId: context.requestId
        });

        FiscalShadowSafeLogger.log(context.route, result, context.requestId);

        // 4. Persistence Audit
        await this.auditService.persistReport(
          context.route,
          context.companyId,
          context.userId,
          context.requestId,
          durationMs,
          result
        );

      } catch (error: any) {
        // Silêncio absoluto para não engolir o processo, apenas log seguro
        FiscalShadowMetrics.incrementFailed();
        FiscalShadowSafeLogger.logError(context.route, error, context.requestId);
      } finally {
        FiscalShadowLimiter.release();
      }
    }).catch(e => {
        // Fallback global catch
        FiscalShadowMetrics.incrementFailed();
        FiscalShadowSafeLogger.logError(context.route, e, context.requestId);
        FiscalShadowLimiter.release();
    });
  }
}


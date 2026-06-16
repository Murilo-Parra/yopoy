import { FiscalCanaryRuntimeDecision } from "./FiscalCanaryRuntimeTypes";
import { FiscalCanaryRuntimeGuard } from "./FiscalCanaryRuntimeGuard";
import { FiscalCanaryFeatureFlagRegistry } from "./FiscalCanaryFeatureFlagRegistry";
import { FiscalCanaryRuntimeAuditService } from "./FiscalCanaryRuntimeAuditService";

export class FiscalCanaryRuntimeDecisionService {
  private guard = new FiscalCanaryRuntimeGuard();
  private registry = new FiscalCanaryFeatureFlagRegistry();
  private audit = new FiscalCanaryRuntimeAuditService();

  public async simulateRuntimeDecision(route: string, operation: string, companyId?: string, userId?: string): Promise<FiscalCanaryRuntimeDecision> {
    const decision = this.guard.evaluate(route, operation, companyId);
    await this.audit.recordDecision(route, operation, decision, companyId, userId);
    return decision;
  }

  public validateHardOff(): { isValid: boolean; message: string } {
    const isHardOff = this.guard.assertHardOff();
    return {
        isValid: isHardOff,
        message: isHardOff ? "Runtime is safely hard-off." : "WARNING: Runtime is NOT hard-off!"
    };
  }

  public getRuntimeStatus() {
    return {
       status: "HARD_OFF",
       message: "Acesso V2 de produção bloqueado.",
       simulationOnly: true,
       activationBlocked: true
    };
  }

  public getFlagSnapshot() {
    return this.registry.getSnapshot();
  }
}

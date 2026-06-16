import { FiscalShadowProxyDispatchInput, FiscalShadowProxyDispatchResult, FiscalShadowProxyMode } from "./FiscalShadowProxyTypes";
import { FiscalShadowProxyDecisionService } from "./FiscalShadowProxyDecisionService";
import { FiscalShadowProxyComparatorService } from "./FiscalShadowProxyComparatorService";
import { FiscalShadowProxyAuditService } from "./FiscalShadowProxyAuditService";
import { FiscalShadowProxySanitizer } from "./FiscalShadowProxySanitizer";
import { FiscalSafeShapeValidator } from "./FiscalSafeShapeValidator";

export class FiscalShadowProxyHarness {
  private decisionService = new FiscalShadowProxyDecisionService();
  private comparatorService = new FiscalShadowProxyComparatorService();
  private auditService = new FiscalShadowProxyAuditService();
  private sanitizer = new FiscalShadowProxySanitizer();
  private validator = new FiscalSafeShapeValidator();

  public getStatus() {
    return {
      mode: FiscalShadowProxyMode.HARNESS_ONLY,
      message: "Shadow Proxy Harness ativo e inerte. Tráfego não está sendo interceptado.",
      simulationOnly: true,
      activationBlocked: true
    };
  }

  public async simulateDispatch(input: FiscalShadowProxyDispatchInput, userId?: string): Promise<FiscalShadowProxyDispatchResult> {
    const safeInput = this.sanitizer.sanitize(input);
    const decision = this.decisionService.evaluateDecision(safeInput);
    
    let comparison = undefined;
    if (decision.blockers.length === 0 && safeInput.legacyShape && safeInput.v2Shape) {
       comparison = this.comparatorService.compare(safeInput.legacyShape, safeInput.v2Shape);
       decision.comparison = comparison;
    }

    const routePath = `${safeInput.legacyMethod} ${safeInput.legacyPath}`;
    await this.auditService.logSimulatedDispatch(routePath, safeInput.operation || "UNKNOWN", decision, comparison, safeInput.companyId, userId);

    return decision;
  }

  public compareShape(legacyShape: any, v2Shape: any) {
    return this.comparatorService.compare(legacyShape, v2Shape);
  }

  public validateRoute(input: FiscalShadowProxyDispatchInput) {
    const safeInput = this.sanitizer.sanitize(input);
    return this.decisionService.evaluateDecision(safeInput);
  }

  public validateSafeShape(data: any) {
    const safeData = this.sanitizer.sanitize(data);
    return this.validator.validateSanitizedOutput(safeData);
  }
}

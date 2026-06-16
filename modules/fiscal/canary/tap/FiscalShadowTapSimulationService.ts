import { FiscalShadowTapAuditService } from "./FiscalShadowTapAuditService";
import { FiscalShadowTapDecisionService } from "./FiscalShadowTapDecisionService";
import { FiscalShadowTapSanitizer } from "./FiscalShadowTapSanitizer";
import { FiscalShadowTapDecision, FiscalShadowTapSanitizedSnapshot } from "./FiscalShadowTapTypes";

export class FiscalShadowTapSimulationService {
  private decisionService: FiscalShadowTapDecisionService;
  private sanitizer: FiscalShadowTapSanitizer;
  private auditService: FiscalShadowTapAuditService;

  constructor(auditService: FiscalShadowTapAuditService) {
    this.decisionService = new FiscalShadowTapDecisionService();
    this.sanitizer = new FiscalShadowTapSanitizer();
    this.auditService = auditService;
  }

  public simulateCapture(input: any): { decision: FiscalShadowTapDecision, snapshot: FiscalShadowTapSanitizedSnapshot } {
    const decision = this.decisionService.evaluateCapture(input.route || "/unknown", input.operation || "UNKNOWN");
    const snapshot = this.sanitizer.sanitizeSnapshot(input);
    
    this.auditService.logSimulation(input.route || "/unknown", input.operation || "UNKNOWN", input.companyId, input.userId);

    return {
      decision,
      snapshot
    };
  }

  public validatePolicy(route: string, operation: string): FiscalShadowTapDecision {
    return this.decisionService.evaluateCapture(route, operation);
  }
}

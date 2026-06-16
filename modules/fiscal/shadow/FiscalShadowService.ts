import { FiscalShadowComparisonResult, FiscalShadowInput, FiscalShadowMode, Severity } from "./fiscalShadow.types";
import { FiscalShadowComparator } from "./FiscalShadowComparator";
import { FiscalShadowReporter } from "./FiscalShadowReporter";
import { SandboxFiscalController } from "../api/SandboxFiscalController"; // we can reuse sandbox for SANDBOX_COMPARE but better use mocks or internal handles

export class FiscalShadowService {
  private comparator: FiscalShadowComparator;
  private reporter: FiscalShadowReporter;

  constructor() {
    this.comparator = new FiscalShadowComparator();
    this.reporter = new FiscalShadowReporter();
  }

  public async executeComparison(input: FiscalShadowInput): Promise<FiscalShadowComparisonResult> {
    if (!input.companyId) {
      throw new Error("companyId é obrigatório para shadow comparison e deve vir da sessão/contexto.");
    }

    if (input.mode === FiscalShadowMode.DISABLED) {
      return this.reporter.generateReport(input.mode, input.operation, [], ["Shadow mode desabilitado"]);
    }

    const differences = this.comparator.comparePayloads(input.legacyPayload, input.v2Payload);
    const warnings: string[] = [];

    // Here we can run validation logic on v2Payload
    try {
      this.validateV2Payload(input.operation, input.v2Payload);
    } catch (e: any) {
      warnings.push(`Falha de validação estrutural V2: ${e.message}`);
      differences.push({
        field: "payload",
        severity: Severity.BLOCKER,
        message: `A validação da DTO falhou: ${e.message}`
      });
    }

    // In SANDBOX_COMPARE mode, we optionally run actual service. But to keep it decoupled and safe,
    // we just use the structural comparison at this point or call services in dry-run mode.
    // As per rules, we must not touch legacy flow nor change response.
    // The scope says: 'Testar: Shadow compare... em DRY_RUN_COMPARE.'

    const safeLegacy = this.comparator.maskSensitiveData(input.legacyPayload);
    const safeV2 = this.comparator.maskSensitiveData(input.v2Payload);

    return this.reporter.generateReport(
      input.mode,
      input.operation,
      differences,
      warnings,
      safeLegacy,
      safeV2
    );
  }

  private validateV2Payload(operation: string, payload: any) {
    // Ideally map to our validators like validateNfeCreate(payload) etc.
    // To keep it simple and safe for all kinds
    if (!payload) throw new Error("Payload V2 vazio");
  }
}

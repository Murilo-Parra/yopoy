import { FiscalSandboxClosureFinalReport, FiscalSandboxClosureStatus } from './FiscalSandboxClosureTypes';
import { FiscalSandboxClosureInventory } from './FiscalSandboxClosureInventory';
import { FiscalSandboxClosureGuardrails } from './FiscalSandboxClosureGuardrails';
import { FiscalSandboxClosureRiskRegister } from './FiscalSandboxClosureRiskRegister';
import { FiscalSandboxClosureHandoffService } from './FiscalSandboxClosureHandoffService';

export class FiscalSandboxClosureReportService {
  public static getFinalReport(): FiscalSandboxClosureFinalReport {
    const inventory = FiscalSandboxClosureInventory.getInventory();
    const guardrails = FiscalSandboxClosureGuardrails.getGuardrails();
    const risks = FiscalSandboxClosureRiskRegister.getRisks();
    const handoff = FiscalSandboxClosureHandoffService.getHandoff();

    // In a real scenario, this status could be dynamic. For now, we enforce a closed safe state.
    const status = FiscalSandboxClosureStatus.CLOSED_WITH_GUARDRAILS;

    return {
      generatedAt: new Date().toISOString(),
      status,
      inventory,
      guardrails,
      risks,
      handoff,
      recommendations: [
        'O Módulo 6 foi encerrado em modo sandbox-only/read-only para governança. A ativação real do Fiscal V2 permanece bloqueada.',
        'Mantenha as constraints e restrições RLS em fiscal_v2_sandbox_snapshots intocadas.',
        'Ao iniciar o Módulo 7, certifique-se de tratar a interceptação de ponta a ponta em read-only até obter confiança para mutação de payload.'
      ],
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}

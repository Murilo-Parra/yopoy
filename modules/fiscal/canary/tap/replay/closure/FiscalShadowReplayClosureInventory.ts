import { FiscalShadowReplayClosureInventoryItem, FiscalShadowReplayClosureDomain } from "./FiscalShadowReplayClosureTypes";

export class FiscalShadowReplayClosureInventory {
  public getInventory(): FiscalShadowReplayClosureInventoryItem[] {
    const common = {
      implemented: true,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      hasWorkers: false,
      hasCron: false,
      hasSchemaChange: false
    };

    return [
      { domain: FiscalShadowReplayClosureDomain.SHADOW_TAP, ...common, hasRoutes: true, notes: "Fase 5.1/5.2: Inerte via endpoint manual" },
      { domain: FiscalShadowReplayClosureDomain.MANUAL_CAPTURE, ...common, hasRoutes: true, notes: "Fase 5.1: Captura manual para testes" },
      { domain: FiscalShadowReplayClosureDomain.REPLAY_QUEUE, ...common, hasRoutes: true, notes: "Fase 5.3: Queue read-only in memory" },
      { domain: FiscalShadowReplayClosureDomain.REPLAY_BATCH, ...common, hasRoutes: true, notes: "Fase 5.4: Processamento batch síncrono" },
      { domain: FiscalShadowReplayClosureDomain.REPLAY_METRICS, ...common, hasRoutes: true, notes: "Fase 5.5: Dashboard sem persistência" },
      { domain: FiscalShadowReplayClosureDomain.REPLAY_GOVERNANCE, ...common, hasRoutes: true, notes: "Fase 5.6: Export sanitizado" },
      { domain: FiscalShadowReplayClosureDomain.SAFE_SHAPE, ...common, hasRoutes: false, notes: "Fase 4.4: Sanitizador de payloads" },
      { domain: FiscalShadowReplayClosureDomain.ROUTE_MAPPING, ...common, hasRoutes: false, notes: "Fase 4.3: Tabela inerte de rotas DE->PARA" },
      { domain: FiscalShadowReplayClosureDomain.RUNTIME_GUARD, ...common, hasRoutes: false, notes: "Fase 4.2: Guardrail para bypasses e imports" },
      { domain: FiscalShadowReplayClosureDomain.LEGACY_COMPATIBILITY, ...common, hasRoutes: false, notes: "Fase 4.x: Compatibilidade preservada" },
      { domain: FiscalShadowReplayClosureDomain.BOOT_POLICY, ...common, hasRoutes: false, notes: "Fase 1.1: Validação estrita de setup" },
      { domain: FiscalShadowReplayClosureDomain.RLS, ...common, hasRoutes: false, notes: "Fase 3: Row Level Security em tabelas V2" }
    ];
  }
}

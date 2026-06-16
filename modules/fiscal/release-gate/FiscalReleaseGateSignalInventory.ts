import { FiscalReleaseGateDomain, FiscalReleaseGateSignal } from './FiscalReleaseGateTypes';

export class FiscalReleaseGateSignalInventory {
  public static getSignals(): FiscalReleaseGateSignal[] {
    const baseFlags = {
      readOnly: true as true,
      simulationOnly: true as true,
      activationBlocked: true as true,
      approvedForRelease: false as false
    };

    return [
      {
        domain: FiscalReleaseGateDomain.FISCAL_CONTRACTS,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Types and Schemas created.',
        blocker: false,
        notes: 'Apenas contratos.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.FISCAL_REPOSITORIES,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Drizzle queries established.',
        blocker: false,
        notes: 'Pronto, mas DML passivo/simulado.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.FISCAL_SERVICES,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Business logic isolated without state mutation.',
        blocker: false,
        notes: 'Apenas lógica de negócio inerte.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.FISCAL_CONTROLLERS,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Admin routes created and returning synthetic data.',
        blocker: false,
        notes: 'Apenas roteamento de read-only.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.FISCAL_V2_READ_ONLY,
        available: true,
        status: 'READY',
        evidence: 'Read-only access implemented successfully.',
        blocker: false,
        notes: 'Leitura autorizada.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.FISCAL_DRY_RUN,
        available: true,
        status: 'READY',
        evidence: 'Dry-run validation functional.',
        blocker: false,
        notes: 'Validação de schema sem persistência.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.FISCAL_SANDBOX,
        available: true,
        status: 'READY',
        evidence: 'Sandbox controller active.',
        blocker: false,
        notes: 'Ambiente isolado in-memory.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.SHADOW_COMPARISON,
        available: true,
        status: 'READY',
        evidence: 'Diff generator created.',
        blocker: false,
        notes: 'Ferramenta de comparação.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.CANARY_CONTROL_PLANE,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Flags generated but inert.',
        blocker: false,
        notes: 'Control plane inerte.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.SHADOW_PROXY,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Proxy logic created but not active.',
        blocker: false,
        notes: 'Proxy de shadow desativado.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.REPLAY_QUEUE,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Queue mechanism created without background worker.',
        blocker: false,
        notes: 'Fila in-memory.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.SANDBOX_PERSISTENCE,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Temporary tables mapped, no real DML.',
        blocker: false,
        notes: 'Persistência isolada.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.SHADOW_MIRROR,
        available: true,
        status: 'READY_IN_SIMULATION',
        evidence: 'Mirror topology defined.',
        blocker: false,
        notes: 'Topologia administrativa.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.LOAD_PLANNING,
        available: true,
        status: 'CLOSED_AS_PLANNING_ONLY',
        evidence: 'Load testing modeled, execution blocked.',
        blocker: true, // Needs manual override/dedicated env later
        notes: 'Carga pendente validacao real.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.BOOT_POLICY,
        available: true,
        status: 'VERIFIED',
        evidence: 'Build passes, ENV verified.',
        blocker: false,
        notes: 'Integridade mantida.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.RLS,
        available: true,
        status: 'VERIFIED',
        evidence: 'DB policies intact.',
        blocker: false,
        notes: 'Isolamento de tenant mantido.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.LEGACY_COMPATIBILITY,
        available: true,
        status: 'VERIFIED',
        evidence: 'Legacy routes untouched.',
        blocker: false,
        notes: 'Legado opera normalmente.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.SEFAZ_ISOLATION,
        available: true,
        status: 'VERIFIED',
        evidence: 'SEFAZ blocked in V2.',
        blocker: false,
        notes: 'SEFAZ inerte.',
        ...baseFlags
      },
      {
        domain: FiscalReleaseGateDomain.XML_PDF_ISOLATION,
        available: true,
        status: 'VERIFIED',
        evidence: 'XML/PDF generation blocked in V2.',
        blocker: false,
        notes: 'Geração bloqueada.',
        ...baseFlags
      }
    ];
  }
}

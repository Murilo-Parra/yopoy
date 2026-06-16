export class FiscalRollbackPlanMatrix {
  public static getRollbackPlans(): any[] {
    const defaultFlags = {
      executableNow: false as false,
      rollbackExecuted: false as false,
      requiresManualApproval: true as true,
      requiresNewModule: true as true
    };

    return [
      { id: 'RB-01', name: 'Rollback de rota para legado', ...defaultFlags },
      { id: 'RB-02', name: 'Rollback de canary para 0%', ...defaultFlags },
      { id: 'RB-03', name: 'Rollback de feature flag', ...defaultFlags },
      { id: 'RB-04', name: 'Rollback de worker V2', ...defaultFlags },
      { id: 'RB-05', name: 'Rollback de SEFAZ connector V2', ...defaultFlags },
      { id: 'RB-06', name: 'Rollback de PDF/DANFE V2', ...defaultFlags },
      { id: 'RB-07', name: 'Rollback de XML signer V2', ...defaultFlags },
      { id: 'RB-08', name: 'Rollback de sandbox para read-only', ...defaultFlags },
      { id: 'RB-09', name: 'Rollback de tráfego shadow para off', ...defaultFlags }
    ];
  }
}

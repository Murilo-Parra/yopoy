export class FiscalKillSwitchPlan {
  public static getKillSwitches(): any[] {
    const defaultFlags = {
      activatableNow: false as false,
      killSwitchActivated: false as false,
      requiresManualApproval: true as true,
      requiresNewModule: true as true
    };

    return [
      { id: 'KS-01', scope: 'Global V2 off', requirements: 'Admin Governance', ...defaultFlags },
      { id: 'KS-02', scope: 'Tenant V2 off', requirements: 'Tenant Governance', ...defaultFlags },
      { id: 'KS-03', scope: 'SEFAZ V2 off', requirements: 'Admin Governance', ...defaultFlags },
      { id: 'KS-04', scope: 'XML signing V2 off', requirements: 'Admin Governance', ...defaultFlags },
      { id: 'KS-05', scope: 'PDF V2 off', requirements: 'Admin Governance', ...defaultFlags },
      { id: 'KS-06', scope: 'Workers V2 off', requirements: 'Admin Governance', ...defaultFlags },
      { id: 'KS-07', scope: 'Canary off', requirements: 'Admin/Control Plane', ...defaultFlags },
      { id: 'KS-08', scope: 'Sandbox write off', requirements: 'Admin Governance', ...defaultFlags }
    ];
  }
}

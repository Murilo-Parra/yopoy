export class FiscalHomologationIsolationPlan {
  public static getIsolationPlans(): any[] {
    return [
      { id: 'ISO-NET', name: 'Isolamento de rede futuro', appliedNow: false },
      { id: 'ISO-DB', name: 'Isolamento de banco futuro', appliedNow: false },
      { id: 'ISO-TENANT', name: 'Isolamento por tenant futuro', appliedNow: false },
      { id: 'ISO-CERT', name: 'Isolamento de certificados futuro', appliedNow: false }
    ];
  }
}

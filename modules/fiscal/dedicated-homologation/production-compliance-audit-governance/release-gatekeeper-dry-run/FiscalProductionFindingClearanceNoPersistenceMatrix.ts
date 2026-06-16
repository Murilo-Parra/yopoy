export class FiscalProductionFindingClearanceNoPersistenceMatrix {
  public static getMatrix() {
    return {
      findingClearanceNoPersistenceMatrixGenerated: true,
      realFindingClearancePersisted: false,
      realFindingCreated: false,
      description: 'Modelar clearance de findings sem persistência. Não persistir clearance real. Não criar finding real.'
    };
  }
}

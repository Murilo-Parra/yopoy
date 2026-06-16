export class FiscalDay2SupportRbacSimulationMatrix {
  public static getMatrix() {
    return {
      supportRbacSimulationMatrixGenerated: true,
      realRbacChanged: false,
      realPrivilegeEscalated: false,
      description: 'Modelagem de matriz RBAC simulada. Não altera RBAC real. Não eleva privilégio real.'
    };
  }
}

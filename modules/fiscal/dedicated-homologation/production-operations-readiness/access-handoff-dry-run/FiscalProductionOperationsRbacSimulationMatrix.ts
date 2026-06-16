export class FiscalProductionOperationsRbacSimulationMatrix {
  public static getMatrix() {
    return {
      rbacSimulationMatrixGenerated: true,
      realRbacModified: false,
      realPermissionModified: false,
      description: 'Simular RBAC sem alteração real. Não modificar permissão real.'
    };
  }
}

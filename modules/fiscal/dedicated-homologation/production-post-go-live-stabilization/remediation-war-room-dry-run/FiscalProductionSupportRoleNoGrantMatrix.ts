export class FiscalProductionSupportRoleNoGrantMatrix {
  public static getMatrix() {
    return {
      supportRoleNoGrantMatrixGenerated: true,
      realSupportAccessGranted: false,
      realRbacChanged: false,
      description: 'Modelar papéis de suporte sem grant real. Não alterar RBAC. Não conceder acesso de suporte.'
    };
  }
}

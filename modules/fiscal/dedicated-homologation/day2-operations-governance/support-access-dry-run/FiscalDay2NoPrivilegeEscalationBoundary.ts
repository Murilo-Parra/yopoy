export class FiscalDay2NoPrivilegeEscalationBoundary {
  public static getBoundary() {
    return {
      noPrivilegeEscalationBoundaryGenerated: true,
      realPrivilegeEscalated: false,
      realUserPermissionModified: false,
      description: 'Modelagem de boundary contra privilege escalation. Não modifica usuário real. Não cria permissão real.'
    };
  }
}

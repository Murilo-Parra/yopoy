export class FiscalProductionSystemWideNoAuthorityHandoffService {
  public static generateHandoff() {
    return {
      noAuthorityHandoffGenerated: true,
      realAuthorityHandoffConcluded: false,
      description: 'Simular handoff de ausência de autoridade. Não concluir handoff real.'
    };
  }
}

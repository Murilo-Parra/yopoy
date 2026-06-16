export class FiscalProductionAuthorityVoteSimulation {
  public static getSimulation() {
    return {
      authorityVoteSimulationGenerated: true,
      realDeliberationPersisted: false,
      realAuthorizationGranted: false,
      description: 'Modelagem de votos administrativos simulados. Não registra voto real persistido nem concede autorização real.'
    };
  }
}

export class FiscalProductionDeploymentIsolationRiskRegister {
  public static getRisks() {
    return [
      'R-PDI-01: Risco de production activation blueprint ser interpretado como ativação real.',
      'R-PDI-02: Risco de release deployment isolation contract ser confundido com deploy executado.',
      'R-PDI-03: Risco de release artifact inventory ser tratado como artefato executável.',
      'R-PDI-04: Risco de rollout isolation plan ser usado como gatilho de rollout real.',
      'R-PDI-05: Risco de dependency matrix ser usada como aprovação de Produção V2.',
      'R-PDI-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}

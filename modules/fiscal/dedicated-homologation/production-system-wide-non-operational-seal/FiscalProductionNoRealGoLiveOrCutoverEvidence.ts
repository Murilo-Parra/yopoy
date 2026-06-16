export class FiscalProductionNoRealGoLiveOrCutoverEvidence {
  public static getEvidence() {
    return {
      noRealGoLiveOrCutoverEvidenceGenerated: true,
      realGoLiveApproved: false,
      realGoLiveExecuted: false,
      realCutoverExecuted: false,
      description: 'Evidenciar que nenhum go-live/cutover real ocorreu.'
    };
  }
}

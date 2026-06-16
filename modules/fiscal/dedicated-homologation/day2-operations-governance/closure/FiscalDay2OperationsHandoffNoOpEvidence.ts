export class FiscalDay2OperationsHandoffNoOpEvidence {
  public static getEvidence() {
    return {
      handoffNoOpEvidenceGenerated: true,
      realHandoffExecuted: false,
      realDay2OperationExecuted: false,
      description: 'Modelagem de pacote de evidências Hand-Off No-Op. Não há handoff operacional real para o time de suporte.'
    };
  }
}

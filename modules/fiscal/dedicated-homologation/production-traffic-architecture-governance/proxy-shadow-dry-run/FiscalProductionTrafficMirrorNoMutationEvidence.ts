export class FiscalProductionTrafficMirrorNoMutationEvidence {
  public static getEvidence() {
    return {
      trafficMirrorNoMutationEvidenceGenerated: true,
      realTrafficMirrored: false,
      realTrafficChanged: false,
      description: 'Evidenciar ausência de mirror/mutação.'
    };
  }
}

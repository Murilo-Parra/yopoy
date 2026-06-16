export class FiscalProductionCustodyAttestationNoLegalEffectNotice {
  public static getNotice() {
    return {
      custodyAttestationNoLegalEffectNoticeGenerated: true,
      approvedForRealCustodyAttestation: false,
      approvedForRealLegalHold: false,
      approvedForRealDeletion: false,
      description: 'Declarar ausência de efeito legal, regulatório, operacional e produtivo.'
    };
  }
}

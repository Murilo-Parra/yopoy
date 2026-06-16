export class FiscalLegalFinalCommitteeHandoffService {
  public static generateHandoff() {
    return {
      finalCommitteeHandoffGenerated: true,
      externalApproverNotified: false,
      externalSignerNotified: false,
      realLegalSignOffGranted: false,
      productionV2Activated: false,
      allowed: ['Administrative reading', 'Evidence review', 'Planning future module'],
      forbidden: ['Grant real signature', 'Persist signature', 'Create definitive legal record', 'Load cert/PFX', 'Call crypto library', 'Sign XML/PDF', 'Notify externals', 'Activate Production V2']
    };
  }
}

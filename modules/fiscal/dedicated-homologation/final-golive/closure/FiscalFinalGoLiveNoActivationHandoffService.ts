export class FiscalFinalGoLiveNoActivationHandoffService {
  public static generateHandoff() {
    return {
      noActivationHandoffGenerated: true,
      productionV2Activated: false,
      trafficChanged: false,
      externalApproverNotified: false,
      externalSignerNotified: false,
      realSefazCalled: false,
      allowed: ['Administrative reading', 'Evidence review', 'Planning future module'],
      forbidden: ['Activate production', 'Switch traffic', 'Route to V2', 'Execute release', 'Execute canary', 'Run real runbook', 'Modify app.use', 'Install middleware/tap', 'Create worker', 'Connect database', 'Call SEFAZ', 'Load certificate/PFX/password', 'Sign XML/PDF']
    };
  }
}

export class FiscalHomologationMockPhaseOutPlan {
  public static getPlan() {
    return {
      generatedAt: new Date().toISOString(),
      mockPhaseOutExecuted: false as false,
      executableNow: false as false,
      requiresManualApproval: true as true,
      requiresDedicatedEnvironment: true as true,
      freezes: [
        'Mock SEFAZ communicator will be frozen.',
        'Mock certificate provider will be frozen.',
        'Mock XML signer will be frozen.',
        'Mock DANFE renderer will be frozen.',
        'Review metrics are frozen.',
        'Closure evidence is frozen.'
      ],
      futurePlans: [
        'Replace with dedicated environment components in future modules.',
        'Manual validation mandatory before any real execution.'
      ],
      warnings: [
        'No mock was deactivated in this phase.'
      ]
    };
  }
}

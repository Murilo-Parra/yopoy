export class FiscalProductionRuntimeNamespaceCollisionReviewMatrix {
  public static getMatrix() {
    return {
      namespaceCollisionReviewGenerated: true,
      namespaceOverlapIntroducedByModule40_6: false,
      preExistingIssues: [
        'FiscalProductionTrafficSliceSimulationMatrix - Colisão identificada entre domínios anteriores. Solução: usar imports explícitos.'
      ],
      description: 'Revisar e documentar namespace overlap dos domínios 32 a 40.5. Não alterar domínios anteriores destrutivamente. Recomendar imports diretos.'
    };
  }
}

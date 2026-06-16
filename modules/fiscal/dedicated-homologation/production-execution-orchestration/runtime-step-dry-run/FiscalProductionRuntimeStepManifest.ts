export class FiscalProductionRuntimeStepManifest {
  public static generateManifest() {
    return {
      stepManifestGenerated: true,
      runtimeExecutionStarted: false,
      realProductionExecutionStarted: false,
      description: 'Modelagem do manifesto administrativo das etapas futuras de runtime. Não executa etapa real.'
    };
  }
}

export class FiscalProductionRuntimeCommandManifest {
  public static generateManifest() {
    return {
      commandManifestGenerated: true,
      commandRunnerExecuted: false,
      shellCommandExecuted: false,
      description: 'Modelagem de manifesto de comandos pretendidos em formato não executável. Não gera shell command real nem executa command runner.'
    };
  }
}

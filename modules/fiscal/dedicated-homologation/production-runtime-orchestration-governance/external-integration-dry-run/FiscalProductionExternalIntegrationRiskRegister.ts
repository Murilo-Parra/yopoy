export class FiscalProductionExternalIntegrationRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PEI-01: Risco de blueprint de integração parecer chamada externa real validada.',
      'R-PEI-02: Risco de SEFAZ no-call parecer consulta real de autorização.',
      'R-PEI-03: Risco de token no-issue parecer token real emitido.',
      'R-PEI-04: Risco de webhook no-send parecer comunicação externa realizada.',
      'R-PEI-05: Risco de callback no-register parecer callback produtivo registrado.',
      'R-PEI-06: Risco de HTTP adapter no-bind parecer client externo autenticado.',
      'R-PEI-07: Risco de credential no-read parecer segredo sanitizado lido.',
      'R-PEI-08: Risco de certificate/PFX no-read parecer certificado validado em produção.',
      'R-PEI-09: Risco de fiscal payload no-read parecer payload fiscal processado.',
      'R-PEI-10: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PEI-11: Risco de automação externa ignorar approvedForRealSefazCall=false.',
      'R-PEI-12: Risco de testes temporários permanecerem no repositório.',
      'R-PEI-13: Risco de namespace/export colidir com domínios anteriores.',
      'R-PEI-14: Risco de diretoria interpretar integration blueprint como integração produtiva liberada.'
    ];
  }
}

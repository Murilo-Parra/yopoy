export class FiscalProductionAuthorizationRequestRiskRegister {
  public static getRisks() {
    return [
      'R-PAR-01: Risco de intake ser interpretado como abertura real de autorização.',
      'R-PAR-02: Risco de submission envelope ser confundido com envio real a stakeholders.',
      'R-PAR-03: Risco de stakeholder matrix ser usada como lista real de notificação.',
      'R-PAR-04: Risco de eligibility checklist ser tratada como autorização final.',
      'R-PAR-05: Risco de no-notification evidence ser ignorada por automações externas.',
      'R-PAR-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PAR-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}

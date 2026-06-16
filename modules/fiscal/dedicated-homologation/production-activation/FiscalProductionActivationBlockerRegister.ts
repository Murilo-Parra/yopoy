export class FiscalProductionActivationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PAB-01: Produção V2 real bloqueada.',
      'B-PAB-02: Tráfego real inalterado.',
      'B-PAB-03: Canary real bloqueado.',
      'B-PAB-04: Release real bloqueado.',
      'B-PAB-05: Gate unlock real bloqueado.',
      'B-PAB-06: Autorização real bloqueada.',
      'B-PAB-07: Ledger/trilha legal real bloqueados.',
      'B-PAB-08: DDL/DML real bloqueado.',
      'B-PAB-09: Banco real desconectado.',
      'B-PAB-10: SEFAZ real bloqueada.',
      'B-PAB-11: Certificado/XML/PDF reais bloqueados.',
      'B-PAB-12: Worker/scheduler real bloqueado.'
    ];
  }
}

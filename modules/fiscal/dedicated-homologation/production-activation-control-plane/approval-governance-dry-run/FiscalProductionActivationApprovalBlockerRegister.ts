export class FiscalProductionActivationApprovalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PAAG-01: Aprovação real bloqueada.',
      'B-PAAG-02: Approval record real bloqueado.',
      'B-PAAG-03: Autorização real bloqueada.',
      'B-PAAG-04: Token real de autorização bloqueado.',
      'B-PAAG-05: Gate real bloqueado.',
      'B-PAAG-06: Ativação real de produção bloqueada.',
      'B-PAAG-07: Produção V2 e routeToV2 bloqueados.',
      'B-PAAG-08: Legado obrigatório preservado.',
      'B-PAAG-09: Tráfego real inalterável.',
      'B-PAAG-10: Cutover/go-live/rollout/rollback/canary reais bloqueados.',
      'B-PAAG-11: Risco real e waiver real bloqueados.',
      'B-PAAG-12: Notificações reais bloqueadas.',
      'B-PAAG-13: Runtime/queue/job/worker reais bloqueados.',
      'B-PAAG-14: Command runner/shell reais bloqueados.',
      'B-PAAG-15: Banco/DDL/DML/SEFAZ reais bloqueados.',
      'B-PAAG-16: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PAAG-17: Crypto/XML/PDF reais bloqueados.',
      'B-PAAG-18: Payload e dados sensíveis bloqueados.'
    ];
  }
}

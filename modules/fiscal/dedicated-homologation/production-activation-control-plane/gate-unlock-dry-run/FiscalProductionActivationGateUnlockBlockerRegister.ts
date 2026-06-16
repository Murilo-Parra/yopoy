export class FiscalProductionActivationGateUnlockBlockerRegister {
  public static getBlockers() {
    return [
      'B-PAGU-01: Gate real bloqueado.',
      'B-PAGU-02: Autorização real bloqueada.',
      'B-PAGU-03: Token real de autorização bloqueado.',
      'B-PAGU-04: Ativação real de produção bloqueada.',
      'B-PAGU-05: Produção V2 e routeToV2 bloqueados.',
      'B-PAGU-06: Legado obrigatório preservado.',
      'B-PAGU-07: Tráfego real inalterável.',
      'B-PAGU-08: Cutover/go-live/rollout/rollback/canary reais bloqueados.',
      'B-PAGU-09: Runtime/queue/job/worker reais bloqueados.',
      'B-PAGU-10: Command runner/shell reais bloqueados.',
      'B-PAGU-11: Banco/DDL/DML reais bloqueados.',
      'B-PAGU-12: SEFAZ real bloqueada.',
      'B-PAGU-13: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PAGU-14: Crypto/XML/PDF reais bloqueados.',
      'B-PAGU-15: Notificações reais bloqueadas.',
      'B-PAGU-16: Payload e dados sensíveis bloqueados.'
    ];
  }
}

export class FiscalProductionActivationControlPlaneBlockerRegister {
  public static getBlockers() {
    return [
      'B-PACP-01: Ativação real de produção bloqueada.',
      'B-PACP-02: Gate real bloqueado.',
      'B-PACP-03: Autorização real bloqueada.',
      'B-PACP-04: Token real de autorização bloqueado.',
      'B-PACP-05: Produção V2 e routeToV2 bloqueados.',
      'B-PACP-06: Legado obrigatório preservado.',
      'B-PACP-07: Tráfego real inalterável.',
      'B-PACP-08: Cutover/go-live/rollout/rollback/canary reais bloqueados.',
      'B-PACP-09: Runtime/queue/job/worker reais bloqueados.',
      'B-PACP-10: Command runner/shell reais bloqueados.',
      'B-PACP-11: Banco/DDL/DML reais bloqueados.',
      'B-PACP-12: SEFAZ real bloqueada.',
      'B-PACP-13: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PACP-14: Crypto/XML/PDF reais bloqueados.',
      'B-PACP-15: Notificações reais bloqueadas.',
      'B-PACP-16: Payload e dados sensíveis bloqueados.'
    ];
  }
}

export class FiscalProductionCanaryRampBlockerRegister {
  public static getBlockers() {
    return [
      'B-PACR-01: Canary real bloqueado.',
      'B-PACR-02: Promoção real de tráfego bloqueada.',
      'B-PACR-03: Traffic slice real bloqueado.',
      'B-PACR-04: Produção V2 e routeToV2 bloqueados.',
      'B-PACR-05: Legado obrigatório preservado.',
      'B-PACR-06: Tráfego real inalterável.',
      'B-PACR-07: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PACR-08: Captura/duplicação/mirror/shadow reais bloqueados.',
      'B-PACR-09: Cutover/go-live/rollout/rollback reais bloqueados.',
      'B-PACR-10: Gate real, autorização real e token real bloqueados.',
      'B-PACR-11: Runtime/queue/job/worker reais bloqueados.',
      'B-PACR-12: Command runner/shell reais bloqueados.',
      'B-PACR-13: Banco/DDL/DML reais bloqueados.',
      'B-PACR-14: SEFAZ real bloqueada.',
      'B-PACR-15: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PACR-16: Crypto/XML/PDF reais bloqueados.',
      'B-PACR-17: Notificações reais bloqueadas.',
      'B-PACR-18: Payload e dados sensíveis bloqueados.'
    ];
  }
}

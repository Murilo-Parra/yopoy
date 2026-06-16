export class FiscalProductionActivationFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PACF-01: Closure operacional real bloqueado.',
      'B-PACF-02: Ativação real de produção bloqueada.',
      'B-PACF-03: Gate real bloqueado.',
      'B-PACF-04: Autorização real e token real bloqueados.',
      'B-PACF-05: Produção V2 e routeToV2 bloqueados.',
      'B-PACF-06: Legado obrigatório preservado.',
      'B-PACF-07: Tráfego real e promoção real de tráfego bloqueados.',
      'B-PACF-08: Canary/cutover/go-live/rollout/rollback reais bloqueados.',
      'B-PACF-09: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PACF-10: Captura/duplicação/shadow/mirror reais bloqueados.',
      'B-PACF-11: Runtime/queue/job/worker reais bloqueados.',
      'B-PACF-12: Command runner/shell reais bloqueados.',
      'B-PACF-13: Banco/DDL/DML reais bloqueados.',
      'B-PACF-14: SEFAZ real bloqueada.',
      'B-PACF-15: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PACF-16: Crypto/XML/PDF reais bloqueados.',
      'B-PACF-17: Notificações reais bloqueadas.',
      'B-PACF-18: Payload e dados sensíveis bloqueados.'
    ];
  }
}

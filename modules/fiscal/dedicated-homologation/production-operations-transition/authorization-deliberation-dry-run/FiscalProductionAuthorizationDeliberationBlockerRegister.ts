export class FiscalProductionAuthorizationDeliberationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PAD-01: Autorização real bloqueada.',
      'B-PAD-02: Gate real bloqueado.',
      'B-PAD-03: Deliberação real bloqueada.',
      'B-PAD-04: Persistência real da deliberação bloqueada.',
      'B-PAD-05: Conversão de consentimento dry-run para autorização real bloqueada.',
      'B-PAD-06: Assinatura real bloqueada.',
      'B-PAD-07: Aprovação real de duas pessoas bloqueada.',
      'B-PAD-08: Aceite real de risco bloqueado.',
      'B-PAD-09: Waiver real bloqueado.',
      'B-PAD-10: Notificação real de aprovador bloqueada.',
      'B-PAD-11: Produção V2 bloqueada.',
      'B-PAD-12: routeToV2 bloqueado.',
      'B-PAD-13: Legado obrigatório preservado.',
      'B-PAD-14: Tráfego real inalterável.',
      'B-PAD-15: Deploy/release/cutover/rollback/canary/rollout reais bloqueados.',
      'B-PAD-16: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PAD-17: Runtime/queue/job/worker reais bloqueados.',
      'B-PAD-18: Command runner/shell reais bloqueados.',
      'B-PAD-19: Banco/DDL/DML reais bloqueados.',
      'B-PAD-20: SEFAZ real bloqueada.',
      'B-PAD-21: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PAD-22: XML/PDF reais bloqueados.',
      'B-PAD-23: Pacote/artefato executável real bloqueado.'
    ];
  }
}

export class FiscalProductionActivationConsentBlockerRegister {
  public static getBlockers() {
    return [
      'B-PAC-01: Autorização real bloqueada.',
      'B-PAC-02: Gate real bloqueado.',
      'B-PAC-03: Persistência real de consentimento bloqueada.',
      'B-PAC-04: Assinatura real bloqueada.',
      'B-PAC-05: Aprovação real de duas pessoas bloqueada.',
      'B-PAC-06: Notificação real de aprovador bloqueada.',
      'B-PAC-07: Produção V2 bloqueada.',
      'B-PAC-08: routeToV2 bloqueado.',
      'B-PAC-09: Legado obrigatório preservado.',
      'B-PAC-10: Tráfego real inalterável.',
      'B-PAC-11: Deploy/release/cutover/rollback/canary/rollout reais bloqueados.',
      'B-PAC-12: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PAC-13: Runtime/queue/job/worker reais bloqueados.',
      'B-PAC-14: Command runner/shell reais bloqueados.',
      'B-PAC-15: Banco/DDL/DML reais bloqueados.',
      'B-PAC-16: SEFAZ real bloqueada.',
      'B-PAC-17: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PAC-18: XML/PDF reais bloqueados.',
      'B-PAC-19: Pacote/artefato executável real bloqueado.'
    ];
  }
}

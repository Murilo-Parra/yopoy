export class FiscalProductionOperationsTransitionBlockerRegister {
  public static getBlockers() {
    return [
      'B-POT-01: Autorização real bloqueada.',
      'B-POT-02: Gate real bloqueado.',
      'B-POT-03: Produção V2 bloqueada.',
      'B-POT-04: routeToV2 bloqueado.',
      'B-POT-05: Legado obrigatório preservado.',
      'B-POT-06: Tráfego real inalterável.',
      'B-POT-07: Deploy/release/cutover/rollback/canary/rollout reais bloqueados.',
      'B-POT-08: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-POT-09: Runtime/queue/job/worker reais bloqueados.',
      'B-POT-10: Command runner/shell reais bloqueados.',
      'B-POT-11: Banco/DDL/DML reais bloqueados.',
      'B-POT-12: SEFAZ real bloqueada.',
      'B-POT-13: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-POT-14: XML/PDF reais bloqueados.',
      'B-POT-15: Notificação real bloqueada.',
      'B-POT-16: Pacote/artefato executável real bloqueado.'
    ];
  }
}

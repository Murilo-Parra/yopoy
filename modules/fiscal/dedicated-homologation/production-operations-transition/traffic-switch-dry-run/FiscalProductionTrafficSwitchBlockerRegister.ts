export class FiscalProductionTrafficSwitchBlockerRegister {
  public static getBlockers() {
    return [
      'B-PTS-01: Tráfego real bloqueado.',
      'B-PTS-02: routeToV2 bloqueado.',
      'B-PTS-03: Legado obrigatório preservado.',
      'B-PTS-04: Produção V2 bloqueada.',
      'B-PTS-05: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PTS-06: Shadow traffic real bloqueado.',
      'B-PTS-07: Captura de request/response/payload real bloqueada.',
      'B-PTS-08: Duplicação e espelhamento real bloqueados.',
      'B-PTS-09: Endpoint e handlers reais bloqueados.',
      'B-PTS-10: Go-live real bloqueado.',
      'B-PTS-11: Deploy/release/cutover/rollback/canary/rollout reais bloqueados.',
      'B-PTS-12: Autorização e gate real bloqueados.',
      'B-PTS-13: Runtime/queue/job/worker reais bloqueados.',
      'B-PTS-14: Command runner/shell reais bloqueados.',
      'B-PTS-15: Banco/DDL/DML reais bloqueados.',
      'B-PTS-16: SEFAZ real bloqueada.',
      'B-PTS-17: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PTS-18: XML/PDF reais bloqueados.',
      'B-PTS-19: Pacote/artefato executável real bloqueado.'
    ];
  }
}

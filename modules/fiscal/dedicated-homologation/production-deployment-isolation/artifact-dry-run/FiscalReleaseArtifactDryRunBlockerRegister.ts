export class FiscalReleaseArtifactDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-RAD-01: Artefato executável real bloqueado.',
      'B-RAD-02: Publicação real de pacote bloqueada.',
      'B-RAD-03: Release real bloqueado.',
      'B-RAD-04: Deploy real bloqueado.',
      'B-RAD-05: Rollout real bloqueado.',
      'B-RAD-06: Produção V2 bloqueada.',
      'B-RAD-07: routeToV2 bloqueado.',
      'B-RAD-08: Legado obrigatório preservado.',
      'B-RAD-09: Tráfego real inalterável neste módulo.',
      'B-RAD-10: Proxy/middleware/tap real bloqueados.',
      'B-RAD-11: app.use/router.use reais intocados.',
      'B-RAD-12: Handler legado e V2 real bloqueados.',
      'B-RAD-13: Captura de request/response/payload real bloqueada.',
      'B-RAD-14: Worker/scheduler real bloqueado.',
      'B-RAD-15: Gate unlock real bloqueado.',
      'B-RAD-16: Autorização real bloqueada.',
      'B-RAD-17: Banco/DDL/DML reais bloqueados.',
      'B-RAD-18: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}

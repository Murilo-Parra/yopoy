export class FiscalProductionCutoverApprovalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCA-01: Aprovação real de cutover bloqueada.',
      'B-PCA-02: Cutover real bloqueado.',
      'B-PCA-03: Rollback real bloqueado.',
      'B-PCA-04: Produção V2 bloqueada.',
      'B-PCA-05: Release real bloqueado.',
      'B-PCA-06: Deploy real bloqueado.',
      'B-PCA-07: Rollout real bloqueado.',
      'B-PCA-08: Publicação real de pacote bloqueada.',
      'B-PCA-09: Artefato executável real bloqueado.',
      'B-PCA-10: routeToV2 bloqueado.',
      'B-PCA-11: Legado obrigatório preservado.',
      'B-PCA-12: Tráfego real inalterável neste módulo.',
      'B-PCA-13: Proxy/middleware/tap real bloqueados.',
      'B-PCA-14: app.use/router.use reais intocados.',
      'B-PCA-15: Handler legado e V2 real bloqueados.',
      'B-PCA-16: Captura de request/response/payload real bloqueada.',
      'B-PCA-17: Worker/scheduler real bloqueado.',
      'B-PCA-18: Gate unlock real bloqueado.',
      'B-PCA-19: Autorização real bloqueada.',
      'B-PCA-20: Banco/DDL/DML reais bloqueados.',
      'B-PCA-21: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}

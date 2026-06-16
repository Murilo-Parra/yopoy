export class FiscalProductionEvidenceVaultGovernanceBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEVG-01: Criação de vault real bloqueada.',
      'B-PEVG-02: Persistência real de evidência bloqueada.',
      'B-PEVG-03: Persistência real de audit record bloqueada.',
      'B-PEVG-04: Escrita em filesystem bloqueada.',
      'B-PEVG-05: Escrita em banco real bloqueada.',
      'B-PEVG-06: Upload para storage externo bloqueado.',
      'B-PEVG-07: Exportação real de evidência bloqueada.',
      'B-PEVG-08: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PEVG-09: Crypto real e hash real de payload produtivo bloqueados.',
      'B-PEVG-10: SEFAZ real bloqueada.',
      'B-PEVG-11: Gate real, autorização real e token real bloqueados.',
      'B-PEVG-12: Produção V2 e routeToV2 bloqueados.',
      'B-PEVG-13: Legado obrigatório preservado.',
      'B-PEVG-14: Tráfego real bloqueado.',
      'B-PEVG-15: Notificações reais bloqueadas.',
      'B-PEVG-16: Payload e dados sensíveis bloqueados.',
      'B-PEVG-17: Namespace overlap com Domains 32/33/34 bloqueado por naming específico.'
    ];
  }
}

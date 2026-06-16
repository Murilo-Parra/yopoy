export class FiscalProductionEvidenceIntakeBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEI-01: Persistência real de evidência bloqueada.',
      'B-PEI-02: Persistência real de audit record bloqueada.',
      'B-PEI-03: Leitura de payload real bloqueada.',
      'B-PEI-04: Leitura de XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PEI-05: Escrita em filesystem bloqueada.',
      'B-PEI-06: Escrita em banco real bloqueada.',
      'B-PEI-07: Upload para storage externo bloqueado.',
      'B-PEI-08: Exportação real de evidência bloqueada.',
      'B-PEI-09: Crypto real e hash real bloqueados.',
      'B-PEI-10: Verificação real de autenticidade de origem bloqueada.',
      'B-PEI-11: Chain-of-custody persistente bloqueada.',
      'B-PEI-12: Registro real de retenção bloqueado.',
      'B-PEI-13: SEFAZ real bloqueada.',
      'B-PEI-14: Gate real, autorização real e token real bloqueados.',
      'B-PEI-15: Produção V2 e routeToV2 bloqueados.',
      'B-PEI-16: Legado obrigatório preservado.',
      'B-PEI-17: Tráfego real bloqueado.',
      'B-PEI-18: Notificações reais bloqueadas.',
      'B-PEI-19: Payload e dados sensíveis bloqueados.',
      'B-PEI-20: Namespace overlap com Domains 32/33/34/35.1 bloqueado por naming específico.'
    ];
  }
}

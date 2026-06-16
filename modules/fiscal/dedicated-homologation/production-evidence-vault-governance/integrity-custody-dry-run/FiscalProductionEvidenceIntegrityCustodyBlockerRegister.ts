export class FiscalProductionEvidenceIntegrityCustodyBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEIC-01: Hash real bloqueado.',
      'B-PEIC-02: Crypto real e prova criptográfica real bloqueadas.',
      'B-PEIC-03: Verificação real de assinatura bloqueada.',
      'B-PEIC-04: Assinatura XML e geração PDF reais bloqueadas.',
      'B-PEIC-05: Leitura de payload real bloqueada.',
      'B-PEIC-06: Leitura de XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PEIC-07: Persistência real de evidência bloqueada.',
      'B-PEIC-08: Persistência real de audit record bloqueada.',
      'B-PEIC-09: Chain-of-custody persistente bloqueada.',
      'B-PEIC-10: Integrity proof persistente bloqueado.',
      'B-PEIC-11: Tamper-check persistente bloqueado.',
      'B-PEIC-12: Completeness record persistente bloqueado.',
      'B-PEIC-13: Escrita em filesystem bloqueada.',
      'B-PEIC-14: Escrita em banco real bloqueada.',
      'B-PEIC-15: Upload para storage externo bloqueado.',
      'B-PEIC-16: Exportação real de evidência bloqueada.',
      'B-PEIC-17: Verificação real de autenticidade de origem bloqueada.',
      'B-PEIC-18: SEFAZ real bloqueada.',
      'B-PEIC-19: Gate real, autorização real e token real bloqueados.',
      'B-PEIC-20: Produção V2 e routeToV2 bloqueados.',
      'B-PEIC-21: Legado obrigatório preservado.',
      'B-PEIC-22: Tráfego real bloqueado.',
      'B-PEIC-23: Notificações reais bloqueadas.',
      'B-PEIC-24: Payload e dados sensíveis bloqueados.',
      'B-PEIC-25: Namespace overlap com Domains 32/33/34/35.1/35.2 bloqueado por naming específico.'
    ];
  }
}

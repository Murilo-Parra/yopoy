export class FiscalProductionEvidenceVaultFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEVC-01: Closure operacional real bloqueado.',
      'B-PEVC-02: Criação real de vault bloqueada.',
      'B-PEVC-03: Persistência real de evidência bloqueada.',
      'B-PEVC-04: Persistência real de audit record bloqueada.',
      'B-PEVC-05: Persistência real de disclosure record bloqueada.',
      'B-PEVC-06: Chain-of-custody persistente bloqueada.',
      'B-PEVC-07: Legal hold persistente bloqueado.',
      'B-PEVC-08: Escrita em filesystem bloqueada.',
      'B-PEVC-09: Escrita em banco real bloqueada.',
      'B-PEVC-10: Upload para storage externo bloqueado.',
      'B-PEVC-11: Exportação real de evidência bloqueada.',
      'B-PEVC-12: Pacote real de auditoria e arquivo real bloqueados.',
      'B-PEVC-13: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PEVC-14: Crypto real, hash real, prova criptográfica, assinatura XML e PDF real bloqueados.',
      'B-PEVC-15: Verificação real de autenticidade de origem bloqueada.',
      'B-PEVC-16: SEFAZ real bloqueada.',
      'B-PEVC-17: Gate real, autorização real e token real bloqueados.',
      'B-PEVC-18: Produção V2 e routeToV2 bloqueados.',
      'B-PEVC-19: Legado obrigatório preservado.',
      'B-PEVC-20: Tráfego real bloqueado.',
      'B-PEVC-21: Notificações reais bloqueadas.',
      'B-PEVC-22: Payload e dados sensíveis bloqueados.',
      'B-PEVC-23: Namespace overlap com Domains 32/33/34/35.1/35.2/35.3/35.4 bloqueado por naming específico.'
    ];
  }
}

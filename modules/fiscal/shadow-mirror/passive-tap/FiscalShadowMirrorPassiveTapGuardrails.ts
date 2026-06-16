export class FiscalShadowMirrorPassiveTapGuardrails {
  public static getChecklist(): string[] {
    return [
      '1. app.use legado não pode ser alterado.',
      '2. middleware produtivo não pode ser criado.',
      '3. request real não pode ser capturado.',
      '4. response real não pode ser capturado.',
      '5. handler legado não pode ser chamado.',
      '6. handler V2 operacional não pode ser chamado.',
      '7. SEFAZ não pode ser acionado.',
      '8. XML não pode ser assinado.',
      '9. PDF não pode ser gerado.',
      '10. worker não pode ser criado.',
      '11. cron/setInterval/queue.process não pode existir.',
      '12. routeToV2 deve permanecer false.',
      '13. routeToLegacy deve permanecer true.',
      '14. installableNow deve permanecer false.',
      '15. installed deve permanecer false.',
      '16. active deve permanecer false.',
      '17. approvedForRealCanary deve permanecer false.',
      '18. approvedForProductionV2 deve permanecer false.'
    ];
  }
}

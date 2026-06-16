export class FiscalSafeShapeMiddlewareGuardrails {
  public static getChecklist(): string[] {
    return [
      '1. app.use legado não pode ser alterado.',
      '2. middleware produtivo não pode ser criado.',
      '3. middlewareInstalled deve permanecer false.',
      '4. middlewareActive deve permanecer false.',
      '5. request real não pode ser capturado.',
      '6. response real não pode ser capturado.',
      '7. body real não pode ser lido.',
      '8. response real não pode ser lida.',
      '9. handler legado não pode ser chamado.',
      '10. handler V2 operacional não pode ser chamado.',
      '11. SEFAZ não pode ser acionado.',
      '12. XML não pode ser assinado.',
      '13. PDF não pode ser gerado.',
      '14. worker não pode ser criado.',
      '15. cron/setInterval/queue.process não pode existir.',
      '16. routeToV2 deve permanecer false.',
      '17. routeToLegacy deve permanecer true.',
      '18. installableNow deve permanecer false.',
      '19. approvedForRealCanary deve permanecer false.',
      '20. approvedForProductionV2 deve permanecer false.'
    ];
  }
}

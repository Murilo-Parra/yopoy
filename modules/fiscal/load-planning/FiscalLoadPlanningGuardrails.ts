export class FiscalLoadPlanningGuardrails {
  public static getChecklist(): string[] {
    return [
      '1. Load test real não pode ser executado.',
      '2. Endpoint real não pode ser chamado.',
      '3. Handler legado não pode ser chamado.',
      '4. Handler V2 operacional não pode ser chamado.',
      '5. app.use legado não pode ser alterado.',
      '6. Middleware real não pode ser instalado.',
      '7. Tap real não pode ser instalado.',
      '8. SEFAZ não pode ser acionado.',
      '9. XML não pode ser assinado.',
      '10. PDF não pode ser gerado.',
      '11. Worker não pode ser criado.',
      '12. cron/setInterval/queue.process não pode existir.',
      '13. INSERT/UPDATE/DELETE fiscal real não pode existir.',
      '14. routeToV2 deve permanecer false.',
      '15. routeToLegacy deve permanecer true.',
      '16. loadExecuted deve permanecer false.',
      '17. approvedForRealLoadTest deve permanecer false.',
      '18. approvedForRealCanary deve permanecer false.',
      '19. approvedForProductionV2 deve permanecer false.',
      '20. payloadIncluded deve permanecer false.',
      '21. sensitiveDataIncluded deve permanecer false.'
    ];
  }
}

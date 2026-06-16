export class FiscalSafeShapeMiddlewarePlanService {
  public static getPlan() {
    return {
      generatedAt: new Date().toISOString(),
      requiredBeforeMiddleware: [
        'testes sintéticos.',
        'validação manual de envelopes.',
        'evolução de safe-shape.',
        'documentação de rollback.',
        'desenho de middleware futuro sem instalação.'
      ],
      forbiddenActions: [
        'instalar middleware.',
        'alterar app.use.',
        'capturar request/response real.',
        'ler body real.',
        'chamar handlers.',
        'rotear para V2.',
        'SEFAZ/XML/PDF.'
      ],
      middlewareInstalled: false,
      middlewareActive: false,
      installableNow: false,
      designOnly: true,
      planningOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}

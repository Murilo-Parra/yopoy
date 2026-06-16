export class FiscalDay2AssistedSessionNoOpPlan {
  public static getPlan() {
    return {
      assistedSessionNoOpPlanGenerated: true,
      realAssistedSessionOpened: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      description: 'Modelagem de sessão assistida como no-op. Não abre sessão real. Não captura request/response/payload.'
    };
  }
}

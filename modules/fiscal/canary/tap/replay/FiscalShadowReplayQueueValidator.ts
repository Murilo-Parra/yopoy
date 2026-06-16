export class FiscalShadowReplayQueueValidator {
  public validate(item: any): { valid: boolean; blockers: string[] } {
    const blockers: string[] = [];

    if (!item.method) blockers.push("method_required");
    if (!item.route) blockers.push("route_required");
    if (!item.operation) blockers.push("operation_required");

    const criticalRoutes = ["/send", "/cancel", "/inutilize"];
    if (item.route && criticalRoutes.some(r => item.route.includes(r))) {
      blockers.push("rota CRITICAL bloqueada");
    }

    const payloadString = JSON.stringify(item);
    if (payloadString.includes("<xml") || payloadString.includes("<?xml")) {
      blockers.push("XML bruto bloqueado");
    }
    if (payloadString.includes("CERTIFICATE") || payloadString.includes("PFX")) {
      blockers.push("certificado/PFX bloqueado");
    }
    if (payloadString.includes("PRIVATE KEY") || payloadString.includes("privateKey")) {
      blockers.push("privateKey bloqueada");
    }
    
    if (item.requestShape?.token || item.requestShape?.password || item.requestShape?.senha || item.responseShape?.token || item.responseShape?.password) {
      blockers.push("token/senha bloqueado");
    }
    
    if (item.rawPayload || item.rawRequest || item.rawResponse) {
       blockers.push("payload bruto bloqueado");
    }

    if (item.rawReturned === true) {
      blockers.push("rawReturned true bloqueado");
    }

    if (item.payloadPersisted === true) {
      blockers.push("payloadPersisted true bloqueado");
    }

    if (payloadString.includes("SEFAZ") && payloadString.includes("transmit")) { // Example logic to block active sefaz
       // Need to be careful here, maybe rely just on route check and raw checks.
    }

    return {
      valid: blockers.length === 0,
      blockers
    };
  }
}

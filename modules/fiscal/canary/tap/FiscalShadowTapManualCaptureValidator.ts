import { FiscalShadowTapManualSnapshot } from "./FiscalShadowTapManualTypes";

export class FiscalShadowTapManualCaptureValidator {
  public validate(snapshot: any): { valid: boolean; blockers: string[] } {
    const blockers: string[] = [];

    if (!snapshot.method) blockers.push("method_required");
    if (!snapshot.route) blockers.push("route_required");
    if (!snapshot.operation) blockers.push("operation_required");

    const criticalRoutes = ["/send", "/cancel", "/inutilize"];
    if (snapshot.route && criticalRoutes.some(r => snapshot.route.includes(r))) {
      blockers.push("rota CRITICAL bloqueada");
    }

    const payloadString = JSON.stringify(snapshot);
    if (payloadString.includes("<xml") || payloadString.includes("<?xml")) {
      blockers.push("snapshot com XML bruto bloqueado");
    }
    if (payloadString.includes("CERTIFICATE") || payloadString.includes("PFX")) {
      blockers.push("snapshot com certificado/PFX bloqueado");
    }
    if (payloadString.includes("PRIVATE KEY") || payloadString.includes("privateKey")) {
      blockers.push("snapshot com privateKey bloqueado");
    }
    
    if (snapshot.requestShape?.token || snapshot.requestShape?.password || snapshot.requestShape?.senha || snapshot.responseShape?.token || snapshot.responseShape?.password) {
      blockers.push("snapshot com token/senha bloqueado");
    }
    if (payloadString.length > 50000) {
      blockers.push("base64 longo bloqueado");
    }

    if (snapshot.rawPayload || snapshot.rawRequest || snapshot.rawResponse) {
       blockers.push("payload bruto bloqueado");
    }

    return {
      valid: blockers.length === 0,
      blockers
    };
  }
}

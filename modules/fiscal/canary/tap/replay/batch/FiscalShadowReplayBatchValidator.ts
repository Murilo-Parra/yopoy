import { FiscalShadowReplayItem } from "../FiscalShadowReplayTypes";
import { FiscalShadowReplayBatchRequest } from "./FiscalShadowReplayBatchTypes";

export class FiscalShadowReplayBatchValidator {
  public validate(request: FiscalShadowReplayBatchRequest, availableItems: FiscalShadowReplayItem[]): { valid: boolean; blockers: string[], validItems: FiscalShadowReplayItem[] } {
    const blockers: string[] = [];
    const validItems: FiscalShadowReplayItem[] = [];

    if (!request.itemIds || request.itemIds.length === 0) {
      blockers.push("Batch vazio bloqueado");
      return { valid: false, blockers, validItems };
    }

    const uniqueIds = new Set(request.itemIds);
    if (uniqueIds.size !== request.itemIds.length) {
      blockers.push("Itens duplicados bloqueados");
    }

    const maxItems = Math.min(request.maxItems || 10, 25);
    if (uniqueIds.size > maxItems) {
      blockers.push("Tamanho do lote excede o limite máximo permitido (25)");
    }

    for (const itemId of Array.from(uniqueIds).slice(0, maxItems)) {
      const item = availableItems.find(i => i.id === itemId);
      if (!item) {
        blockers.push(`Item não encontrado ou bloqueado: ${itemId}`);
        continue;
      }

      const itemString = JSON.stringify(item);
      if (itemString.includes("<xml") || itemString.includes("<?xml")) {
        blockers.push(`Item ${itemId} com XML bruto bloqueado`);
        continue;
      }
      if (itemString.includes("CERTIFICATE") || itemString.includes("PFX")) {
        blockers.push(`Item ${itemId} com certificado/PFX bloqueado`);
        continue;
      }
      if (itemString.includes("PRIVATE KEY") || itemString.includes("privateKey")) {
        blockers.push(`Item ${itemId} com privateKey bloqueada`);
        continue;
      }

      const criticalRoutes = ["/send", "/cancel", "/inutilize"];
      if (item.route && criticalRoutes.some(r => item.route.includes(r))) {
        blockers.push(`Item ${itemId} CRITICAL route bloqueado`);
        continue;
      }
      
      if (item.rawReturned || item.payloadPersisted) {
        blockers.push(`Item ${itemId} com payload bruto ou persistido bloqueado`);
        continue;
      }

      validItems.push(item);
    }

    return {
      valid: blockers.length === 0,
      blockers,
      validItems
    };
  }
}

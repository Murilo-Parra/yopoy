import { FiscalShadowMirrorRouteCatalog } from '../FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorRouteRisk } from '../FiscalShadowMirrorTypes';

export class FiscalShadowMirrorTelemetryPolicy {
  public static evaluate(input: any): { allowed: boolean; status: string; blockers: string[] } {
    const blockers: string[] = [];
    let status = 'EVENT_ACCEPTED_SYNTHETIC';

    const route = FiscalShadowMirrorRouteCatalog.getRouteById(input.routeId);
    if (!route) {
        blockers.push('Route not found in catalog');
    } else if (route.risk === FiscalShadowMirrorRouteRisk.CRITICAL && !input.eventType.includes('BLOCKED') && !input.eventType.includes('EVALUATED')) {
        blockers.push('CRITICAL route synthetic events can only simulate blocking or evaluation');
    }

    if (input.metadata?.isRealTraffic || input.metadata?.realTraffic) {
        blockers.push('Real traffic events are not allowed in telemetry pipeline design');
    }
    
    if (input.payload || input.raw) {
        blockers.push('Raw payloads are not allowed');
    }

    const checkSensitive = (obj: any) => {
        if (!obj) return false;
        const str = JSON.stringify(obj).toLowerCase();
        return ['token', 'password', 'privatekey', 'certificate', '<?xml', 'base64'].some(k => str.includes(k));
    };

    if (checkSensitive(input)) {
        blockers.push('Sensitive data detected in synthetic event');
    }

    if (blockers.length > 0) {
        status = 'EVENT_BLOCKED';
        if (blockers.some(b => b.includes('Real traffic'))) status = 'BLOCKED_BY_REAL_TRAFFIC_ATTEMPT';
        else if (blockers.some(b => b.includes('Sensitive'))) status = 'BLOCKED_BY_SENSITIVE_INPUT';
    }

    return {
        allowed: blockers.length === 0,
        status,
        blockers
    };
  }
}

import { FiscalProductionLoadBalancerDnsInput } from './FiscalProductionLoadBalancerDnsTypes';

export class FiscalProductionLoadBalancerDnsValidator {
  public static validate(input: FiscalProductionLoadBalancerDnsInput): string[] {
    const errors: string[] = [];
    if (input.forceChangeRealDns) errors.push('forceChangeRealDns is not allowed');
    if (input.forceSwitchRealLoadBalancer) errors.push('forceSwitchRealLoadBalancer is not allowed');
    if (input.forceMutateRealGateway) errors.push('forceMutateRealGateway is not allowed');
    if (input.forceWriteRealNetworkRecord) errors.push('forceWriteRealNetworkRecord is not allowed');
    if (input.forceChangeRealTraffic) errors.push('forceChangeRealTraffic is not allowed');
    if (input.forceRouteToV2) errors.push('forceRouteToV2 is not allowed');
    if (input.forceActivateProductionV2) errors.push('forceActivateProductionV2 is not allowed');
    if (input.forceDisableLegacyRoute) errors.push('forceDisableLegacyRoute is not allowed');
    if (input.forceInstallRealProxy) errors.push('forceInstallRealProxy is not allowed');
    if (input.forceConnectRealDatabase) errors.push('forceConnectRealDatabase is not allowed');
    if (input.forceExecuteDml) errors.push('forceExecuteDml is not allowed');
    if (input.forceCallRealSefaz) errors.push('forceCallRealSefaz is not allowed');
    if (input.forceReadRealPayload) errors.push('forceReadRealPayload is not allowed');
    return errors;
  }
}

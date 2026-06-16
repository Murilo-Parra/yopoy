import {
  FiscalProductionLoadBalancerDnsInput,
  FiscalProductionLoadBalancerDnsResult,
  FiscalProductionLoadBalancerDnsStatus
} from './FiscalProductionLoadBalancerDnsTypes';
import { FiscalProductionLoadBalancerDnsValidator } from './FiscalProductionLoadBalancerDnsValidator';
import { FiscalProductionLoadBalancerDnsEvaluationService } from './FiscalProductionLoadBalancerDnsEvaluationService';

export class FiscalProductionLoadBalancerDnsDecisionService {
  public static simulateDecision(input: FiscalProductionLoadBalancerDnsInput): FiscalProductionLoadBalancerDnsResult {
    const errors = FiscalProductionLoadBalancerDnsValidator.validate(input);
    const warnings = FiscalProductionLoadBalancerDnsEvaluationService.evaluate(input);
    
    const isBlocked = errors.length > 0;

    return {
      success: !isBlocked,
      status: isBlocked ? FiscalProductionLoadBalancerDnsStatus.BLOCKED_FOR_REAL_ROUTING_MUTATION : FiscalProductionLoadBalancerDnsStatus.LOAD_BALANCER_DNS_MAPPING_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      loadBalancerReadOnlyMappingBlueprintGenerated: true,
      dnsReadOnlyMappingBlueprintGenerated: true,
      loadBalancerNoSwitchEvidenceGenerated: true,
      dnsNoChangeEvidenceGenerated: true,
      routingTargetSimulationMatrixGenerated: true,
      legacyEndpointContinuityMatrixGenerated: true,
      v2EndpointNoActivationMatrixGenerated: true,
      gatewayNoMutationPlanGenerated: true,
      networkRecordNoWritePlanGenerated: true,
      dependencyMatrixGenerated: true,
      blockersGenerated: true,
      risksGenerated: true,
      go: false,
      noGo: true,
      blockers: errors,
      warnings,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      loadBalancerDnsMappingOnly: true,
      noLoadBalancerChange: true,
      noDnsChange: true,
      noRoutingExecution: true,
      legacyPreservationOnly: true,
      activationBlocked: true,
      realDnsChanged: false,
      realLoadBalancerSwitched: false,
      realGatewayMutated: false,
      realNetworkRecordWritten: false,
      realTrafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      productionV2Activated: false,
      realProxyInstalled: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      realSefazCalled: false,
      realPayloadRead: false
    };
  }
}

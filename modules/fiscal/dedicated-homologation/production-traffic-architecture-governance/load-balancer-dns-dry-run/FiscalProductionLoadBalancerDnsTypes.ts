export enum FiscalProductionLoadBalancerDnsStatus {
  LOAD_BALANCER_DNS_MAPPING_READY = 'LOAD_BALANCER_DNS_MAPPING_READY',
  BLOCKED_FOR_REAL_ROUTING_MUTATION = 'BLOCKED_FOR_REAL_ROUTING_MUTATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalProductionLoadBalancerDnsInput {
  companyId?: string;
  requestId?: string;
  forceChangeRealDns?: boolean;
  forceSwitchRealLoadBalancer?: boolean;
  forceMutateRealGateway?: boolean;
  forceWriteRealNetworkRecord?: boolean;
  forceChangeRealTraffic?: boolean;
  forceRouteToV2?: boolean;
  forceActivateProductionV2?: boolean;
  forceDisableLegacyRoute?: boolean;
  forceInstallRealProxy?: boolean;
  forceConnectRealDatabase?: boolean;
  forceExecuteDml?: boolean;
  forceCallRealSefaz?: boolean;
  forceReadRealPayload?: boolean;
}

export interface FiscalProductionLoadBalancerDnsResult {
  success: boolean;
  status: string;
  validationExecuted: boolean;
  evaluationExecuted: boolean;
  decisionSimulated: boolean;
  loadBalancerReadOnlyMappingBlueprintGenerated: boolean;
  dnsReadOnlyMappingBlueprintGenerated: boolean;
  loadBalancerNoSwitchEvidenceGenerated: boolean;
  dnsNoChangeEvidenceGenerated: boolean;
  routingTargetSimulationMatrixGenerated: boolean;
  legacyEndpointContinuityMatrixGenerated: boolean;
  v2EndpointNoActivationMatrixGenerated: boolean;
  gatewayNoMutationPlanGenerated: boolean;
  networkRecordNoWritePlanGenerated: boolean;
  dependencyMatrixGenerated: boolean;
  blockersGenerated: boolean;
  risksGenerated: boolean;
  go: boolean;
  noGo: boolean;
  blockers: string[];
  warnings: string[];
  readOnly: true;
  governanceOnly: true;
  simulationOnly: true;
  loadBalancerDnsMappingOnly: true;
  noLoadBalancerChange: true;
  noDnsChange: true;
  noRoutingExecution: true;
  legacyPreservationOnly: true;
  activationBlocked: true;
  realDnsChanged: false;
  realLoadBalancerSwitched: false;
  realGatewayMutated: false;
  realNetworkRecordWritten: false;
  realTrafficChanged: false;
  routeToV2: false;
  routeToLegacy: true;
  productionV2Activated: false;
  realProxyInstalled: false;
  realDatabaseConnected: false;
  dmlExecuted: false;
  realSefazCalled: false;
  realPayloadRead: false;
}

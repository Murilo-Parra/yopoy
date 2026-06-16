export enum FiscalShadowReplayQueueMode {
  INERT_MANUAL_ONLY = "INERT_MANUAL_ONLY",
  SIMULATION_ONLY = "SIMULATION_ONLY",
  BLOCKED = "BLOCKED"
}

export enum FiscalShadowReplayItemStatus {
  QUEUED = "QUEUED",
  VALIDATED = "VALIDATED",
  SIMULATED = "SIMULATED",
  SKIPPED = "SKIPPED",
  BLOCKED = "BLOCKED",
  FAILED_SAFE = "FAILED_SAFE"
}

export interface FiscalShadowReplayItem {
  id: string;
  method: string;
  route: string;
  operation: string;
  companyId?: string;
  userId?: string;
  requestShape?: any;
  responseShape?: any;
  v2Shape?: any;
  status: FiscalShadowReplayItemStatus;
  createdAt: string;
  updatedAt?: string;
  sanitized: boolean;
  payloadPersisted: boolean;
  rawReturned: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalShadowReplayEnqueueResult {
  enqueued: boolean;
  itemId?: string;
  status: FiscalShadowReplayItemStatus;
  sanitized: boolean;
  payloadPersisted: boolean;
  rawReturned: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  blockers: string[];
  warnings: string[];
}

export interface FiscalShadowReplaySimulationResult {
  itemId: string;
  simulated: boolean;
  captured: boolean;
  dispatched: boolean;
  routeToV2: boolean;
  routeToLegacy: boolean;
  legacyResponseOfficial: boolean;
  v2ResponseOfficial: boolean;
  comparison?: any;
  sanitized: boolean;
  payloadPersisted: boolean;
  rawReturned: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalShadowReplayReport {
  generatedAt: string;
  totalQueued: number;
  totalValidated: number;
  totalSimulated: number;
  totalSkipped: number;
  totalBlocked: number;
  totalFailedSafe: number;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

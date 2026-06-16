export enum FiscalShadowReplayBatchMode {
  MANUAL_ONLY = "MANUAL_ONLY",
  SIMULATION_ONLY = "SIMULATION_ONLY",
  BLOCKED = "BLOCKED"
}

export enum FiscalShadowReplayBatchStatus {
  CREATED = "CREATED",
  VALIDATED = "VALIDATED",
  SIMULATED = "SIMULATED",
  PARTIAL_FAILURE = "PARTIAL_FAILURE",
  BLOCKED = "BLOCKED",
  REVIEWED = "REVIEWED",
  FAILED_SAFE = "FAILED_SAFE"
}

export interface FiscalShadowReplayBatchRequest {
  itemIds: string[];
  reason: string;
  requestedBy?: string;
  maxItems?: number;
  dryRunOnly?: boolean;
}

export interface FiscalShadowReplayBatchItemResult {
  itemId: string;
  status: string;
  simulated: boolean;
  blocked: boolean;
  skipped: boolean;
  failedSafe: boolean;
  differenceCount?: number;
  severity?: string;
  blockers: string[];
  warnings: string[];
  payloadPersisted: boolean;
  rawReturned: boolean;
}

export interface FiscalShadowReplayBatchResult {
  batchId: string;
  status: FiscalShadowReplayBatchStatus;
  totalRequested: number;
  totalAccepted: number;
  totalSimulated: number;
  totalBlocked: number;
  totalFailedSafe: number;
  totalSkipped: number;
  results: FiscalShadowReplayBatchItemResult[];
  manualOnly: boolean;
  autoRun: boolean;
  workerCreated: boolean;
  captured: boolean;
  dispatched: boolean;
  routeToV2: boolean;
  routeToLegacy: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  payloadPersisted: boolean;
  rawReturned: boolean;
}

export interface FiscalShadowReplayBatchReport {
  generatedAt: string;
  totalBatches: number;
  totalItemsSimulated: number;
  totalBlocked: number;
  totalFailedSafe: number;
  totalReviewed: number;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

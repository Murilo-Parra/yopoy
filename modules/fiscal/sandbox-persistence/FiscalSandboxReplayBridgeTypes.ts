export enum FiscalSandboxReplayBridgeSource {
  MANUAL_CAPTURE = 'MANUAL_CAPTURE',
  REPLAY_QUEUE = 'REPLAY_QUEUE',
  REPLAY_BATCH = 'REPLAY_BATCH',
  REPLAY_GOVERNANCE = 'REPLAY_GOVERNANCE',
  REPLAY_METRICS = 'REPLAY_METRICS',
  ADMIN_TEST = 'ADMIN_TEST'
}

export enum FiscalSandboxReplayBridgeOperation {
  STORE_MANUAL_SNAPSHOT = 'STORE_MANUAL_SNAPSHOT',
  STORE_REPLAY_ITEM = 'STORE_REPLAY_ITEM',
  STORE_BATCH_RESULT = 'STORE_BATCH_RESULT',
  STORE_GOVERNANCE_SNAPSHOT = 'STORE_GOVERNANCE_SNAPSHOT',
  VALIDATE_ONLY = 'VALIDATE_ONLY'
}

export interface FiscalSandboxReplayBridgeResult {
  success: boolean;
  stored: boolean;
  sandboxRecordId?: string;
  source: string;
  operation: string;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  warnings?: string[];
  blockers?: string[];
}

export interface FiscalSandboxReplayBridgeReport {
  generatedAt: string;
  totalBridgeAttempts: number;
  totalStored: number;
  totalBlocked: number;
  totalFailedSafe: number;
  bySource: Record<string, number>;
  byOperation: Record<string, number>;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
}

export enum FiscalSandboxPersistenceMode {
  SANDBOX_ONLY = 'SANDBOX_ONLY',
  ADMIN_MANUAL_ONLY = 'ADMIN_MANUAL_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalSandboxSnapshotStatus {
  STORED = 'STORED',
  REVIEWED = 'REVIEWED',
  CLEANED = 'CLEANED',
  BLOCKED = 'BLOCKED',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalSandboxSnapshotSource {
  MANUAL_CAPTURE = 'MANUAL_CAPTURE',
  REPLAY_QUEUE = 'REPLAY_QUEUE',
  REPLAY_BATCH = 'REPLAY_BATCH',
  GOVERNANCE_EXPORT = 'GOVERNANCE_EXPORT',
  ADMIN_TEST = 'ADMIN_TEST'
}

export interface FiscalSandboxSnapshotRecord {
  id: string;
  companyId: string;
  userId?: string;
  source: FiscalSandboxSnapshotSource | string;
  route: string;
  operation: string;
  status: FiscalSandboxSnapshotStatus | string;
  safeShape: any;
  metadata: any;
  marker: 'fiscal-v2-sandbox-persistence';
  reviewedAt?: string;
  createdAt: string;
  expiresAt?: string;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}

export interface FiscalSandboxPersistenceResult {
  persisted: boolean;
  recordId?: string;
  status: FiscalSandboxSnapshotStatus | string;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  warnings?: string[];
  blockers?: string[];
}

export interface FiscalSandboxPersistenceReport {
  generatedAt: string;
  totalStored: number;
  totalReviewed: number;
  totalCleaned: number;
  totalBlocked: number;
  totalExpired: number;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  statusBySource?: Record<string, Record<string, number>>;
}

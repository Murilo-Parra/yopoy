export enum FiscalSafeShapeMode {
  DEFAULT_DENY = "DEFAULT_DENY",
  METADATA_ONLY = "METADATA_ONLY",
  STRUCTURE_ONLY = "STRUCTURE_ONLY"
}

export enum FiscalSafeFieldType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
  ENUM = "ENUM",
  ARRAY_LENGTH = "ARRAY_LENGTH",
  OBJECT_SHAPE = "OBJECT_SHAPE",
  NULLABLE = "NULLABLE",
  UNKNOWN_REDACTED = "UNKNOWN_REDACTED"
}

export interface FiscalSafeShapeField {
  path: string;
  type: FiscalSafeFieldType;
  allowed: boolean;
  description?: string;
  maxLength?: number;
  enumValues?: string[];
}

export interface FiscalSafeShapeContract {
  operation: string;
  route?: string;
  allowedFields: string[];
  blockedFields: string[];
  mode: FiscalSafeShapeMode;
  version: string;
  createdAt?: string;
}

export interface FiscalSafeSanitizedValue {
  path: string;
  type: string;
  included: boolean;
  redacted: boolean;
  reason: string;
}

export interface FiscalSafeShapeValidationResult {
  valid: boolean;
  sanitized: boolean;
  rejectedFields: string[];
  allowedFields: string[];
  warnings: string[];
  blockers: string[];
  payloadPersisted: boolean;
  rawReturned: boolean;
}

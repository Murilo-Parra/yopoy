import { 
  FiscalWriteGuardContext, 
  FiscalWriteGuardDecision, 
  FiscalWriteDryRunResult 
} from "../types/fiscalWrite.types";

export interface IFiscalWriteGuard {
  canWrite(context: FiscalWriteGuardContext): Promise<FiscalWriteGuardDecision>;
  assertCanWrite(context: FiscalWriteGuardContext): Promise<void>;
  dryRun(context: FiscalWriteGuardContext, payload: any): Promise<FiscalWriteDryRunResult>;
}

export interface IWorkerLockService {
  acquireLock(resourceKey: string, ttlSeconds: number): Promise<string | null>;
  releaseLock(lockId: string): Promise<boolean>;
  withLock<T>(resourceKey: string, ttlSeconds: number, callback: () => Promise<T>): Promise<T>;
}

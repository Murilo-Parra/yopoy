import { AsyncLocalStorage } from "async_hooks";
import { TenantStore } from "./tenant.types";

export const tenantContext = new AsyncLocalStorage<TenantStore>();

export function getTenantStore(): TenantStore | undefined {
  return tenantContext.getStore();
}

export function runWithTenant<T>(store: TenantStore, callback: () => T | Promise<T>): T | Promise<T> {
  return tenantContext.run(store, callback);
}

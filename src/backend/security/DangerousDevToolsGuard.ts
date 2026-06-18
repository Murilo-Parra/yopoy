export type DangerousDevToolRequest = {
  nodeEnv: string | undefined;
  enabledFlag: string | undefined;
  expectedToken: string | undefined;
  providedToken: string | undefined;
};

export function canRunFactoryReset(input: DangerousDevToolRequest): boolean {
  if (input.nodeEnv !== 'development' && input.nodeEnv !== 'test') {
    return false;
  }
  if (input.enabledFlag !== 'true') {
    return false;
  }
  if (!input.expectedToken) {
    return false;
  }
  if (!input.providedToken) {
    return false;
  }
  if (input.expectedToken !== input.providedToken) {
    return false;
  }
  return true;
}

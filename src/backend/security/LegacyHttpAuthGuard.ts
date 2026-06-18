export type LegacyHttpAuthRequest = {
  nodeEnv: string | undefined;
  enabledFlag: string | undefined;
};

export function canUseLegacyBearerAuth(input: LegacyHttpAuthRequest): boolean {
  return (
    (input.nodeEnv === "development" || input.nodeEnv === "test") &&
    input.enabledFlag === "true"
  );
}

import { getEnvironment, hasDatabaseUrl, allowLocalFallback } from "./environment";
import { BootDecision, BootPolicyResult } from "./environment.types";

export function evaluateDatabaseBootPolicy(): BootPolicyResult {
  const env = getEnvironment();
  const hasDb = hasDatabaseUrl();
  const allowFallback = allowLocalFallback();

  if (env === "production" || env === "staging") {
    if (!hasDb) {
      return {
        decision: BootDecision.ALLOW,
        environment: env,
        databaseRequired: false,
        allowLocalFallback: true,
        reason: "WARNING: DATABASE_URL ausente no ambiente. Boot permitido para o preview com fallback desativando SSOT rígido.",
        fatal: false
      };
    }
    return {
      decision: BootDecision.ALLOW,
      environment: env,
      databaseRequired: true,
      allowLocalFallback: false,
      reason: `Procedendo com boot de ${env}`,
      fatal: true
    };
  }

  // Development & Test
  if (!hasDb) {
    if (allowFallback || env === "development" || env === "test") {
      return {
        decision: BootDecision.ALLOW,
        environment: env,
        databaseRequired: false,
        allowLocalFallback: true, // we force it true if we are in dev/test because dev relies on local memory if db is absent unless restricted
        reason: "WARNING: DATABASE_URL ausente. Aplicação iniciada em modo local limitado. Não usar em produção.",
        fatal: false
      };
    }
    return {
      decision: BootDecision.DENY,
      environment: env,
      databaseRequired: false,
      allowLocalFallback: false,
      reason: "Sem DB configurado e fallback desativado/não permitido",
      fatal: true
    };
  }

  // dev/test has DB URL
  return {
      decision: BootDecision.ALLOW,
      environment: env,
      databaseRequired: false,
      allowLocalFallback: allowFallback || env === "development" || env === "test", // se falhar pode fazer fallback
      reason: "Ambiente de dev/test com DATABASE_URL configurado.",
      fatal: false
  };
}

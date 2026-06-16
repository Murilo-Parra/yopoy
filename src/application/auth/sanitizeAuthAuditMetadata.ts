/**
 * Sanitizes sensitive authentication metadata to prevent leaks in logs or audit databases.
 */
export function sanitizeAuthAuditMetadata(metadata: Record<string, any> | null | undefined): Record<string, any> {
  if (!metadata) return {};

  const clean = { ...metadata };
  const sensitiveKeys = [
    'password',
    'plainPassword',
    'adminPassword',
    'rawToken',
    'token',
    'sessionToken',
    'tokenHash',
    'sessionTokenHash',
    'passwordHash',
    'resetToken',
    'resetTokenHash',
  ];

  for (const key of Object.keys(clean)) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase() === sensitive.toLowerCase())) {
      delete clean[key];
    } else if (typeof clean[key] === 'object' && clean[key] !== null) {
      clean[key] = sanitizeAuthAuditMetadata(clean[key]);
    }
  }

  return clean;
}

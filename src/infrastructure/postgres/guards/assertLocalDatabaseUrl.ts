export function assertLocalDatabaseUrl(databaseUrl?: string) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required for local database connection');
  }

  try {
    const url = new URL(databaseUrl);

    // Block non-postgres protocols
    if (url.protocol !== 'postgres:' && url.protocol !== 'postgresql:') {
      throw new Error('REMOTE_DATABASE_URL_BLOCKED: Only postgres protocols are allowed');
    }

    const allowedHosts = ['localhost', '127.0.0.1', 'yopoy-postgres'];
    if (!allowedHosts.includes(url.hostname)) {
      throw new Error('REMOTE_DATABASE_URL_BLOCKED: Host must be localhost or internal docker host');
    }

    // Block SSL require which hints at remote database
    const sslMode = url.searchParams.get('sslmode');
    if (sslMode === 'require' || sslMode === 'verify-ca' || sslMode === 'verify-full') {
      throw new Error('REMOTE_DATABASE_URL_BLOCKED: SSL modes for remote DBs are explicitly blocked');
    }

    // Block common remote hosts substrings just in case
    const blockedDomains = ['supabase.co', 'amazonaws.com', 'railway.app', 'render.com', 'neon.tech'];
    if (blockedDomains.some(domain => url.hostname.includes(domain))) {
      throw new Error('REMOTE_DATABASE_URL_BLOCKED: Remote cloud database hosts are strictly forbidden');
    }
  } catch (err: any) {
    if (err.message.includes('REMOTE_DATABASE_URL_BLOCKED')) {
      throw err;
    }
    throw new Error('REMOTE_DATABASE_URL_BLOCKED: Invalid Database URL format');
  }
}

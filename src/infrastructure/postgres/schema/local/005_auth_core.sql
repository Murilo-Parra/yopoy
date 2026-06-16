-- LOCAL POSTGRESQL SANDBOX ONLY
-- DO NOT RUN AGAINST PRODUCTION
-- DO NOT RUN AGAINST SUPABASE CLOUD

-- 1. Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, user_id),
  CONSTRAINT chk_memberships_role CHECK (role IN ('owner', 'admin', 'employee', 'accountant', 'support'))
);

-- RLS for memberships
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS memberships_isolation ON memberships;
CREATE POLICY memberships_isolation ON memberships FOR ALL
USING (company_id::text = current_setting('app.current_company_id', true))
WITH CHECK (company_id::text = current_setting('app.current_company_id', true));


-- 2. Create auth_sessions table
CREATE TABLE IF NOT EXISTS auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NULL,
  ip_hash text NULL,
  user_agent_hash text NULL
);

-- RLS for auth_sessions
ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_sessions FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS auth_sessions_isolation ON auth_sessions;
CREATE POLICY auth_sessions_isolation ON auth_sessions FOR ALL
USING (company_id::text = current_setting('app.current_company_id', true))
WITH CHECK (company_id::text = current_setting('app.current_company_id', true));

CREATE INDEX IF NOT EXISTS idx_auth_sessions_company_id ON auth_sessions(company_id);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_user_id ON auth_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_token_hash ON auth_sessions(session_token_hash);


-- 3. Create auth_audit_logs table
CREATE TABLE IF NOT EXISTS auth_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  success boolean NOT NULL,
  reason text NULL,
  metadata_json jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chk_auth_audit_logs_event_type CHECK (event_type IN (
    'company_registered',
    'login_success',
    'login_failed',
    'logout',
    'session_expired',
    'session_revoked',
    'password_changed',
    'user_locked',
    'permission_denied'
  ))
);

-- RLS for auth_audit_logs
ALTER TABLE auth_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_audit_logs FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS auth_audit_logs_isolation ON auth_audit_logs;
CREATE POLICY auth_audit_logs_isolation ON auth_audit_logs FOR ALL
USING (company_id::text = current_setting('app.current_company_id', true))
WITH CHECK (company_id::text = current_setting('app.current_company_id', true));

CREATE INDEX IF NOT EXISTS idx_auth_audit_logs_company_id ON auth_audit_logs(company_id);
CREATE INDEX IF NOT EXISTS idx_auth_audit_logs_user_id ON auth_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_audit_logs_event_type ON auth_audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_auth_audit_logs_created_at ON auth_audit_logs(created_at);


-- 4. Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reset_token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS for password_reset_tokens
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS password_reset_tokens_isolation ON password_reset_tokens;
CREATE POLICY password_reset_tokens_isolation ON password_reset_tokens FOR ALL
USING (company_id::text = current_setting('app.current_company_id', true))
WITH CHECK (company_id::text = current_setting('app.current_company_id', true));

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_company_id ON password_reset_tokens(company_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token_hash ON password_reset_tokens(reset_token_hash);


-- 5. Alter table users to add security and dynamic details safely
ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name text NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash text NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified boolean NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS failed_login_attempts integer NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS locked_until timestamptz NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login timestamptz NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

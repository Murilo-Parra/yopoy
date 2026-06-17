-- LOCAL POSTGRESQL SANDBOX ONLY
-- DO NOT RUN AGAINST PRODUCTION
-- DO NOT RUN AGAINST SUPABASE CLOUD

-- Support custom per-membership permissions for future Admin Users module.
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS permissions text[] NOT NULL DEFAULT '{}';

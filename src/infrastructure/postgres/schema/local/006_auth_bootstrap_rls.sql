-- LOCAL POSTGRESQL SANDBOX ONLY
-- DO NOT RUN AGAINST PRODUCTION
-- DO NOT RUN AGAINST SUPABASE CLOUD

-- Ensure companies document is unique (where not null/empty)
CREATE UNIQUE INDEX IF NOT EXISTS idx_companies_document_unique ON companies(document) WHERE (document IS NOT NULL AND document <> '');

-- Ensure users email is unique per company (lower cased)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_company_email_unique ON users(company_id, lower(email));

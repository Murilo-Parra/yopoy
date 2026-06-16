-- LOCAL POSTGRESQL SANDBOX ONLY
-- DO NOT RUN AGAINST PRODUCTION
-- DO NOT RUN AGAINST SUPABASE CLOUD

-- 1. Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_capture_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE draft_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- 2. Force RLS
ALTER TABLE companies FORCE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE sales FORCE ROW LEVEL SECURITY;
ALTER TABLE payments FORCE ROW LEVEL SECURITY;
ALTER TABLE payment_links FORCE ROW LEVEL SECURITY;
ALTER TABLE audit_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE customers FORCE ROW LEVEL SECURITY;
ALTER TABLE products FORCE ROW LEVEL SECURITY;
ALTER TABLE services FORCE ROW LEVEL SECURITY;
ALTER TABLE sale_items FORCE ROW LEVEL SECURITY;
ALTER TABLE cash_sessions FORCE ROW LEVEL SECURITY;
ALTER TABLE cash_movements FORCE ROW LEVEL SECURITY;
ALTER TABLE expenses FORCE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries FORCE ROW LEVEL SECURITY;
ALTER TABLE pending_items FORCE ROW LEVEL SECURITY;
ALTER TABLE smart_capture_drafts FORCE ROW LEVEL SECURITY;
ALTER TABLE draft_invoices FORCE ROW LEVEL SECURITY;
ALTER TABLE attachments FORCE ROW LEVEL SECURITY;

-- 3. Create Policies
DROP POLICY IF EXISTS companies_isolation ON companies;
CREATE POLICY companies_isolation ON companies FOR ALL
USING (id::text = current_setting('app.current_company_id', true))
WITH CHECK (id::text = current_setting('app.current_company_id', true));

DO $$ 
DECLARE
  t text;
BEGIN
  FOR t IN 
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name IN (
        'users', 'sales', 'payments', 'payment_links', 'audit_logs', 'customers', 
        'products', 'services', 'sale_items', 'cash_sessions', 'cash_movements', 
        'expenses', 'ledger_entries', 'pending_items', 'smart_capture_drafts', 
        'draft_invoices', 'attachments'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %1$I_isolation ON %1$I', t);
    EXECUTE format('
      CREATE POLICY %1$I_isolation ON %1$I FOR ALL
      USING (company_id::text = current_setting(''app.current_company_id'', true))
      WITH CHECK (company_id::text = current_setting(''app.current_company_id'', true))
    ', t);
  END LOOP;
END $$;

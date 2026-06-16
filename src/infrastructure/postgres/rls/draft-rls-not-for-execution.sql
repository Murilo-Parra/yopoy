-- DRAFT ONLY — DO NOT RUN
-- ==========================================
-- PLANNING: Row Level Security Base
-- ==========================================

-- Exemplo Teórico da restrição aplicada à tabela base de Receitas

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_on_sales ON sales
FOR ALL
USING (
  company_id = current_setting('app.current_company_id', true)::uuid
)
WITH CHECK (
  company_id = current_setting('app.current_company_id', true)::uuid
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Exemplo apenas visualização, pois logs são Append Only e imutáveis.
CREATE POLICY tenant_isolation_on_audit_logs ON audit_logs
FOR SELECT
USING (
  company_id = current_setting('app.current_company_id', true)::uuid
);

CREATE POLICY append_only_on_audit_logs ON audit_logs
FOR INSERT
WITH CHECK (
  company_id = current_setting('app.current_company_id', true)::uuid
);

-- Nenhum For DELETE / UPDATE gerado. O PG nativo recusa updates.


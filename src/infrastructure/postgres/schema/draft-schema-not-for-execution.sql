-- DRAFT ONLY — DO NOT RUN
-- ==========================================
-- PLANNING: PostgreSQL Master Schema 47.3
-- ERP Yopoy - Fundação Relacional
-- ==========================================

-- Extensões Comuns
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabelas de Base
CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  document varchar,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role varchar NOT NULL,
  email varchar NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Financeiro / Base Mercantile
CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  customer_id uuid,
  status varchar NOT NULL,
  total_amount numeric(12,2) NOT NULL DEFAULT 0,
  currency char(3) NOT NULL DEFAULT 'BRL',
  created_by uuid NOT NULL REFERENCES users(id),
  updated_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  cancelled_at timestamptz,
  cancelled_by uuid,
  metadata jsonb
);

CREATE TABLE sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id uuid,
  service_id uuid,
  description varchar,
  quantity numeric(10,3) NOT NULL,
  unit_price numeric(12,2) NOT NULL,
  total_amount numeric(12,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  status varchar NOT NULL,
  amount numeric(12,2) NOT NULL,
  currency char(3) NOT NULL DEFAULT 'BRL',
  method varchar NOT NULL,
  paid_at timestamptz,
  source varchar,
  external_reference varchar,
  created_by uuid NOT NULL REFERENCES users(id),
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  metadata jsonb
);

CREATE TABLE payment_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  payment_id uuid NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  status varchar NOT NULL,
  linked_at timestamptz NOT NULL DEFAULT now(),
  linked_by uuid NOT NULL REFERENCES users(id),
  unlinked_at timestamptz,
  unlinked_by uuid,
  reason varchar,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

-- 3. Inteligência e Drafts (Módulo Frio)

CREATE TABLE smart_capture_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type varchar NOT NULL,
  status varchar NOT NULL,
  raw_text text,
  image_attachment_id uuid,
  recognized_fields jsonb,
  recognized_items jsonb,
  confidence numeric(5,2),
  reviewed_at timestamptz,
  reviewed_by uuid,
  converted_to_type varchar,
  converted_to_id uuid,
  created_by uuid NOT NULL REFERENCES users(id),
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  metadata jsonb
);

CREATE TABLE draft_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  status varchar NOT NULL,
  draft_number varchar,
  customer_snapshot jsonb,
  items_snapshot jsonb,
  total_amount numeric(12,2),
  ready_for_accountant_at timestamptz,
  ready_for_accountant_by uuid,
  created_by uuid NOT NULL REFERENCES users(id),
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  metadata jsonb
);

-- 4. Contabilidade & Backoffice (Event Tracing)

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id),
  action varchar NOT NULL,
  entity_type varchar NOT NULL,
  entity_id uuid NOT NULL,
  before_snapshot jsonb,
  after_snapshot jsonb,
  request_id uuid,
  ip_address varchar,
  user_agent varchar,
  created_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

CREATE TABLE ledger_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  source_type varchar NOT NULL,
  source_id uuid NOT NULL,
  direction varchar NOT NULL,
  amount numeric(12,2) NOT NULL,
  currency char(3) NOT NULL DEFAULT 'BRL',
  category varchar NOT NULL,
  description varchar,
  occurred_at timestamptz NOT NULL,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

CREATE TABLE pending_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type varchar NOT NULL,
  severity varchar NOT NULL,
  status varchar NOT NULL,
  title varchar NOT NULL,
  description text,
  source_type varchar,
  source_id uuid,
  assigned_to_user_id uuid,
  resolved_at timestamptz,
  resolved_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  metadata jsonb
);

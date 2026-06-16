# ERP Yopoy - Estratégia de Índices (Index Plan)

Sendo o Yopoy uma plataforma transacional com alto grau histórico e auditável, pesquisas sobre o mesmo usuário ou entre meses paralelos exigem performance otimizada, principalmente porque todas dependem da restrição `company_id` injetada via RLS. O Índice composto (Composite Index) liderando o `company_id` é o princípio básico desta modelagem.

## Indexes e Princípio de Localidade
Ao colocarmos `company_id` primeiro índice das tabelas pesadas (como `ledger_entries` e `audit_logs`), evitamos full table scans num ERP de múltiplos lojistas e agrupamos em disco/buffers as páginas correntes do banco para relatórios mais limpos. 

## Índices Básicos por Tabela Base:

### 1. `sales`
```sql
-- DRAFT ONLY — DO NOT RUN
CREATE INDEX idx_sales_company_created_at ON sales (company_id, created_at DESC);
CREATE INDEX idx_sales_company_status ON sales (company_id, status);
CREATE INDEX idx_sales_company_customer ON sales (company_id, customer_id);
```

### 2. `payments` e `payment_links`
```sql
-- DRAFT ONLY — DO NOT RUN
CREATE INDEX idx_payment_company_status ON payments (company_id, status);
-- Busca de pagamentos órfãos
CREATE INDEX idx_payment_company_method_date ON payments (company_id, method, paid_at DESC);

-- Conciliações rápidadas
CREATE INDEX idx_paylink_company_payment ON payment_links (company_id, payment_id);
CREATE INDEX idx_paylink_company_sale ON payment_links (company_id, sale_id);
```

### 3. `ledger_entries` e `audit_logs`
Sendo tabelas append-only massivas onde só ocorrem INSERTs de alta vazão, os Índices tornam Relatórios (DRE) não custosos se indexarmos eventos por tempo e empresa:
```sql
-- DRAFT ONLY — DO NOT RUN
CREATE INDEX idx_ledger_company_occurred ON ledger_entries (company_id, occurred_at DESC);
CREATE INDEX idx_ledger_company_source ON ledger_entries (company_id, source_type, source_id);

CREATE INDEX idx_audit_company_entity ON audit_logs (company_id, entity_type, entity_id);
CREATE INDEX idx_audit_company_created ON audit_logs (company_id, created_at DESC);
```

### 4. `pending_items`
Sendo que a central do Dia busca as Tasks de Backoffice do usuário ativo:
```sql
-- DRAFT ONLY — DO NOT RUN
CREATE INDEX idx_pending_company_status ON pending_items (company_id, status, type);
```

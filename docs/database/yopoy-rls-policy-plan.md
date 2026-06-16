# ERP Yopoy - Plano de Políticas Row Level Security (RLS)

O Supabase/PostgreSQL utiliza RLS para delegar a proteção das linhas (records) nativamente para a Camada do Banco de Dados. Isso serve como mecanismo Defesa-Em-Profundidade, garantindo que caso ocorra vazamento num Handler ou bug de Injeção em consultas no código Backend, um Tenant (Company) jamais acessará relatórios, tabelas de vendas ou auditorias das companhias concorrentes.

## Arquitetura Chave do RLS Multi-Tenant

Toda Tabela do core terá uma coluna `company_id`.
As policies dependem da configuração temporária `app.current_company_id` setada no Postgres, geralmente definida no momento em que a conexão do banco é aberta para tratar a Request HTTP (por isso nosso Unit of Work ou Middleware fará essa inserção nativa, tal qual usa-se em JWT do Postgrest, porém aplicável server-side).

## Policies Desenhadas (Draft - Planejamento Apenas)

```sql
-- DRAFT ONLY — DO NOT RUN 
-- Exemplo Prático para a tabela de Vendas gerais (sales)

-- 1. Habilitação de Força: Ativar proteção explícita (sem ela as queries são em bypass total na tabela).
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- 2. Regra universal de Visualização, Modificação e Deleção baseada em company_id.
CREATE POLICY tenant_isolation_policy ON sales
FOR ALL
USING (
   company_id = current_setting('app.current_company_id', true)::uuid
)
WITH CHECK (
   company_id = current_setting('app.current_company_id', true)::uuid
);

```

## Casos Excludentes - Admins (Root)
Em cenários onde Scripts Administrativos Internos precisem puxar métricas globais inter-tenant (para billing, analytics do serviço do ERP):
No Backend criaremos uma DB role ou daremos Bypass RLS se o JWT setado não possuir 'company_id', mas ao nível Frontend todas as conexões vão sob amarras. Service Role é **100% PROIBIDO** na superfície externa ou interfaces React.

## Lista de Aplicação de RLS Obrigatório:
- `customers`
- `products`
- `services`
- `sales`
- `sale_items`
- `payments`
- `payment_links`
- `cash_sessions`
- `cash_movements`
- `expenses`
- `attachments`
- `smart_capture_drafts`
- `draft_invoices`
- `ledger_entries`
- `pending_items`
- `audit_logs`
- `accountant_packages`

Qualquer tabela sem RLS dentro do módulo comercial constituirá quebra grave de conformidade e violação de dados.

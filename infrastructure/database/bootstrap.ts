import pg, { Pool } from "pg";
import * as pgPooler from "./pgPooler";

function resolvePostgresSsl(connectionString: string): false | { rejectUnauthorized: false } {
  try {
    const url = new URL(connectionString);
    const hostname = url.hostname.replace(/^\[|\]$/g, "");
    const localHosts = new Set(["localhost", "127.0.0.1", "::1", "yopoy-postgres"]);
    const sslDisabled = url.searchParams.get("sslmode")?.toLowerCase() === "disable";

    return localHosts.has(hostname) || sslDisabled
      ? false
      : { rejectUnauthorized: false };
  } catch {
    return { rejectUnauthorized: false };
  }
}

async function enableRowLevelSecurity(client: any): Promise<void> {
  console.log("🔒 Ativando Segurança em Nível de Linha (RLS) no PostgreSQL...");
  const multiTenantTables = [
    'users', 'products', 'employees', 'transactions', 'invoices', 'tasks',
    'audit_logs', 'certificates', 'fiscal_documents', 'signed_documents',
    'sefaz_protocols', 'nfe_documents', 'nfce_documents', 'danfe_documents',
    'fiscal_events', 'sefaz_event_queue', 'sefaz_event_logs', 'sefaz_distribution_documents',
    'nfse_settings', 'nfse_services', 'nfse_documents', 'nfse_issnet_logs',
    'nfse_webiss_logs', 'nfse_betha_logs', 'nfse_ipm_logs', 'nfse_dsf_logs',
    'nfse_simpliss_logs', 'custom_provider_logs', 'nfse_sigiss_logs', 'nfse_fiorilli_logs',
    'sessions', 'support_tickets', 'affiliate_commissions', 'canary_control_records',
    'fiscal_v2_sandbox_snapshots'
  ];

  for (const table of multiTenantTables) {
    try {
      await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
      await client.query(`ALTER TABLE ${table} FORCE ROW LEVEL SECURITY;`);
      await client.query(`DROP POLICY IF EXISTS tenant_isolation_policy ON ${table};`);
      await client.query(`
        CREATE POLICY tenant_isolation_policy ON ${table}
        FOR ALL
        USING (
          current_setting('app.bypass_rls', true) = 'true'
          OR company_id = current_setting('app.current_company_id', true)
        );
      `);
    } catch (err: any) {
      console.warn(`⚠️ Não foi possível configurar RLS para tabela ${table}:`, err.message);
    }
  }

  // Configuração especial para a tabela central de tenants: 'companies' (isolar pela coluna 'id')
  try {
    await client.query(`ALTER TABLE companies ENABLE ROW LEVEL SECURITY;`);
    await client.query(`ALTER TABLE companies FORCE ROW LEVEL SECURITY;`);
    await client.query(`DROP POLICY IF EXISTS tenant_isolation_policy ON companies;`);
    await client.query(`
      CREATE POLICY tenant_isolation_policy ON companies
      FOR ALL
      USING (
        current_setting('app.bypass_rls', true) = 'true'
        OR id = current_setting('app.current_company_id', true)
      );
    `);
  } catch (err: any) {
    console.warn(`⚠️ Não foi possível configurar RLS para tabela companies:`, err.message);
  }

  // Desativar RLS em tabelas globais (que não possuem isolamento por company_id) para evitar default-deny
  try {
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `);
    const allTables = res.rows.map((row: any) => row.table_name);
    for (const table of allTables) {
      if (!multiTenantTables.includes(table) && table !== 'companies') {
        try {
          await client.query(`ALTER TABLE ${table} DISABLE ROW LEVEL SECURITY;`);
        } catch (err: any) {
          // Ignore tables we can't alter
        }
      }
    }
  } catch (err: any) {
    console.warn("⚠️ Não foi possível desativar RLS nas tabelas globais:", err.message);
  }
}

async function verifyDatabaseGovernance(client: any): Promise<void> {
  console.log("🛡️ Iniciando Auditoria e Governança de Bancos SaaS Multi-Tenant...");
  
  // 1. Descobrir todas as tabelas fisicamente existentes no schema public
  const tablesRes = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  `);
  
  const tables = tablesRes.rows.map((r: any) => r.table_name);
  console.log(`🔎 Total de tabelas detectadas no banco de dados public: ${tables.length}`);
  
  // Para cada tabela, vamos verificar se ela possui a coluna 'company_id'
  const violations: string[] = [];
  
  for (const table of tables) {
    const tableNameLower = table.toLowerCase();
    if (
      tableNameLower === 'companies' || 
      tableNameLower === 'states' || 
      tableNameLower === 'municipalities' || 
      tableNameLower === 'municipal_providers' || 
      tableNameLower === 'admins' || 
      tableNameLower === 'affiliates' || 
      tableNameLower === 'system_logs' || 
      tableNameLower === 'password_resets' ||
      tableNameLower === 'elparrar' || 
      tableNameLower === 'global_sync' || 
      tableNameLower === 'user_sync' || 
      tableNameLower === 'nfse_municipalities' || 
      tableNameLower === 'custom_nfse_providers' || 
      tableNameLower === 'custom_provider_mappings' || 
      tableNameLower === 'custom_provider_templates'
    ) {
      // Essas tabelas são reconhecidamente globais, estáticas, ou administrativas-mestre
      continue;
    }
    
    // Verificar se possui a coluna company_id
    const colCheck = await client.query(`
      SELECT column_name, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1 AND column_name = 'company_id';
    `, [table]);
    
    const hasCompanyId = colCheck.rows.length > 0;
    
    if (hasCompanyId) {
      console.log(`📊 Validando conformidade multi-tenant corporativa para a tabela: [${table}]`);
      
      // A) Verificar RLS habilitada e FORCE RLS habilitada
      const rlsRes = await client.query(`
        SELECT relrowsecurity, relforcerowsecurity 
        FROM pg_class 
        WHERE relname = $1 AND relnamespace = 'public'::regnamespace;
      `, [table]);
      
      if (rlsRes.rows.length === 0) {
        violations.push(`Tabela ${table}: Não encontrada no catálogo pg_class.`);
        continue;
      }
      
      const { relrowsecurity, relforcerowsecurity } = rlsRes.rows[0];
      if (!relrowsecurity) {
        violations.push(`Tabela ${table}: ROW LEVEL SECURITY (RLS) NÃO está ativo!`);
      }
      if (!relforcerowsecurity) {
        violations.push(`Tabela ${table}: FORCE ROW LEVEL SECURITY NÃO está ativo!`);
      }
      
      // B) Verificar se há políticas RLS definidas
      const policyRes = await client.query(`
        SELECT COUNT(*) as count 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = $1;
      `, [table]);
      
      if (parseInt(policyRes.rows[0].count, 10) === 0) {
        violations.push(`Tabela ${table}: Nenhuma política de Row Level Security (RLS) definida!`);
      }
      
      // C) Verificar Chave Estrangeira (FK) apontando para a tabela 'companies(id)'
      const fkRes = await client.query(`
        SELECT COUNT(*) as count
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = $1
          AND kcu.column_name = 'company_id'
          AND ccu.table_name = 'companies'
          AND ccu.column_name = 'id';
      `, [table]);
      
      if (parseInt(fkRes.rows[0].count, 10) === 0) {
        violations.push(`Tabela ${table}: Chave estrangeira 'company_id REFERENCES companies(id)' ausente ou incorreta!`);
      }
      
      // D) Verificar se há um índice de desempenho cobrindo a coluna 'company_id'
      const idxRes = await client.query(`
        SELECT COUNT(*) as count
        FROM pg_class t
        JOIN pg_index ix ON t.oid = ix.indrelid
        JOIN pg_class i ON i.oid = ix.indexrelid
        JOIN pg_attribute a ON t.oid = a.attrelid AND a.attnum = ANY(ix.indkey)
        WHERE t.relkind = 'r'
          AND t.relname = $1
          AND a.attname = 'company_id';
      `, [table]);
      
      if (parseInt(idxRes.rows[0].count, 10) === 0) {
        violations.push(`Tabela ${table}: Índice de busca cobrindo 'company_id' ausente!`);
      }
    } else {
      // Se não possui company_id e não está listada como global/estática permitida, isso é um bypass potencial
      violations.push(`Tabela ${table}: Não possui a coluna 'company_id' e não foi explicitamente classificada como tabela global administrativa permitida!`);
    }
  }
  
  if (violations.length > 0) {
    console.error("🚨 FALHA CRÍTICA ENCONTRADA NA GOVERNANÇA DE BANCO:");
    for (const v of violations) {
      console.error(`  - ${v}`);
    }
    throw new Error(`❌ Bloqueio de Segurança: Tabelas em desconformidade: [${violations.join(" | ")}]`);
  }
  
  console.log("🛡️ CERTIFICAÇÃO CONCLUÍDA: Todas as tabelas corporativas estão 100% em conformidade com o isolamento multi-tenant PostgreSQL!");
}

export async function initializeDb(): Promise<void> {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!connectionString || connectionString.includes("username:password") || connectionString.includes("placeholder") || connectionString.includes("YOUR-PASSWORD")) {
    throw new Error("❌ DATABASE_URL não configurado ou utilizando credenciais provisórias. Banco de dados PostgreSQL é obrigatório.");
  }

  try {
    console.log("🔌 Tentando conectar ao PostgreSQL...");
    
    const ssl = resolvePostgresSsl(connectionString);
    const parsed = pgPooler.parseDatabaseUrl(connectionString);
    let success = false;

    if (parsed) {
      const activePort = parsed.port;
      let decodedPassword = parsed.password;
      try {
        decodedPassword = decodeURIComponent(parsed.password || "");
      } catch (e) {
        console.warn("⚠️ Não foi possível decodificar URL da senha, mantendo original.");
      }

      console.log(`🔌 Tentando se conectar ao Host: ${parsed.host} na Porta Primária: ${activePort}...`);
      
      const primaryConfig = {
        host: parsed.host,
        port: activePort,
        user: parsed.user,
        password: decodedPassword,
        database: parsed.database,
        ssl,
        connectionTimeoutMillis: 5050
      };

      const newPool = new Pool(primaryConfig);
      pgPooler.setPgPool(newPool);
      pgPooler.setupPgPoolWrapping(newPool);

      try {
        const client = await pgPooler.pgPool!.connect();
        console.log(`✅ Conexão primária na porta ${activePort} SUCEDIDA!`);
        client.release();
        success = true;
      } catch (err: any) {
        console.warn(`⚠️ Conexão de porta primária (${activePort}) falhou: ${err.message}`);
        await pgPooler.pgPool!.end();
        pgPooler.setPgPool(null);

        // Se for Supabase e falhou, tentar alternar entre 5432 <-> 6543
        if (parsed.host.endsWith("supabase.co")) {
          const altPort = activePort === 5432 ? 6543 : 5432;
          console.log(`🔄 Tentando alternar de forma resiliente para porta secundária de fallback: ${altPort}...`);
          
          const altConfig = {
            host: parsed.host,
            port: altPort,
            user: parsed.user,
            password: decodedPassword,
            database: parsed.database,
            ssl,
            connectionTimeoutMillis: 5050
          };

          const altPool = new Pool(altConfig);
          pgPooler.setPgPool(altPool);
          pgPooler.setupPgPoolWrapping(altPool);
          try {
            const client = await pgPooler.pgPool!.connect();
            console.log(`✅ Conexão resiliente na porta secundária ${altPort} SUCEDIDA!`);
            client.release();
            success = true;
          } catch (altErr: any) {
            console.error(`❌ Ambas as portas falharam na conexão ao PostgreSQL.`);
            await pgPooler.pgPool!.end();
            pgPooler.setPgPool(null);
            throw altErr;
          }
        } else {
          throw err;
        }
      }
    } else {
      // Fallback para poolConfig simples usando connectionString direta
      const simpleConfig = {
        connectionString,
        ssl,
        connectionTimeoutMillis: 5050
      };
      const simplePool = new Pool(simpleConfig);
      pgPooler.setPgPool(simplePool);
      pgPooler.setupPgPoolWrapping(simplePool);
      const client = await pgPooler.pgPool!.connect();
      client.release();
      success = true;
    }

    if (!success || !pgPooler.pgPool) {
      throw new Error("Erro desconhecido na conectividade do pool Postgres.");
    }

    console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso!");
    
    // Obter um cliente ativo do pool de forma resiliente para DDL e sincronizações
    const client = await pgPooler.pgPool.connect();
    
    // --- NOVA MODELAGEM RELACIONAL PROFISSIONAL SAAS MULTI-TENANT ---
    console.log("🛠️ Inicializando estrutura relacional no PostgreSQL...");

    // 1. Tabela de Empresas (Tenants)
    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id VARCHAR(255) PRIMARY KEY,
        corporate_name VARCHAR(255),
        trade_name VARCHAR(255),
        cnpj VARCHAR(50),
        tax_regime VARCHAR(100) DEFAULT 'Simples Nacional',
        tax_rate DECIMAL(10, 2) DEFAULT 4.5,
        expiring_warning_days INT DEFAULT 7,
        min_stock_limit INT DEFAULT 10,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de UFs / Estados
    await client.query(`
      CREATE TABLE IF NOT EXISTS states (
        id SERIAL PRIMARY KEY,
        uf VARCHAR(10) UNIQUE NOT NULL,
        nome_estado VARCHAR(100) NOT NULL,
        codigo_ibge_estado VARCHAR(10) NOT NULL,
        sefaz_responsavel VARCHAR(100) NOT NULL,
        ativo BOOLEAN DEFAULT TRUE
      );
    `);

    // Tabela de Municípios
    await client.query(`
      CREATE TABLE IF NOT EXISTS municipalities (
        id SERIAL PRIMARY KEY,
        codigo_ibge VARCHAR(20) UNIQUE NOT NULL,
        municipio VARCHAR(255) NOT NULL,
        uf VARCHAR(10) NOT NULL,
        estado_id INT REFERENCES states(id) ON DELETE CASCADE,
        ativo BOOLEAN DEFAULT TRUE
      );
    `);

    // Tabela de Provedores Municipais de NFS-e
    await client.query(`
      CREATE TABLE IF NOT EXISTS municipal_providers (
        id SERIAL PRIMARY KEY,
        codigo_ibge VARCHAR(20) UNIQUE NOT NULL,
        municipio VARCHAR(255) NOT NULL,
        uf VARCHAR(10) NOT NULL,
        provedor_nfse VARCHAR(100) NOT NULL,
        versao_layout VARCHAR(50),
        url_homologacao TEXT,
        url_producao TEXT,
        ativo BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar Índices Solicitados para Descoberta de Provedores Municipais
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_municipality_ibge ON municipal_providers (codigo_ibge);
      CREATE INDEX IF NOT EXISTS idx_municipality_provider ON municipal_providers (provedor_nfse);
      CREATE INDEX IF NOT EXISTS idx_municipality_state ON municipal_providers (uf);
    `);

    // 2. Tabela de Usuários / Colaboradores
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255),
        login VARCHAR(255),
        password VARCHAR(255),
        allowed_tabs TEXT[],
        is_admin BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Tabela de Produtos (Logística & Estoque)
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        barcode VARCHAR(255),
        name VARCHAR(255),
        location VARCHAR(255),
        manufacture_date DATE,
        expiration_date DATE,
        batch VARCHAR(100),
        qty INT DEFAULT 0,
        category VARCHAR(100),
        price DECIMAL(12, 2) DEFAULT 0.00,
        low_stock_threshold INT DEFAULT 10,
        internal_code VARCHAR(100),
        description TEXT,
        unit VARCHAR(50),
        ncm VARCHAR(20),
        cest VARCHAR(20),
        gtin VARCHAR(50),
        origin VARCHAR(10),
        cfop_default VARCHAR(10),
        cst_icms VARCHAR(10),
        csosn VARCHAR(10),
        cst_pis VARCHAR(10),
        cst_cofins VARCHAR(10),
        cst_ipi VARCHAR(10),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Tabela de Funcionários / Equipe Recursos Humanos
    await client.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255),
        role VARCHAR(255),
        salary DECIMAL(12, 2) DEFAULT 0.00,
        date_hired DATE,
        status VARCHAR(50) DEFAULT 'Ativo',
        phone VARCHAR(50),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Tabela de Movimentações Financeiras / Fluxo de Caixa
    await client.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        establishment_name VARCHAR(255),
        amount DECIMAL(12, 2) DEFAULT 0.00,
        date DATE,
        category VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Confirmado',
        notes TEXT,
        type VARCHAR(50) DEFAULT 'Despesa',
        items JSONB,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Tabela de Notas Fiscais (NF-e Sebrae / Fiscal)
    await client.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        invoice_number VARCHAR(100),
        access_key VARCHAR(100),
        type VARCHAR(50) DEFAULT 'produto',
        customer_name VARCHAR(255),
        customer_tax_id VARCHAR(50),
        customer_email VARCHAR(255),
        customer_address TEXT,
        customer_city VARCHAR(100),
        customer_state VARCHAR(50),
        subtotal DECIMAL(12, 2) DEFAULT 0.00,
        tax_amount DECIMAL(12, 2) DEFAULT 0.00,
        total_value DECIMAL(12, 2) DEFAULT 0.00,
        issue_date DATE,
        status VARCHAR(50) DEFAULT 'transmitida',
        nature VARCHAR(255) DEFAULT 'Venda',
        certificate_used VARCHAR(255),
        environment VARCHAR(50) DEFAULT 'homologacao',
        items JSONB,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Tabela de Tarefas e Hierarquia de Trabalho
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        title VARCHAR(255),
        assigner_id VARCHAR(255),
        assigner_name VARCHAR(255),
        assignee_id VARCHAR(255),
        assignee_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Pendente',
        date_created DATE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. Logs de Auditoria do SaaS
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        company_id VARCHAR(255),
        action VARCHAR(150),
        details TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8.5 Tabela de Certificados Digitais para ERP
    await client.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        certificate_name VARCHAR(255) NOT NULL,
        certificate_type VARCHAR(50) NOT NULL,
        encrypted_certificate TEXT NOT NULL,
        encrypted_password TEXT NOT NULL,
        serial_number VARCHAR(255),
        issuer VARCHAR(255),
        subject VARCHAR(255),
        valid_from TIMESTAMP,
        valid_until TIMESTAMP,
        status VARCHAR(50) DEFAULT 'Ativo',
        is_active BOOLEAN DEFAULT TRUE,
        uploaded_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8.6 Tabela de Documentos XML Fiscais (Gerações, Versões e Validação)
    await client.query(`
      CREATE TABLE IF NOT EXISTS fiscal_documents (
        id VARCHAR(255) PRIMARY KEY,
        company_id VARCHAR(255) NOT NULL,
        document_type VARCHAR(20) NOT NULL,
        document_number INT NOT NULL,
        document_series INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        version INT DEFAULT 1,
        xml_content TEXT NOT NULL,
        created_by VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar Índices Solicitados para Documentos Fiscais
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_fiscal_company ON fiscal_documents (company_id);
      CREATE INDEX IF NOT EXISTS idx_fiscal_number ON fiscal_documents (document_number);
      CREATE INDEX IF NOT EXISTS idx_fiscal_status ON fiscal_documents (status);
    `);

    // 8.7 Tabela de Documentos Assinados Digitalmente (Assinaturas Fiscais)
    await client.query(`
      CREATE TABLE IF NOT EXISTS signed_documents (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        document_id VARCHAR(255) REFERENCES fiscal_documents(id) ON DELETE CASCADE,
        certificate_id VARCHAR(255) REFERENCES certificates(id) ON DELETE SET NULL,
        signature_hash VARCHAR(255) NOT NULL,
        signature_status VARCHAR(50) NOT NULL,
        signed_xml TEXT NOT NULL,
        signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        signed_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Índices exclusivos solicitados para auditoria e isolamento tenant
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_signed_documents_company ON signed_documents (company_id);
      CREATE INDEX IF NOT EXISTS idx_signed_documents_document ON signed_documents (document_id);
      CREATE INDEX IF NOT EXISTS idx_signed_documents_certificate ON signed_documents (certificate_id);
    `);

    // 8.8 Tabela de Protocolos SEFAZ de Transmissão (sefaz_protocols)
    await client.query(`
      CREATE TABLE IF NOT EXISTS sefaz_protocols (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        document_id VARCHAR(255) REFERENCES fiscal_documents(id) ON DELETE CASCADE,
        receipt_number VARCHAR(100),
        protocol_number VARCHAR(100),
        status_code VARCHAR(50),
        status_message TEXT,
        authorized BOOLEAN DEFAULT FALSE,
        received_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_sefaz_protocols_company ON sefaz_protocols (company_id);
      CREATE INDEX IF NOT EXISTS idx_sefaz_protocols_document ON sefaz_protocols (document_id);
      CREATE INDEX IF NOT EXISTS idx_sefaz_protocols_receipt ON sefaz_protocols (receipt_number);
      CREATE INDEX IF NOT EXISTS idx_sefaz_protocols_protocol ON sefaz_protocols (protocol_number);
    `);

    // 8.9 Tabela de Documentos NF-e Completos (nfe_documents)
    await client.query(`
      CREATE TABLE IF NOT EXISTS nfe_documents (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        invoice_number INT NOT NULL,
        series INT NOT NULL,
        access_key VARCHAR(100),
        customer_id VARCHAR(255),
        status VARCHAR(50) NOT NULL,
        issue_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        total_value DECIMAL(15,2) NOT NULL DEFAULT 0.00,
        xml_original TEXT,
        xml_signed TEXT,
        xml_authorized TEXT,
        protocol_number VARCHAR(100),
        created_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_nfe_documents_company ON nfe_documents (company_id);
      CREATE INDEX IF NOT EXISTS idx_nfe_documents_number_series ON nfe_documents (invoice_number, series);
      CREATE INDEX IF NOT EXISTS idx_nfe_documents_customer ON nfe_documents (customer_id);
      CREATE INDEX IF NOT EXISTS idx_nfe_documents_status ON nfe_documents (status);
      CREATE INDEX IF NOT EXISTS idx_nfe_documents_date ON nfe_documents (issue_date);
    `);

    // 8.9b Tabela de Documentos NFC-e (nfce_documents)
    await client.query(`
      CREATE TABLE IF NOT EXISTS nfce_documents (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        number INT NOT NULL,
        series INT NOT NULL,
        access_key VARCHAR(100),
        customer_document VARCHAR(50),
        customer_name VARCHAR(255),
        total_value DECIMAL(15,2) NOT NULL DEFAULT 0.00,
        payment_method VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        protocol_number VARCHAR(100),
        xml_signed TEXT,
        xml_authorized TEXT,
        issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        items JSONB
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_nfce_company ON nfce_documents (company_id);
      CREATE INDEX IF NOT EXISTS idx_nfce_number ON nfce_documents (number);
      CREATE INDEX IF NOT EXISTS idx_nfce_status ON nfce_documents (status);
      CREATE INDEX IF NOT EXISTS idx_nfce_date ON nfce_documents (issued_at);
    `);

    // 8.10 Tabela de Documentos DANFE (danfe_documents)
    await client.query(`
      CREATE TABLE IF NOT EXISTS danfe_documents (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        nfe_id VARCHAR(255) REFERENCES nfe_documents(id) ON DELETE CASCADE,
        pdf_path TEXT,
        generation_hash VARCHAR(255),
        generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        generated_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_danfe_company ON danfe_documents (company_id);
      CREATE INDEX IF NOT EXISTS idx_danfe_nfe ON danfe_documents (nfe_id);
      CREATE INDEX IF NOT EXISTS idx_danfe_date ON danfe_documents (generated_at);
    `);

    // 8.11 Tabela de Eventos Fiscais (fiscal_events)
    await client.query(`
      CREATE TABLE IF NOT EXISTS fiscal_events (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        document_id VARCHAR(255),
        event_type VARCHAR(50) NOT NULL,
        event_sequence INT NOT NULL DEFAULT 1,
        protocol_number VARCHAR(100),
        status_code VARCHAR(50),
        status_message TEXT,
        event_xml TEXT,
        response_xml TEXT,
        created_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_event_company ON fiscal_events (company_id);
      CREATE INDEX IF NOT EXISTS idx_event_document ON fiscal_events (document_id);
      CREATE INDEX IF NOT EXISTS idx_event_type ON fiscal_events (event_type);
      CREATE INDEX IF NOT EXISTS idx_event_protocol ON fiscal_events (protocol_number);
    `);

    // Tabelas do Modulo de Eventos SEFAZ
    await client.query(`
      CREATE TABLE IF NOT EXISTS sefaz_event_queue (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        document_id VARCHAR(255),
        event_type VARCHAR(50) NOT NULL,
        payload JSONB,
        status VARCHAR(50) DEFAULT 'PENDING',
        retry_count INT DEFAULT 0,
        next_retry_at TIMESTAMP,
        error_message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_sefaz_event_queue_status ON sefaz_event_queue (status);
      CREATE INDEX IF NOT EXISTS idx_sefaz_event_queue_company ON sefaz_event_queue (company_id);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sefaz_event_logs (
        id SERIAL PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        event_id VARCHAR(255),
        document_id VARCHAR(255),
        action VARCHAR(255),
        details TEXT,
        created_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_sefaz_event_logs_company ON sefaz_event_logs (company_id);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sefaz_distribution_documents (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        nsu VARCHAR(50) NOT NULL,
        schema_type VARCHAR(100),
        cnpj_cpf VARCHAR(20),
        name VARCHAR(255),
        document_number VARCHAR(50),
        access_key VARCHAR(100),
        xml_content TEXT,
        summary JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_sefaz_dist_docs_company ON sefaz_distribution_documents (company_id);
      CREATE INDEX IF NOT EXISTS idx_sefaz_dist_docs_nsu ON sefaz_distribution_documents (nsu);
      CREATE INDEX IF NOT EXISTS idx_sefaz_dist_docs_key ON sefaz_distribution_documents (access_key);
    `);


    // --- ENHANCEMENTS & SECURITY ALTERS FOR MULTI-TENANCY & ROBUST SESSIONS ---
    console.log("🛠️ Executando alterações de segurança e novas tabelas no PostgreSQL...");
    
    // Atualiza tabela de empresas (companies)
    await client.query(`
      ALTER TABLE companies 
      ADD COLUMN IF NOT EXISTS ie VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS im VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS address_street VARCHAR(255) DEFAULT '',
      ADD COLUMN IF NOT EXISTS address_number VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS address_neighborhood VARCHAR(255) DEFAULT '',
      ADD COLUMN IF NOT EXISTS city VARCHAR(255) DEFAULT '',
      ADD COLUMN IF NOT EXISTS state_uf VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS cep VARCHAR(50) DEFAULT '',
      ADD COLUMN IF NOT EXISTS phone VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS digital_certificate VARCHAR(255) DEFAULT 'A1',
      ADD COLUMN IF NOT EXISTS cert_valid_until VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS sefaz_env VARCHAR(50) DEFAULT 'Homologação',
      ADD COLUMN IF NOT EXISTS next_nfe INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS bank_info VARCHAR(255) DEFAULT '',
      ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT '',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);

    // Atualiza tabela de usuários (users)
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
      ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE,
      ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS failed_login_attempts INT DEFAULT 0,
      ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP,
      ADD COLUMN IF NOT EXISTS last_login TIMESTAMP,
      ADD COLUMN IF NOT EXISTS role VARCHAR(100) DEFAULT 'Proprietário',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);

    // --- MÓDULO NFS-e ---
    
    // Tabela de Configuração Municipal para NFS-e (Integrações Reais)
    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_municipalities (
        ibge_code VARCHAR(10) PRIMARY KEY,
        uf VARCHAR(2) NOT NULL,
        city_name VARCHAR(255) NOT NULL,
        provider_name VARCHAR(100) NOT NULL,
        url_production TEXT,
        url_homologation TEXT,
        auth_type VARCHAR(50) DEFAULT 'CERTIFICATE',
        certificate_required BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_nfse_municipalities_provider ON nfse_municipalities (provider_name);
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_settings (
        company_id uuid PRIMARY KEY REFERENCES companies(id) ON DELETE CASCADE,
        municipal_inscription VARCHAR(50),
        codigo_ibge VARCHAR(20),
        municipio VARCHAR(100),
        uf VARCHAR(2),
        nfse_provider VARCHAR(100),
        environment VARCHAR(20) DEFAULT 'homologacao',
        layout_version VARCHAR(20),
        auth_method VARCHAR(50),
        url_producao VARCHAR(255),
        url_homologacao VARCHAR(255),
        observations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_services (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        internal_code VARCHAR(50),
        description TEXT NOT NULL,
        municipal_service_code VARCHAR(50),
        lc116_item VARCHAR(20),
        iss_rate DECIMAL(10, 2),
        default_value DECIMAL(10, 2),
        observations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_documents (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        provider VARCHAR(100),
        invoice_number VARCHAR(50),
        verification_code VARCHAR(100),
        customer_id VARCHAR(255),
        customer_document VARCHAR(20),  
        customer_name VARCHAR(255),
        service_id VARCHAR(255) REFERENCES nfse_services(id) ON DELETE SET NULL,
        status VARCHAR(50) DEFAULT 'DRAFT', 
        issue_date TIMESTAMP,
        total_value DECIMAL(10, 2),
        iss_retained BOOLEAN DEFAULT FALSE,
        xml_content TEXT,
        xml_signed TEXT,
        pdf_path VARCHAR(500),
        protocol_number VARCHAR(100),
        cancellation_reason TEXT,
        created_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_issnet_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_xml TEXT,
        response_xml TEXT,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_webiss_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_xml TEXT,
        response_xml TEXT,
        status VARCHAR(50),
        error_message TEXT,
        processing_time_ms INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_betha_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_payload TEXT,
        response_payload TEXT,
        status VARCHAR(50),
        error_message TEXT,
        processing_time_ms INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_ipm_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_payload TEXT,
        response_payload TEXT,
        status VARCHAR(50),
        error_message TEXT,
        processing_time_ms INTEGER,
        provider_version VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_dsf_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_payload TEXT,
        response_payload TEXT,
        status VARCHAR(50),
        error_message TEXT,
        processing_time_ms INTEGER,
        provider_version VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_simpliss_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_payload TEXT,
        response_payload TEXT,
        status VARCHAR(50),
        error_message TEXT,
        processing_time_ms INTEGER,
        provider_version VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_nfse_providers (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255),
        state VARCHAR(2),
        ibge_code VARCHAR(50),
        production_url VARCHAR(1024),
        homologation_url VARCHAR(1024),
        communication_type VARCHAR(50),
        authentication_type VARCHAR(50),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS custom_provider_mappings (
        id VARCHAR(255) PRIMARY KEY,
        provider_id VARCHAR(255) NOT NULL REFERENCES custom_nfse_providers(id) ON DELETE CASCADE,
        local_field VARCHAR(255) NOT NULL,
        provider_field VARCHAR(255) NOT NULL,
        required BOOLEAN DEFAULT false,
        data_type VARCHAR(50) DEFAULT 'string'
      );
      
      CREATE TABLE IF NOT EXISTS custom_provider_templates (
        id VARCHAR(255) PRIMARY KEY,
        provider_id VARCHAR(255) NOT NULL REFERENCES custom_nfse_providers(id) ON DELETE CASCADE,
        template_name VARCHAR(255) NOT NULL,
        template_xml TEXT NOT NULL,
        version VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS custom_provider_logs (
        id VARCHAR(255) PRIMARY KEY,
        provider_id VARCHAR(255) REFERENCES custom_nfse_providers(id) ON DELETE SET NULL,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        action VARCHAR(100),
        request_payload TEXT,
        response_payload TEXT,
        status VARCHAR(50),
        error_message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_sigiss_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_payload TEXT,
        response_payload TEXT,
        status VARCHAR(50),
        error_message TEXT,
        processing_time_ms INTEGER,
        provider_version VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS nfse_fiorilli_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        invoice_id VARCHAR(255),
        action VARCHAR(100),
        request_payload TEXT,
        response_payload TEXT,
        status VARCHAR(50),
        error_message TEXT,
        processing_time_ms INTEGER,
        provider_version VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_nfse_company ON nfse_documents (company_id);
      CREATE INDEX IF NOT EXISTS idx_nfse_number ON nfse_documents (invoice_number);
      CREATE INDEX IF NOT EXISTS idx_nfse_status ON nfse_documents (status);
      CREATE INDEX IF NOT EXISTS idx_nfse_customer ON nfse_documents (customer_id);

      CREATE INDEX IF NOT EXISTS idx_issnet_company ON nfse_issnet_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_issnet_invoice ON nfse_issnet_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_issnet_status ON nfse_issnet_logs (status);

      CREATE INDEX IF NOT EXISTS idx_webiss_company ON nfse_webiss_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_webiss_invoice ON nfse_webiss_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_webiss_status ON nfse_webiss_logs (status);
      CREATE INDEX IF NOT EXISTS idx_webiss_date ON nfse_webiss_logs (created_at);

      CREATE INDEX IF NOT EXISTS idx_betha_company ON nfse_betha_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_betha_invoice ON nfse_betha_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_betha_status ON nfse_betha_logs (status);
      CREATE INDEX IF NOT EXISTS idx_betha_date ON nfse_betha_logs (created_at);
      
      CREATE INDEX IF NOT EXISTS idx_ipm_company ON nfse_ipm_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_ipm_invoice ON nfse_ipm_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_ipm_status ON nfse_ipm_logs (status);
      CREATE INDEX IF NOT EXISTS idx_ipm_date ON nfse_ipm_logs (created_at);
      
      CREATE INDEX IF NOT EXISTS idx_dsf_company ON nfse_dsf_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_dsf_invoice ON nfse_dsf_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_dsf_status ON nfse_dsf_logs (status);
      CREATE INDEX IF NOT EXISTS idx_dsf_date ON nfse_dsf_logs (created_at);
      
      CREATE INDEX IF NOT EXISTS idx_fiorilli_company ON nfse_fiorilli_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_fiorilli_invoice ON nfse_fiorilli_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_fiorilli_status ON nfse_fiorilli_logs (status);
      CREATE INDEX IF NOT EXISTS idx_fiorilli_date ON nfse_fiorilli_logs (created_at);
      
      CREATE INDEX IF NOT EXISTS idx_simpliss_company ON nfse_simpliss_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_simpliss_invoice ON nfse_simpliss_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_simpliss_status ON nfse_simpliss_logs (status);
      CREATE INDEX IF NOT EXISTS idx_simpliss_date ON nfse_simpliss_logs (created_at);
      
      CREATE INDEX IF NOT EXISTS idx_sigiss_company ON nfse_sigiss_logs (company_id);
      CREATE INDEX IF NOT EXISTS idx_sigiss_invoice ON nfse_sigiss_logs (invoice_id);
      CREATE INDEX IF NOT EXISTS idx_sigiss_status ON nfse_sigiss_logs (status);
      CREATE INDEX IF NOT EXISTS idx_sigiss_date ON nfse_sigiss_logs (created_at);
    `);

    // Cria tabela de sessões ativas (Sessions)
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) PRIMARY KEY,
        user_id uuid REFERENCES users(id) ON DELETE CASCADE,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Cria tabela de tokens de recuperação temporários (Password Resets)
    await client.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Executa alters na auditoria e acrescenta colunas SaaS de faturamento em empresas
    await client.query(`
      ALTER TABLE audit_logs 
      ADD COLUMN IF NOT EXISTS user_id VARCHAR(255),
      ADD COLUMN IF NOT EXISTS ip_address VARCHAR(100);
    `);

    await client.query(`
      ALTER TABLE companies
      ADD COLUMN IF NOT EXISTS plan VARCHAR(50) DEFAULT 'media',
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'trial',
      ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '15 days',
      ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days',
      ADD COLUMN IF NOT EXISTS state_registration VARCHAR(50),
      ADD COLUMN IF NOT EXISTS municipal_registration VARCHAR(50),
      ADD COLUMN IF NOT EXISTS crt VARCHAR(10) DEFAULT '1',
      ADD COLUMN IF NOT EXISTS cnae_primary VARCHAR(20),
      ADD COLUMN IF NOT EXISTS cnae_secondary VARCHAR(255),
      ADD COLUMN IF NOT EXISTS fiscal_email VARCHAR(255),
      ADD COLUMN IF NOT EXISTS website VARCHAR(255),
      ADD COLUMN IF NOT EXISTS legal_representative_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS legal_representative_cpf VARCHAR(50),
      ADD COLUMN IF NOT EXISTS legal_representative_email VARCHAR(255),
      ADD COLUMN IF NOT EXISTS legal_representative_phone VARCHAR(50),
      ADD COLUMN IF NOT EXISTS ibge_code VARCHAR(15),
      ADD COLUMN IF NOT EXISTS fiscal_environment VARCHAR(20) DEFAULT 'homologacao',
      ADD COLUMN IF NOT EXISTS foundation_date DATE,
      ADD COLUMN IF NOT EXISTS phone_primary VARCHAR(50),
      ADD COLUMN IF NOT EXISTS phone_secondary VARCHAR(50),
      ADD COLUMN IF NOT EXISTS email_primary VARCHAR(255),
      ADD COLUMN IF NOT EXISTS cep VARCHAR(50),
      ADD COLUMN IF NOT EXISTS street VARCHAR(255),
      ADD COLUMN IF NOT EXISTS number VARCHAR(50),
      ADD COLUMN IF NOT EXISTS complement VARCHAR(255),
      ADD COLUMN IF NOT EXISTS neighborhood VARCHAR(255),
      ADD COLUMN IF NOT EXISTS city VARCHAR(255),
      ADD COLUMN IF NOT EXISTS state_uf VARCHAR(10),
      ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'Brasil',
      ADD COLUMN IF NOT EXISTS series_nfe INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS series_nfce INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS series_cte INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS series_mdfe INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS next_number_nfe INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS next_number_nfce INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS next_number_cte INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS next_number_mdfe INT DEFAULT 1,
      ADD COLUMN IF NOT EXISTS resolved_state VARCHAR(10) DEFAULT '',
      ADD COLUMN IF NOT EXISTS resolved_ibge VARCHAR(20) DEFAULT '',
      ADD COLUMN IF NOT EXISTS resolved_nfse_provider VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS resolved_sefaz VARCHAR(100) DEFAULT '',
      ADD COLUMN IF NOT EXISTS resolved_region VARCHAR(50) DEFAULT '',
      ADD COLUMN IF NOT EXISTS last_resolution_date TIMESTAMP;
    `);

    // Atualiza tabela de produtos (products)
    await client.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS internal_code VARCHAR(100),
      ADD COLUMN IF NOT EXISTS description TEXT,
      ADD COLUMN IF NOT EXISTS unit VARCHAR(50),
      ADD COLUMN IF NOT EXISTS ncm VARCHAR(20),
      ADD COLUMN IF NOT EXISTS cest VARCHAR(20),
      ADD COLUMN IF NOT EXISTS gtin VARCHAR(50),
      ADD COLUMN IF NOT EXISTS origin VARCHAR(10),
      ADD COLUMN IF NOT EXISTS cfop_default VARCHAR(10),
      ADD COLUMN IF NOT EXISTS cst_icms VARCHAR(10),
      ADD COLUMN IF NOT EXISTS csosn VARCHAR(10),
      ADD COLUMN IF NOT EXISTS cst_pis VARCHAR(10),
      ADD COLUMN IF NOT EXISTS cst_cofins VARCHAR(10),
      ADD COLUMN IF NOT EXISTS cst_ipi VARCHAR(10);
    `);

    // Criar índices solicitados com resiliência
    try {
      await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_company_cnpj ON companies (cnpj) WHERE cnpj IS NOT NULL AND cnpj != 'Não Preenchido' AND cnpj != '';`);
    } catch (e: any) {
      console.warn(`⚠️ Não foi possível criar índice único idx_company_cnpj (provavelmente registros redundantes existem):`, e.message);
    }
    try {
      await client.query(`CREATE INDEX IF NOT EXISTS idx_company_ibge ON companies (ibge_code);`);
    } catch (e: any) {
      console.warn(`⚠️ Não foi possível criar índice idx_company_ibge:`, e.message);
    }
    try {
      await client.query(`CREATE INDEX IF NOT EXISTS idx_company_tax_regime ON companies (tax_regime);`);
    } catch (e: any) {
      console.warn(`⚠️ Não foi possível criar índice idx_company_tax_regime:`, e.message);
    }

    // 9. Tabela de Administradores SaaS (Segurança master)
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        two_factor_secret VARCHAR(255) DEFAULT '',
        two_factor_enabled BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 10. Tabela de Afiliados
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliates (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_rate DECIMAL(10, 2) DEFAULT 0.00,
        commission_rate DECIMAL(10, 2) DEFAULT 10.00,
        clicks INT DEFAULT 0,
        leads INT DEFAULT 0,
        sales_count INT DEFAULT 0,
        commission_paid DECIMAL(12, 2) DEFAULT 0.00,
        commission_pending DECIMAL(12, 2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 11. Tabela de Comissões de Afiliados
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliate_commissions (
        id VARCHAR(255) PRIMARY KEY,
        affiliate_id VARCHAR(255) REFERENCES affiliates(id) ON DELETE CASCADE,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        sale_amount DECIMAL(12, 2) NOT NULL,
        commission_amount DECIMAL(12, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pendente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 12. Tabela de Tickets de Suporte
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        user_id VARCHAR(255),
        user_name VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Aberto',
        priority VARCHAR(50) DEFAULT 'Média',
        replies JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 13. Tabela de Logs de Sistema
    await client.query(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id SERIAL PRIMARY KEY,
        log_type VARCHAR(50) DEFAULT 'info',
        module VARCHAR(100),
        message TEXT,
        stack_trace TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 14. Tabela de Auditoria de Divergências Shadow V2
    await client.query(`
      CREATE TABLE IF NOT EXISTS shadow_divergence_logs (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        user_id uuid REFERENCES users(id) ON DELETE SET NULL,
        request_id VARCHAR(255),
        route VARCHAR(255) NOT NULL,
        operation VARCHAR(255) NOT NULL,
        severity VARCHAR(50),
        matched BOOLEAN NOT NULL DEFAULT true,
        difference_count INTEGER DEFAULT 0,
        warning_count INTEGER DEFAULT 0,
        duration_ms INTEGER DEFAULT 0,
        summary TEXT,
        fields JSONB,
        source VARCHAR(100) DEFAULT 'fiscal-v2-shadow',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_shadow_div_company ON shadow_divergence_logs(company_id);
      CREATE INDEX IF NOT EXISTS idx_shadow_div_date ON shadow_divergence_logs(created_at);
    `);

    // 15. Tabela de Controle Canary V2
    await client.query(`
      CREATE TABLE IF NOT EXISTS canary_control_records (
        id VARCHAR(255) PRIMARY KEY,
        company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
        user_id uuid REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(255) NOT NULL,
        route VARCHAR(255) NOT NULL,
        operation VARCHAR(255) NOT NULL,
        risk_level VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        mode VARCHAR(50) NOT NULL,
        simulation_only BOOLEAN NOT NULL DEFAULT true,
        activation_blocked BOOLEAN NOT NULL DEFAULT true,
        reason TEXT NOT NULL,
        metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        revoked_at TIMESTAMP
      );
      
      -- Constraints para garantir a seguranca do modo inerte
      ALTER TABLE canary_control_records DROP CONSTRAINT IF EXISTS chk_simulation_only;
      ALTER TABLE canary_control_records ADD CONSTRAINT chk_simulation_only CHECK (simulation_only = true);
      
      ALTER TABLE canary_control_records DROP CONSTRAINT IF EXISTS chk_activation_blocked;
      ALTER TABLE canary_control_records ADD CONSTRAINT chk_activation_blocked CHECK (activation_blocked = true);
      
      ALTER TABLE canary_control_records DROP CONSTRAINT IF EXISTS chk_control_mode;
      ALTER TABLE canary_control_records ADD CONSTRAINT chk_control_mode CHECK (mode IN ('SIMULATION_ONLY', 'APPROVAL_ONLY', 'BLOCKED'));
      
      ALTER TABLE canary_control_records DROP CONSTRAINT IF EXISTS chk_control_status;
      ALTER TABLE canary_control_records ADD CONSTRAINT chk_control_status CHECK (status IN ('INACTIVE', 'SIMULATION_APPROVED', 'BLOCKED', 'REVOKED', 'EXPIRED'));

      CREATE INDEX IF NOT EXISTS idx_canary_control_company_id ON canary_control_records(company_id);
      CREATE INDEX IF NOT EXISTS idx_canary_control_route_operation ON canary_control_records(route, operation);
      CREATE INDEX IF NOT EXISTS idx_canary_control_created_at ON canary_control_records(created_at);
      CREATE INDEX IF NOT EXISTS idx_canary_control_status ON canary_control_records(status);
    `);

    // Tabela Dedicada Sandbox Persistence Módulo 6.1
    await client.query(`
      CREATE TABLE IF NOT EXISTS fiscal_v2_sandbox_snapshots (
        id VARCHAR(255) PRIMARY KEY,
        company_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255),
        source VARCHAR(50) NOT NULL,
        route VARCHAR(255) NOT NULL,
        operation VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        safe_shape JSONB NOT NULL DEFAULT '{}',
        metadata JSONB NOT NULL DEFAULT '{}',
        marker VARCHAR(50) NOT NULL DEFAULT 'fiscal-v2-sandbox-persistence',
        reviewed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        sandbox_only BOOLEAN NOT NULL DEFAULT true,
        production_write BOOLEAN NOT NULL DEFAULT false,
        simulation_only BOOLEAN NOT NULL DEFAULT true,
        activation_blocked BOOLEAN NOT NULL DEFAULT true,
        payload_included BOOLEAN NOT NULL DEFAULT false,
        sensitive_data_included BOOLEAN NOT NULL DEFAULT false
      );

      ALTER TABLE fiscal_v2_sandbox_snapshots DROP CONSTRAINT IF EXISTS chk_sandbox_marker;
      ALTER TABLE fiscal_v2_sandbox_snapshots ADD CONSTRAINT chk_sandbox_marker CHECK (marker = 'fiscal-v2-sandbox-persistence');

      ALTER TABLE fiscal_v2_sandbox_snapshots DROP CONSTRAINT IF EXISTS chk_sandbox_only;
      ALTER TABLE fiscal_v2_sandbox_snapshots ADD CONSTRAINT chk_sandbox_only CHECK (sandbox_only = true);

      ALTER TABLE fiscal_v2_sandbox_snapshots DROP CONSTRAINT IF EXISTS chk_production_write_false;
      ALTER TABLE fiscal_v2_sandbox_snapshots ADD CONSTRAINT chk_production_write_false CHECK (production_write = false);

      ALTER TABLE fiscal_v2_sandbox_snapshots DROP CONSTRAINT IF EXISTS chk_simulation_only;
      ALTER TABLE fiscal_v2_sandbox_snapshots ADD CONSTRAINT chk_simulation_only CHECK (simulation_only = true);

      ALTER TABLE fiscal_v2_sandbox_snapshots DROP CONSTRAINT IF EXISTS chk_activation_blocked;
      ALTER TABLE fiscal_v2_sandbox_snapshots ADD CONSTRAINT chk_activation_blocked CHECK (activation_blocked = true);

      ALTER TABLE fiscal_v2_sandbox_snapshots DROP CONSTRAINT IF EXISTS chk_payload_included_false;
      ALTER TABLE fiscal_v2_sandbox_snapshots ADD CONSTRAINT chk_payload_included_false CHECK (payload_included = false);

      ALTER TABLE fiscal_v2_sandbox_snapshots DROP CONSTRAINT IF EXISTS chk_sensitive_data_included_false;
      ALTER TABLE fiscal_v2_sandbox_snapshots ADD CONSTRAINT chk_sensitive_data_included_false CHECK (sensitive_data_included = false);

      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_company_id ON fiscal_v2_sandbox_snapshots(company_id);
      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_source ON fiscal_v2_sandbox_snapshots(source);
      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_route ON fiscal_v2_sandbox_snapshots(route);
      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_operation ON fiscal_v2_sandbox_snapshots(operation);
      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_status ON fiscal_v2_sandbox_snapshots(status);
      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_created_at ON fiscal_v2_sandbox_snapshots(created_at);
      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_expires_at ON fiscal_v2_sandbox_snapshots(expires_at);
      CREATE INDEX IF NOT EXISTS idx_sandbox_snapshots_marker ON fiscal_v2_sandbox_snapshots(marker);
    `);

    // 0. Seed de Estados e Municípios para Descoberta Automática de Provedores Fiscais
    try {
      const statesCheck = await client.query("SELECT COUNT(*) FROM states");
      if (parseInt(statesCheck.rows[0].count, 10) === 0) {
        console.log("🌱 Populando tabela de Estados (states)...");
        const seedStates = [
          { uf: 'AC', nome_estado: 'Acre', codigo_ibge_estado: '12', sefaz_responsavel: 'SVRS' },
          { uf: 'AL', nome_estado: 'Alagoas', codigo_ibge_estado: '27', sefaz_responsavel: 'SVRS' },
          { uf: 'AP', nome_estado: 'Amapá', codigo_ibge_estado: '16', sefaz_responsavel: 'SVRS' },
          { uf: 'AM', nome_estado: 'Amazonas', codigo_ibge_estado: '13', sefaz_responsavel: 'SEFAZ AM' },
          { uf: 'BA', nome_estado: 'Bahia', codigo_ibge_estado: '29', sefaz_responsavel: 'SEFAZ BA' },
          { uf: 'CE', nome_estado: 'Ceará', codigo_ibge_estado: '23', sefaz_responsavel: 'SEFAZ CE' },
          { uf: 'DF', nome_estado: 'Distrito Federal', codigo_ibge_estado: '53', sefaz_responsavel: 'SVRS' },
          { uf: 'ES', nome_estado: 'Espírito Santo', codigo_ibge_estado: '32', sefaz_responsavel: 'SVRS' },
          { uf: 'GO', nome_estado: 'Goiás', codigo_ibge_estado: '52', sefaz_responsavel: 'SEFAZ GO' },
          { uf: 'MA', nome_estado: 'Maranhão', codigo_ibge_estado: '21', sefaz_responsavel: 'SVAN' },
          { uf: 'MT', nome_estado: 'Mato Grosso', codigo_ibge_estado: '51', sefaz_responsavel: 'SEFAZ MT' },
          { uf: 'MS', nome_estado: 'Mato Grosso do Sul', codigo_ibge_estado: '50', sefaz_responsavel: 'SEFAZ MS' },
          { uf: 'MG', nome_estado: 'Minas Gerais', codigo_ibge_estado: '31', sefaz_responsavel: 'SEFAZ MG' },
          { uf: 'PA', nome_estado: 'Pará', codigo_ibge_estado: '15', sefaz_responsavel: 'SVRS' },
          { uf: 'PB', nome_estado: 'Paraíba', codigo_ibge_estado: '25', sefaz_responsavel: 'SVRS' },
          { uf: 'PR', nome_estado: 'Paraná', codigo_ibge_estado: '41', sefaz_responsavel: 'SEFAZ PR' },
          { uf: 'PE', nome_estado: 'Pernambuco', codigo_ibge_estado: '26', sefaz_responsavel: 'SEFAZ PE' },
          { uf: 'PI', nome_estado: 'Piauí', codigo_ibge_estado: '22', sefaz_responsavel: 'SVRS' },
          { uf: 'RJ', nome_estado: 'Rio de Janeiro', codigo_ibge_estado: '33', sefaz_responsavel: 'SVRS' },
          { uf: 'RN', nome_estado: 'Rio Grande do Norte', codigo_ibge_estado: '24', sefaz_responsavel: 'SVRS' },
          { uf: 'RS', nome_estado: 'Rio Grande do Sul', codigo_ibge_estado: '43', sefaz_responsavel: 'SEFAZ RS' },
          { uf: 'RO', nome_estado: 'Rondônia', codigo_ibge_estado: '11', sefaz_responsavel: 'SVRS' },
          { uf: 'RR', nome_estado: 'Roraima', codigo_ibge_estado: '14', sefaz_responsavel: 'SVRS' },
          { uf: 'SC', nome_estado: 'Santa Catarina', codigo_ibge_estado: '42', sefaz_responsavel: 'SVRS' },
          { uf: 'SP', nome_estado: 'São Paulo', codigo_ibge_estado: '35', sefaz_responsavel: 'SEFAZ SP' },
          { uf: 'SE', nome_estado: 'Sergipe', codigo_ibge_estado: '28', sefaz_responsavel: 'SVRS' },
          { uf: 'TO', nome_estado: 'Tocantins', codigo_ibge_estado: '17', sefaz_responsavel: 'SVRS' }
        ];
        for (const st of seedStates) {
          await client.query(`
            INSERT INTO states (uf, nome_estado, codigo_ibge_estado, sefaz_responsavel, ativo)
            VALUES ($1, $2, $3, $4, TRUE)
            ON CONFLICT (uf) DO NOTHING
          `, [st.uf, st.nome_estado, st.codigo_ibge_estado, st.sefaz_responsavel]);
        }
      }

      const municipalitiesCheck = await client.query("SELECT COUNT(*) FROM municipalities");
      if (parseInt(municipalitiesCheck.rows[0].count, 10) === 0) {
        console.log("🌱 Populando tabela de Municípios e Provedores...");
        const seedMuni = [
          { ibge: '5208707', name: 'Goiânia', uf: 'GO', provider: 'Ginfes', layout: 'Abrasf v2.0', url_h: 'https://homologacao.ginfes.com.br', url_p: 'https://producao.ginfes.com.br' },
          { ibge: '3550308', name: 'São Paulo', uf: 'SP', provider: 'Paulistana', layout: 'NFS-e SP v1.0', url_h: 'https://nfe.prefeitura.sp.gov.br/homologacao', url_p: 'https://nfe.prefeitura.sp.gov.br' },
          { ibge: '3304557', name: 'Rio de Janeiro', uf: 'RJ', provider: 'Nota Carioca', layout: 'Abrasf v1.0', url_h: 'https://homologacao.notacarioca.rio.gov.br', url_p: 'https://notacarioca.rio.gov.br' },
          { ibge: '3549805', name: 'São José do Rio Preto', uf: 'SP', provider: 'Ginfes', layout: 'Abrasf v2.0', url_h: 'https://homologacao.ginfes.com.br', url_p: 'https://producao.ginfes.com.br' },
          { ibge: '3106200', name: 'Belo Horizonte', uf: 'MG', provider: 'BHISS', layout: 'Abrasf v1.0', url_h: 'https://bhisshomologacao.pbh.gov.br', url_p: 'https://bhiss.pbh.gov.br' },
          { ibge: '2927408', name: 'Salvador', uf: 'BA', provider: 'WebISS', layout: 'Abrasf v1.0', url_h: 'https://homologacao.webiss.com.br/salvador', url_p: 'https://salvador.webiss.com.br' },
          { ibge: '4106902', name: 'Curitiba', uf: 'PR', provider: 'IPM', layout: 'IPM XML v1.0', url_h: 'https://www.curitiba.pr.gov.br/homologacao', url_p: 'https://www.curitiba.pr.gov.br' },
          { ibge: '4314902', name: 'Porto Alegre', uf: 'RS', provider: 'BHISS', layout: 'Abrasf v2.0', url_h: 'https://portoalegre.homologacao.bhiss.com.br', url_p: 'https://portoalegre.bhiss.com.br' },
          { ibge: '5300108', name: 'Brasília', uf: 'DF', provider: 'SEFAZ DF', layout: 'NFC-e Conjugada v4.0', url_h: 'https://homologacao.sefaz.df.gov.br', url_p: 'https://producao.sefaz.df.gov.br' },
          { ibge: '2304400', name: 'Fortaleza', uf: 'CE', provider: 'Ginfes', layout: 'Abrasf v2.0', url_h: 'https://homologacao.ginfes.com.br', url_p: 'https://producao.ginfes.com.br' },
          { ibge: '2611606', name: 'Recife', uf: 'PE', provider: 'Abrasf v2.0', layout: 'Abrasf v2.0', url_h: 'https://recife.homologacao.abrasf.org.br', url_p: 'https://recife.abrasf.org.br' },
          { ibge: '1302603', name: 'Manaus', uf: 'AM', provider: 'Ginfes', layout: 'Abrasf v2.0', url_h: 'https://homologacao.ginfes.com.br', url_p: 'https://producao.ginfes.com.br' }
        ];

        for (const m of seedMuni) {
          const stateRes = await client.query("SELECT id FROM states WHERE uf = $1", [m.uf]);
          const stateId = stateRes.rows[0]?.id;
          if (stateId) {
            await client.query(`
              INSERT INTO municipalities (codigo_ibge, municipio, uf, estado_id, ativo)
              VALUES ($1, $2, $3, $4, TRUE)
              ON CONFLICT (codigo_ibge) DO NOTHING
            `, [m.ibge, m.name, m.uf, stateId]);

            await client.query(`
              INSERT INTO municipal_providers (codigo_ibge, municipio, uf, provedor_nfse, versao_layout, url_homologacao, url_producao, ativo)
              VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE)
              ON CONFLICT (codigo_ibge) DO NOTHING
            `, [m.ibge, m.name, m.uf, m.provider, m.layout, m.url_h, m.url_p]);
          }
        }
      }
    } catch (seedErr) {
      console.error("⚠️ Falha ao semear dados de municípios na base Postgres:", seedErr);
    }

    // --- CRIAÇÃO DE ÍNDICES OTIMIZADOS PARA SAAS MULTI-TENANT ---
    console.log("⚡ Criando índices de desempenho no PostgreSQL...");
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_company ON users(company_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_login ON users(email);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_products_company_barcode ON products(company_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_employees_company ON employees(company_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_transactions_company_date ON transactions(company_id, date);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_invoices_company_number ON invoices(company_id, invoice_number);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_invoices_access_key ON invoices(access_key);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tasks_company ON tasks(company_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_audit_company ON audit_logs(company_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(code);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tickets_status ON support_tickets(status);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_certificates_company ON certificates(company_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_certificates_expiration ON certificates(valid_until);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_affiliate_commissions_company ON affiliate_commissions(company_id);`);

    // --- SINCERIDADE E CONFORMIDADE PARA ASSESTRAR GOVERNANÇA COMPLETA ---
    // A) Adicionar chaves estrangeiras ausentes (FK) de forma resiliente
    try {
      await client.query(`
        DO $$
        BEGIN
          -- audit_logs
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_audit_logs_company' AND table_name = 'audit_logs'
          ) THEN
            ALTER TABLE audit_logs ADD CONSTRAINT fk_audit_logs_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;
          END IF;
          
          -- affiliate_commissions
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_affiliate_commissions_company' AND table_name = 'affiliate_commissions'
          ) THEN
            ALTER TABLE affiliate_commissions ADD CONSTRAINT fk_affiliate_commissions_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;
          END IF;
          
          -- fiscal_documents
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_fiscal_documents_company' AND table_name = 'fiscal_documents'
          ) THEN
            ALTER TABLE fiscal_documents ADD CONSTRAINT fk_fiscal_documents_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;
          END IF;
        END $$;
      `);
    } catch (fkErr: any) {
      console.warn("⚠️ Não foi possível sincronizar chaves estrangeiras pendentes:", fkErr.message);
    }

    // B) Adicionar índices de busca para as tabelas que estão com eles em falta de forma segura e não bloqueante
    try {
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_sessions_company ON sessions(company_id);
        CREATE INDEX IF NOT EXISTS idx_support_tickets_company ON support_tickets(company_id);
        CREATE INDEX IF NOT EXISTS idx_nfse_services_company ON nfse_services(company_id);
        CREATE INDEX IF NOT EXISTS idx_custom_provider_logs_company ON custom_provider_logs(company_id);
      `);
    } catch (idxErr: any) {
      console.warn("⚠️ Não foi possível criar índices corporativos de busca:", idxErr.message);
    }

    await enableRowLevelSecurity(client);
    if (process.env.RUN_DATABASE_GOVERNANCE_CHECK === 'true') {
      await verifyDatabaseGovernance(client);
    } else {
      console.log("🛡️ Database governance check bypassed (enable with RUN_DATABASE_GOVERNANCE_CHECK=true).");
    }

    // Configure secure tenant-level login role and grant full table access
    try {
      console.log("🛡️ Configurando usuário seguro de inquilino (tenant_auth_user) para isolamento estrito...");
      await client.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'tenant_auth_user') THEN
            CREATE ROLE tenant_auth_user WITH LOGIN PASSWORD 'tenant_pwd';
          END IF;
        END
        $$;
      `);
      await client.query("GRANT USAGE ON SCHEMA public TO tenant_auth_user;");
      await client.query("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tenant_auth_user;");
      await client.query("GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tenant_auth_user;");
      await client.query("ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO tenant_auth_user;");
      await client.query("ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO tenant_auth_user;");
      try {
        await client.query("GRANT authenticated TO tenant_auth_user;");
      } catch (grantAuthErr: any) {
        console.warn("⚠️ Não foi possível atribuir 'authenticated' ao 'tenant_auth_user':", grantAuthErr.message);
      }
    } catch (roleErr: any) {
      console.warn("⚠️ Não foi possível configurar o usuário seguro tenant_auth_user:", roleErr.message);
    }

    client.release();

    // Re-create the connection pool specifically using the secure, restricted tenant_auth_user role
    console.log("🔒 Recriando pool de conexões com usuário restrito (tenant_auth_user) para conformidade estrita de RLS...");
    try {
      await pgPooler.pgPool!.end();
    } catch (_) {}
    pgPooler.setPgPool(pgPooler.createTenantPool(connectionString));

    pgPooler.setPostgresActive(true);
    console.log("✅ Toda a camada de dados PostgreSQL relacional corporativa foi estabelecida com sucesso!");
  } catch (err: any) {
    console.error("❌ Erro fatal: Não foi possível conectar ao PostgreSQL ou inicializar a estrutura relacional:", err?.message || err);
    pgPooler.setPostgresActive(false);
    throw err;
  }
}

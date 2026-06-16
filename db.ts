import pg, { Pool } from "pg";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { tenantContext } from "./shared/context";

export { tenantContext };

import { 
  pgPool as infraPgPool, 
  isPostgresActive as infraIsPostgresActive, 
  setPostgresActive as infraSetPostgresActive, 
  setPgPool as infraSetPgPool, 
  setupPgPoolWrapping as infraSetupPgPoolWrapping, 
  parseDatabaseUrl as infraParseDatabaseUrl, 
  createTenantPool as infraCreateTenantPool, 
  initializeDb as infraInitializeDb 
} from "./infrastructure/database";

export let pgPool: Pool | null = null;
export let isPostgresActive = false;

export function setPostgresActive(active: boolean) {
  infraSetPostgresActive(active);
  isPostgresActive = active;
}

export function setPgPool(pool: Pool | null) {
  infraSetPgPool(pool);
  pgPool = pool;
}

export function setupPgPoolWrapping(pool: Pool) {
  infraSetupPgPoolWrapping(pool);
}


export function parseDatabaseUrl(url: string) {
  return infraParseDatabaseUrl(url);
}

export function createTenantPool(connectionString: string): Pool {
  return infraCreateTenantPool(connectionString);
}


export async function initializeDb(): Promise<void> {
  await infraInitializeDb();
  pgPool = (infraPgPool as any);
  isPostgresActive = infraIsPostgresActive;
  if (isPostgresActive || !isPostgresActive) return;

  async function enableRowLevelSecurity(client: any) {}
  async function verifyDatabaseGovernance(client: any) {}

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!connectionString || connectionString.includes("username:password") || connectionString.includes("placeholder") || connectionString.includes("YOUR-PASSWORD")) {
    throw new Error("❌ DATABASE_URL não configurado ou utilizando credenciais provisórias. Banco de dados PostgreSQL é obrigatório.");
  }

  try {
    console.log("🔌 Tentando conectar ao PostgreSQL...");
    
    const parsed = parseDatabaseUrl(connectionString);
    let success = false;

    if (parsed) {
      const activePort = parsed.port;
      let decodedPassword = parsed.password;
      try {
        decodedPassword = decodeURIComponent(parsed.password);
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
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5050
      };

      pgPool = new Pool(primaryConfig);
      setupPgPoolWrapping(pgPool);

      try {
        const client = await pgPool.connect();
        console.log(`✅ Conexão primária na porta ${activePort} SUCEDIDA!`);
        client.release();
        success = true;
      } catch (err: any) {
        console.warn(`⚠️ Conexão de porta primária (${activePort}) falhou: ${err.message}`);
        await pgPool.end();
        pgPool = null;

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
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 5050
          };

          pgPool = new Pool(altConfig);
          setupPgPoolWrapping(pgPool);
          try {
            const client = await pgPool.connect();
            console.log(`✅ Conexão resiliente na porta secundária ${altPort} SUCEDIDA!`);
            client.release();
            success = true;
          } catch (altErr: any) {
            console.error(`❌ Ambas as portas falharam na conexão ao PostgreSQL.`);
            await pgPool.end();
            pgPool = null;
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
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5050
      };
      pgPool = new Pool(simpleConfig);
      setupPgPoolWrapping(pgPool);
      const client = await pgPool.connect();
      client.release();
      success = true;
    }

    if (!success || !pgPool) {
      throw new Error("Erro desconhecido na conectividade do pool Postgres.");
    }

    console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso!");
    
    // Obter um cliente ativo do pool de forma resiliente para DDL e sincronizações
    const client = await pgPool.connect();
    
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) PRIMARY KEY REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
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
        company_id VARCHAR(255) REFERENCES companies(id) ON DELETE CASCADE,
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

    // --- SEED PARA AMBIENTE RECENTEMENTE ATIVADO NO POSTGRESQL ---
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

    // Seed data removed

    // --- CRIAÇÃO DE ÍNDICES OTIMIZADOS PARA SAAS MULTI-TENANT ---
    console.log("⚡ Criando índices de desempenho no PostgreSQL...");
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_company ON users(company_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_login ON users(login);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_products_company_barcode ON products(company_id, barcode);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_products_expiration ON products(expiration_date);`);
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
      await pgPool.end();
    } catch (_) {}
    pgPool = createTenantPool(connectionString);

    isPostgresActive = true;
    console.log("✅ Toda a camada de dados PostgreSQL relacional corporativa foi estabelecida com sucesso!");
  } catch (err: any) {
    console.error("❌ Erro fatal: Não foi possível conectar ao PostgreSQL ou inicializar a estrutura relacional:", err?.message || err);
    isPostgresActive = false;
    throw err;
  }
}

// Garante que uma empresa (Tenant) existe antes de inserir registros relacionados
async function ensureCompanyExists(client: any, companyId: string): Promise<void> {
  // Mock company removed to ensure real company insertion happens from UI
}

// Analisa, normaliza e sincroniza os dados KV recebidos para as tabelas relacionais em tempo de sincronia
async function syncRelationalData(identifier: string, key: string, value: string | null): Promise<void> {
  if (!isPostgresActive || !pgPool) return;

  const client = await pgPool.connect();
  try {
    const rawCompanyId = identifier || 'guest';
    
    // Tratamento global para remoção/exclusão de sincronizaos
    if (value === null) {
      // Deletar cascata na base relacional se for limpeza geral
      if (key.endsWith('biz_simulated_products')) {
        await client.query("DELETE FROM products WHERE company_id = $1", [rawCompanyId]);
      } else if (key.endsWith('biz_simulated_employees')) {
        await client.query("DELETE FROM employees WHERE company_id = $1", [rawCompanyId]);
      } else if (key.endsWith('biz_simulated_transactions')) {
        await client.query("DELETE FROM transactions WHERE company_id = $1", [rawCompanyId]);
      } else if (key.endsWith('biz_simulated_invoices') || key.endsWith('biz_archived_invoices')) {
        await client.query("DELETE FROM invoices WHERE company_id = $1", [rawCompanyId]);
      } else if (key.endsWith('biz_simulated_tasks') || key.endsWith('biz_central_tasks')) {
        await client.query("DELETE FROM tasks WHERE company_id = $1", [rawCompanyId]);
      }
      return;
    }

    const payload = JSON.parse(value);

    // 1. Cadastros Globais de Usuários (Nova Conta)
    if (key === 'biz_registered_users') {
      if (Array.isArray(payload)) {
        for (const u of payload) {
          const compId = u.pjEmail || u.email || u.id;
          const cName = u.corporateName || u.name || 'Empresa Individual';
          const tName = u.tradeName || u.name || 'Empresa Individual';
          const cnpjCpf = u.cnpj || u.cpf || '';

          // Upsert Empresa
          await client.query(`
            INSERT INTO companies (id, corporate_name, trade_name, cnpj, tax_regime, tax_rate)
            VALUES ($1, $2, $3, $4, 'Simples Nacional', 4.5)
            ON CONFLICT (id) DO UPDATE SET 
              corporate_name = COALESCE(NULLIF(EXCLUDED.corporate_name, ''), companies.corporate_name),
              trade_name = COALESCE(NULLIF(EXCLUDED.trade_name, ''), companies.trade_name),
              cnpj = COALESCE(NULLIF(EXCLUDED.cnpj, ''), companies.cnpj),
              updated_at = CURRENT_TIMESTAMP
          `, [compId, cName, tName, cnpjCpf]);

          // Upsert Usuário Principal Administrativo
          await client.query(`
            INSERT INTO users (id, company_id, name, login, password, allowed_tabs, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6, TRUE)
            ON CONFLICT (id) DO UPDATE SET 
              name = EXCLUDED.name,
              password = EXCLUDED.password,
              updated_at = CURRENT_TIMESTAMP
          `, [u.id, compId, u.name || tName, compId, u.password || '', ['dashboard', 'finance', 'logistics', 'invoice', 'hierarchy', 'advisor', 'settings']]);
        }
      }
    }

    // 2. Sub-usuários / Usuários secundários da equipe
    else if (key.endsWith('biz_sub_users')) {
      await ensureCompanyExists(client, rawCompanyId);
      if (Array.isArray(payload)) {
        // Remover antigos sub-usuários e inserir atualizados
        await client.query("DELETE FROM users WHERE company_id = $1 AND is_admin = FALSE", [rawCompanyId]);
        for (const su of payload) {
          await client.query(`
            INSERT INTO users (id, company_id, name, login, password, allowed_tabs, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6, FALSE)
            ON CONFLICT (id) DO UPDATE SET 
              name = EXCLUDED.name,
              password = EXCLUDED.password,
              allowed_tabs = EXCLUDED.allowed_tabs,
              updated_at = CURRENT_TIMESTAMP
          `, [su.id, rawCompanyId, su.name, su.login, su.password, su.allowedTabs || []]);
        }
      }
    }

    // 3. Configurações Individuais de Empresa (Canais individuais)
    else if (key.endsWith('cfg_corporate_name')) {
      await ensureCompanyExists(client, rawCompanyId);
      await client.query(`UPDATE companies SET corporate_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [value, rawCompanyId]);
    }
    else if (key.endsWith('cfg_trade_name')) {
      await ensureCompanyExists(client, rawCompanyId);
      await client.query(`UPDATE companies SET trade_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [value, rawCompanyId]);
    }
    else if (key.endsWith('cfg_cnpj')) {
      await ensureCompanyExists(client, rawCompanyId);
      await client.query(`UPDATE companies SET cnpj = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [value, rawCompanyId]);
    }
    else if (key.endsWith('cfg_tax_regime')) {
      await ensureCompanyExists(client, rawCompanyId);
      await client.query(`UPDATE companies SET tax_regime = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [value, rawCompanyId]);
    }
    else if (key.endsWith('cfg_tax_rate')) {
      await ensureCompanyExists(client, rawCompanyId);
      const rate = parseFloat(value || '4.5') || 4.5;
      await client.query(`UPDATE companies SET tax_rate = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [rate, rawCompanyId]);
    }
    else if (key.endsWith('cfg_exp_days')) {
      await ensureCompanyExists(client, rawCompanyId);
      const days = parseInt(value || '7', 10) || 7;
      await client.query(`UPDATE companies SET expiring_warning_days = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [days, rawCompanyId]);
    }
    else if (key.endsWith('cfg_min_stock')) {
      await ensureCompanyExists(client, rawCompanyId);
      const sLimit = parseInt(value || '10', 10) || 10;
      await client.query(`UPDATE companies SET min_stock_limit = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`, [sLimit, rawCompanyId]);
    }

    // 4. Produtos e Lotes (Controle de Logística)
    else if (key.endsWith('biz_simulated_products')) {
      await ensureCompanyExists(client, rawCompanyId);
      if (Array.isArray(payload)) {
        await client.query("DELETE FROM products WHERE company_id = $1", [rawCompanyId]);
        for (const p of payload) {
          const mDate = p.manufactureDate ? new Date(p.manufactureDate) : null;
          const eDate = p.expirationDate ? new Date(p.expirationDate) : null;
          const uPrice = typeof p.price === 'number' ? p.price : 0.00;
          const thresh = typeof p.lowStockThreshold === 'number' ? p.lowStockThreshold : 10;

          await client.query(`
            INSERT INTO products (
              id, company_id, barcode, name, location, manufacture_date, expiration_date, batch, qty, category, price, low_stock_threshold,
              internal_code, description, unit, ncm, cest, gtin, origin, cfop_default, cst_icms, csosn, cst_pis, cst_cofins, cst_ipi
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
          `, [
            p.id, rawCompanyId, p.barcode || '', p.name || '', p.location || '', mDate, eDate, p.batch || '', p.qty || 0, p.category || '', uPrice, thresh,
            p.internalCode || '', p.description || '', p.unit || '', p.ncm || '', p.cest || '', p.gtin || '', p.origin || '0', p.cfopDefault || '',
            p.cstIcms || '', p.csosn || '', p.cstPis || '', p.cstCofins || '', p.cstIpi || ''
          ]);
        }
      }
    }

    // 5. Funcionários e Folha de Contas (Equipe)
    else if (key.endsWith('biz_simulated_employees')) {
      await ensureCompanyExists(client, rawCompanyId);
      if (Array.isArray(payload)) {
        await client.query("DELETE FROM employees WHERE company_id = $1", [rawCompanyId]);
        for (const emp of payload) {
          const dHired = emp.dateHired ? new Date(emp.dateHired) : null;
          const sal = typeof emp.salary === 'number' ? emp.salary : 0.00;

          await client.query(`
            INSERT INTO employees (id, company_id, name, role, salary, date_hired, status, phone)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          `, [emp.id, rawCompanyId, emp.name || '', emp.role || '', sal, dHired, emp.status || 'Ativo', emp.phone || '']);
        }
      }
    }

    // 6. Transações Financeiras e Fluxo de Caixa (Lançamentos)
    else if (key.endsWith('biz_simulated_transactions')) {
      await ensureCompanyExists(client, rawCompanyId);
      if (Array.isArray(payload)) {
        await client.query("DELETE FROM transactions WHERE company_id = $1", [rawCompanyId]);
        for (const tx of payload) {
          const txDate = tx.date ? new Date(tx.date) : null;
          const amt = typeof tx.amount === 'number' ? tx.amount : 0.00;
          const txItems = tx.items ? JSON.stringify(tx.items) : null;

          await client.query(`
            INSERT INTO transactions (id, company_id, establishment_name, amount, date, category, status, notes, type, items)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          `, [tx.id, rawCompanyId, tx.establishmentName || '', amt, txDate, tx.category || 'Outros', tx.status || 'Confirmado', tx.notes || '', tx.type || 'Despesa', txItems]);
        }
      }
    }

    // 7. Notas Fiscais Emitidas e Rascunhos Arquivados
    else if (key.endsWith('biz_simulated_invoices') || key.endsWith('biz_archived_invoices')) {
      await ensureCompanyExists(client, rawCompanyId);
      if (Array.isArray(payload)) {
        const isArchived = key.endsWith('biz_archived_invoices');
        
        if (isArchived) {
          await client.query("DELETE FROM invoices WHERE company_id = $1 AND status = 'rascunho'", [rawCompanyId]);
        } else {
          await client.query("DELETE FROM invoices WHERE company_id = $1 AND status IN ('transmitida', 'cancelada')", [rawCompanyId]);
        }

        for (const inv of payload) {
          const iDate = inv.issueDate ? new Date(inv.issueDate) : null;
          const sub = typeof inv.subtotal === 'number' ? inv.subtotal : 0.00;
          const tax = typeof inv.taxAmount === 'number' ? inv.taxAmount : 0.00;
          const total = typeof inv.totalValue === 'number' ? inv.totalValue : 0.00;
          const invItems = inv.items ? JSON.stringify(inv.items) : null;

          await client.query(`
            INSERT INTO invoices (id, company_id, invoice_number, access_key, type, customer_name, customer_tax_id, customer_email, customer_address, customer_city, customer_state, subtotal, tax_amount, total_value, issue_date, status, nature, certificate_used, environment, items)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
          `, [
            inv.id, 
            rawCompanyId, 
            inv.invoiceNumber || '', 
            inv.accessKey || '', 
            inv.type || 'produto', 
            inv.customerName || '', 
            inv.customerTaxId || '', 
            inv.customerEmail || '', 
            inv.customerAddress || '', 
            inv.customerCity || '', 
            inv.customerState || '', 
            sub, 
            tax, 
            total, 
            iDate, 
            inv.status || (isArchived ? 'rascunho' : 'transmitida'), 
            inv.nature || 'Venda', 
            inv.certificateUsed || '', 
            inv.environment || 'homologacao', 
            invItems
          ]);
        }
      }
    }

    // 8. Atividades & Tarefas Operacionais
    else if (key.endsWith('biz_simulated_tasks') || key.endsWith('biz_central_tasks')) {
      await ensureCompanyExists(client, rawCompanyId);
      if (Array.isArray(payload)) {
        await client.query("DELETE FROM tasks WHERE company_id = $1", [rawCompanyId]);
        for (const t of payload) {
          const cDate = t.dateCreated ? new Date(t.dateCreated) : null;
          await client.query(`
            INSERT INTO tasks (id, company_id, title, assigner_id, assigner_name, assignee_id, assignee_name, status, date_created)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `, [t.id, rawCompanyId, t.title || t.name || '', t.assignerId || '', t.assignerName || '', t.assigneeId || '', t.assigneeName || '', t.status || 'Pendente', cDate]);
        }
      }
    }

    // Regista auditoria de Sincronia de Dados Relacionais com Sucesso!
    await client.query(`
      INSERT INTO audit_logs (company_id, action, details)
      VALUES ($1, 'SYNC_RELAIONAL_UPSTREAM', $2)
    `, [rawCompanyId, `Re-modelagem e sincronização do recurso relacional executada com sucesso: ${key}`]);

  } catch (parseErr: any) {
    console.error(`⚠️ Erro de parsing relacional na replicação da chave ${key}:`, parseErr.message);
  } finally {
    client.release();
  }
}

export async function saveSyncKey(identifier: string, key: string, value: string | null): Promise<void> {
  if (isPostgresActive && pgPool) {
    try {
      // Executa de forma segura a replicação de banco relacional e normalização estruturada
      await syncRelationalData(identifier, key, value);
      return;
    } catch (err) {
      console.error("Erro na escrita do PostgreSQL:", err);
    }
  }
}

export async function loadSyncData(identifier: string): Promise<{ global: Record<string, string>, scoped: Record<string, string> }> {
  const globalData: Record<string, string> = {};
  const scopedData: Record<string, string> = {};

  if (isPostgresActive && pgPool) {
    try {
      // 1. Carregar estados globais seeded
      const statesRes = await pgPool.query("SELECT * FROM states WHERE ativo = TRUE");
      globalData['states'] = JSON.stringify(statesRes.rows.map(r => ({
        id: r.id,
        uf: r.uf,
        nome_estado: r.nome_estado,
        codigo_ibge_estado: r.codigo_ibge_estado,
        sefaz_responsavel: r.sefaz_responsavel,
        ativo: r.ativo
      })));

      // 2. Carregar municípios globais
      const muniRes = await pgPool.query("SELECT * FROM municipalities WHERE ativo = TRUE");
      globalData['municipalities'] = JSON.stringify(muniRes.rows.map(r => ({
        id: r.id,
        codigo_ibge: r.codigo_ibge,
        municipio: r.municipio,
        uf: r.uf,
        estado_id: r.estado_id,
        ativo: r.ativo
      })));

      // 3. Carregar provedores municipais de NFS-e
      const providersRes = await pgPool.query("SELECT * FROM municipal_providers WHERE ativo = TRUE");
      globalData['municipal_providers'] = JSON.stringify(providersRes.rows.map(r => ({
        id: r.id,
        codigo_ibge: r.codigo_ibge,
        municipio: r.municipio,
        uf: r.uf,
        provedor_nfse: r.provedor_nfse,
        versao_layout: r.versao_layout,
        url_homologacao: r.url_homologacao,
        url_producao: r.url_producao,
        ativo: r.ativo
      })));

      // 4. Carregar configurações da empresa (Tenant)
      const companyRes = await pgPool.query("SELECT * FROM companies WHERE id = $1", [identifier]);
      if (companyRes.rows.length > 0) {
        const comp = companyRes.rows[0];
        scopedData['cfg_corporate_name'] = comp.corporate_name || '';
        scopedData['cfg_trade_name'] = comp.trade_name || '';
        scopedData['cfg_cnpj'] = comp.cnpj || '';
        scopedData['cfg_tax_regime'] = comp.tax_regime || 'Simples Nacional';
        scopedData['cfg_tax_rate'] = String(comp.tax_rate || 4.5);
        scopedData['cfg_exp_days'] = String(comp.expiring_warning_days || 7);
        scopedData['cfg_min_stock'] = String(comp.min_stock_limit || 10);
      }

      // 5. Carregar produtos estruturados
      const productsRes = await pgPool.query("SELECT * FROM products WHERE company_id = $1", [identifier]);
      scopedData['biz_simulated_products'] = JSON.stringify(productsRes.rows.map(p => ({
        id: p.id,
        name: p.name,
        barcode: p.barcode,
        location: p.location,
        manufactureDate: p.manufacture_date ? p.manufacture_date.toISOString().split('T')[0] : null,
        expirationDate: p.expiration_date ? p.expiration_date.toISOString().split('T')[0] : null,
        batch: p.batch,
        qty: parseInt(String(p.qty || 0), 10),
        category: p.category,
        price: parseFloat(String(p.price || 0)),
        lowStockThreshold: parseInt(String(p.low_stock_threshold || 10), 10),
        internalCode: p.internal_code,
        description: p.description,
        unit: p.unit,
        ncm: p.ncm,
        cest: p.cest,
        gtin: p.gtin,
        origin: p.origin,
        cfopDefault: p.cfop_default,
        cstIcms: p.cst_icms,
        csosn: p.csosn,
        cstPis: p.cst_pis,
        cstCofins: p.cst_cofins,
        cstIpi: p.cst_ipi
      })));

      // 6. Carregar colaboradores / equipe
      const employeesRes = await pgPool.query("SELECT * FROM employees WHERE company_id = $1", [identifier]);
      scopedData['biz_simulated_employees'] = JSON.stringify(employeesRes.rows.map(e => ({
        id: e.id,
        name: e.name,
        role: e.role,
        salary: parseFloat(String(e.salary || 0)),
        dateHired: e.date_hired ? e.date_hired.toISOString().split('T')[0] : null,
        status: e.status || 'Ativo',
        phone: e.phone || ''
      })));

      // 7. Carregar transações financeiras
      const transRes = await pgPool.query("SELECT * FROM transactions WHERE company_id = $1 ORDER BY date DESC", [identifier]);
      scopedData['biz_simulated_transactions'] = JSON.stringify(transRes.rows.map(t => ({
        id: t.id,
        establishmentName: t.establishment_name,
        amount: parseFloat(String(t.amount || 0)),
        date: t.date ? t.date.toISOString().split('T')[0] : null,
        category: t.category,
        status: t.status,
        notes: t.notes,
        type: t.type,
        items: t.items ? (typeof t.items === 'string' ? JSON.parse(t.items) : t.items) : []
      })));

      // 8. Carregar notas fiscais (transmitidas vs rascunhos)
      const invoicesRes = await pgPool.query("SELECT * FROM invoices WHERE company_id = $1", [identifier]);
      const normalInvoices = invoicesRes.rows.filter(inv => inv.status !== 'rascunho').map(inv => ({
        id: inv.id,
        invoiceNumber: inv.invoice_number,
        accessKey: inv.access_key,
        type: inv.type,
        customerName: inv.customer_name,
        customerTaxId: inv.customer_tax_id,
        customerEmail: inv.customer_email,
        customerAddress: inv.customer_address,
        customerCity: inv.customer_city,
        customerState: inv.customer_state,
        subtotal: parseFloat(String(inv.subtotal || 0)),
        taxAmount: parseFloat(String(inv.tax_amount || 0)),
        totalValue: parseFloat(String(inv.total_value || 0)),
        issueDate: inv.issue_date ? inv.issue_date.toISOString() : null,
        status: inv.status,
        nature: inv.nature,
        certificateUsed: inv.certificate_used,
        environment: inv.environment,
        items: inv.items ? (typeof inv.items === 'string' ? JSON.parse(inv.items) : inv.items) : []
      }));
      const draftInvoices = invoicesRes.rows.filter(inv => inv.status === 'rascunho').map(inv => ({
        id: inv.id,
        invoiceNumber: inv.invoice_number,
        accessKey: inv.access_key,
        type: inv.type,
        customerName: inv.customer_name,
        customerTaxId: inv.customer_tax_id,
        customerEmail: inv.customer_email,
        customerAddress: inv.customer_address,
        customerCity: inv.customer_city,
        customerState: inv.customer_state,
        subtotal: parseFloat(String(inv.subtotal || 0)),
        taxAmount: parseFloat(String(inv.tax_amount || 0)),
        totalValue: parseFloat(String(inv.total_value || 0)),
        issueDate: inv.issue_date ? inv.issue_date.toISOString() : null,
        status: inv.status,
        nature: inv.nature,
        certificateUsed: inv.certificate_used,
        environment: inv.environment,
        items: inv.items ? (typeof inv.items === 'string' ? JSON.parse(inv.items) : inv.items) : []
      }));
      scopedData['biz_simulated_invoices'] = JSON.stringify(normalInvoices);
      scopedData['biz_archived_invoices'] = JSON.stringify(draftInvoices);

      // 9. Carregar tarefas operacionais
      const tasksRes = await pgPool.query("SELECT * FROM tasks WHERE company_id = $1", [identifier]);
      scopedData['biz_simulated_tasks'] = JSON.stringify(tasksRes.rows.map(t => ({
        id: t.id,
        title: t.title,
        assignerId: t.assigner_id,
        assignerName: t.assigner_name,
        assigneeId: t.assignee_id,
        assigneeName: t.assignee_name,
        status: t.status,
        dateCreated: t.date_created ? t.date_created.toISOString() : null
      })));

      // 10. Carregar sub-usuários da equipe
      const subUsersRes = await pgPool.query("SELECT * FROM users WHERE company_id = $1 AND is_admin = FALSE", [identifier]);
      scopedData['biz_sub_users'] = JSON.stringify(subUsersRes.rows.map(u => ({
        id: u.id,
        name: u.name,
        login: u.login,
        password: u.password,
        allowedTabs: u.allowed_tabs || []
      })));

      // 11. Carregar saldo financeiro virtual no frontend
      let cashTotal = 0;
      transRes.rows.forEach(t => {
        const amt = parseFloat(String(t.amount || 0));
        if (t.type === 'Receita') {
          cashTotal += amt;
        } else {
          cashTotal -= amt;
        }
      });
      scopedData['biz_simulated_cash_balance'] = String(cashTotal);

      return {
        global: globalData,
        scoped: scopedData
      };
    } catch (err) {
      console.error("Erro na leitura dinâmica relacional do PostgreSQL:", err);
    }
  }

  return {
    global: {},
    scoped: {}
  };
}

// ==========================================
// SECURE MULTI-TENANT AUTHENTICATION HELPERS
// ==========================================

// 1. Encontrar usuário por e-mail (ou login)
export async function findUserByEmail(email: string): Promise<any | null> {
  const cleanEmail = email.trim().toLowerCase();
  if (isPostgresActive && pgPool) {
    return tenantContext.run({ companyId: "", bypassRls: true }, async () => {
      const res = await pgPool!.query("SELECT * FROM users WHERE LOWER(login) = $1", [cleanEmail]);
      if (res.rows.length > 0) {
        return res.rows[0];
      }
      return null;
    });
  } else {
    return null;
  }
}

// 2. Incrementar tentativas de login malsucedidas
export async function incrementFailedAttempts(userId: string): Promise<number | null> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query(`
      UPDATE users 
      SET failed_login_attempts = failed_login_attempts + 1 
      WHERE id = $1 
      RETURNING failed_login_attempts, locked_until
    `, [userId]);
    const row = res.rows[0];
    if (row && row.failed_login_attempts >= 5) {
      const lockTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
      await pgPool.query("UPDATE users SET locked_until = $1 WHERE id = $2", [lockTime, userId]);
      return 5;
    }
    return row ? row.failed_login_attempts : 0;
  } else {
    // Local fallback in memory
    const usersRaw = dbInMemoryLocal.global['users'];
    if (usersRaw) {
      try {
        const users = JSON.parse(usersRaw);
        const index = users.findIndex((u: any) => u.id === userId);
        if (index !== -1) {
          users[index].failed_login_attempts = (users[index].failed_login_attempts || 0) + 1;
          if (users[index].failed_login_attempts >= 5) {
            users[index].locked_until = new Date(Date.now() + 15 * 60 * 1000).toISOString();
          }
          dbInMemoryLocal.global['users'] = JSON.stringify(users);
          scheduleSaveLocalFallback();
          return users[index].failed_login_attempts;
        }
      } catch (e) {}
    }
    return 0;
  }
}

// 3. Resetar tentativas de login malsucedidas
export async function resetFailedAttempts(userId: string): Promise<void> {
  if (isPostgresActive && pgPool) {
    await pgPool.query("UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE id = $1", [userId]);
  } else {
    // Local fallback
    const usersRaw = dbInMemoryLocal.global['users'];
    if (usersRaw) {
      try {
        const users = JSON.parse(usersRaw);
        const index = users.findIndex((u: any) => u.id === userId);
        if (index !== -1) {
          users[index].failed_login_attempts = 0;
          users[index].locked_until = null;
          dbInMemoryLocal.global['users'] = JSON.stringify(users);
          scheduleSaveLocalFallback();
        }
      } catch (e) {}
    }
  }
}

// 4. Registrar logs de auditoria
export async function logAudit(companyId: string | null, userId: string | null, action: string, details: string, ip: string): Promise<void> {
  try {
    if (isPostgresActive && pgPool) {
      await pgPool.query(`
        INSERT INTO audit_logs (company_id, user_id, action, details, ip_address, timestamp)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      `, [companyId, userId, action, details, ip]);
    } else {
      // Local fallback
      const logsRaw = dbInMemoryLocal.global['audit_logs'] || '[]';
      let logs = [];
      try { logs = JSON.parse(logsRaw); } catch(e) {}
      logs.push({
        id: 'aud_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        company_id: companyId,
        user_id: userId,
        action,
        details,
        ip_address: ip,
        timestamp: new Date().toISOString()
      });
      dbInMemoryLocal.global['audit_logs'] = JSON.stringify(logs);
      scheduleSaveLocalFallback();
    }
  } catch (err) {
    console.error("Erro ao gravar log de auditoria:", err);
  }
}

// 5. Cadastrar Empresa e Usuário Administrador
export async function createTenant(companyName: string, adminName: string, email: string, passwordHash: string, plan: string = 'media'): Promise<any> {
  const companyId = 'comp_' + Date.now();
  const userId = 'usr_' + Date.now();
  const cleanEmail = email.trim().toLowerCase();

  if (isPostgresActive && pgPool) {
    const client = await pgPool.connect();
    try {
      await client.query("BEGIN");

      // Criar empresa
      await client.query(`
        INSERT INTO companies (id, corporate_name, trade_name, cnpj, tax_regime, tax_rate, plan, status, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `, [companyId, companyName.toUpperCase(), companyName.toUpperCase(), "Não Preenchido", "Simples Nacional", 4.5, plan, "trial"]);

      // Criar usuário admin
      await client.query(`
        INSERT INTO users (id, company_id, name, login, password_hash, allowed_tabs, is_admin, active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `, [userId, companyId, adminName, cleanEmail, passwordHash, ["dashboard", "finance", "logistics", "advisor", "hierarchy", "invoice", "settings"], true, true]);

      await client.query("COMMIT");
      return { companyId, userId, corporate_name: companyName, name: adminName, email: cleanEmail, plan };
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } else {
    // Local Fallback
    // 1. Salvar empresa
    const compsRaw = dbInMemoryLocal.global['companies'] || '[]';
    let comps = [];
    try { comps = JSON.parse(compsRaw); } catch (e) {}
    const newComp = {
      id: companyId,
      corporate_name: companyName.toUpperCase(),
      trade_name: companyName.toUpperCase(),
      cnpj: "Não Preenchido",
      tax_regime: "Simples Nacional",
      tax_rate: 4.5,
      ie: "",
      im: "",
      address_street: "",
      address_number: "",
      address_neighborhood: "",
      city: "",
      state_uf: "",
      cep: "",
      phone: "",
      plan: plan,
      status: "trial",
      created_at: new Date().toISOString()
    };
    comps.push(newComp);
    dbInMemoryLocal.global['companies'] = JSON.stringify(comps);

    // 2. Salvar usuário admin
    const usersRaw = dbInMemoryLocal.global['users'] || '[]';
    let users = [];
    try { users = JSON.parse(usersRaw); } catch (e) {}
    const newUser = {
      id: userId,
      company_id: companyId,
      name: adminName,
      login: cleanEmail,
      password_hash: passwordHash,
      allowed_tabs: ["dashboard", "finance", "logistics", "advisor", "hierarchy", "invoice", "settings"],
      is_admin: true,
      active: true,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    dbInMemoryLocal.global['users'] = JSON.stringify(users);

    scheduleSaveLocalFallback();
    return { companyId, userId, corporate_name: companyName, name: adminName, email: cleanEmail, plan };
  }
}

// 6. Criar nova sessão ativa
export async function createSession(userId: string, companyId: string, token: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 Horas
  if (isPostgresActive && pgPool) {
    await pgPool.query(`
      INSERT INTO sessions (id, user_id, company_id, expires_at)
      VALUES ($1, $2, $3, $4)
    `, [token, userId, companyId, expiresAt]);
  } else {
    // Local fallback
    const sessRaw = dbInMemoryLocal.global['sessions'] || '[]';
    let sessions = [];
    try { sessions = JSON.parse(sessRaw); } catch (e) {}
    sessions.push({
      id: token,
      user_id: userId,
      company_id: companyId,
      expires_at: expiresAt.toISOString()
    });
    dbInMemoryLocal.global['sessions'] = JSON.stringify(sessions);
    scheduleSaveLocalFallback();
  }
}

// 7. Encontrar sessão ativa e estender/validar
export async function validateSession(token: string): Promise<any | null> {
  if (isPostgresActive && pgPool) {
    return tenantContext.run({ companyId: "", bypassRls: true }, async () => {
      const res = await pgPool!.query(`
        SELECT s.*, u.name, u.login, u.is_admin, u.allowed_tabs, u.role, c.corporate_name, c.trade_name, c.cnpj, c.plan, c.status
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        JOIN companies c ON s.company_id = c.id
        WHERE s.id = $1 AND s.expires_at > CURRENT_TIMESTAMP
      `, [token]);
      if (res.rows.length > 0) {
        // Estender sessão (session renewal segura)
        const nextExpiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // Mais 2 horas
        await pgPool!.query("UPDATE sessions SET expires_at = $1 WHERE id = $2", [nextExpiresAt, token]);
        return res.rows[0];
      }
      return null;
    });
  } else {
    return null;
  }
}

// 8. Deletar sessão ativa (Logout)
export async function revokeSession(token: string): Promise<void> {
  if (isPostgresActive && pgPool) {
    await pgPool.query("DELETE FROM sessions WHERE id = $1", [token]);
  } else {
    const sessRaw = dbInMemoryLocal.global['sessions'];
    if (sessRaw) {
      try {
        let sessions = JSON.parse(sessRaw);
        sessions = sessions.filter((s: any) => s.id !== token);
        dbInMemoryLocal.global['sessions'] = JSON.stringify(sessions);
        scheduleSaveLocalFallback();
      } catch (e) {}
    }
  }
}

// 9. Registrar Token de Recuperação de Senha
export async function createPasswordResetToken(email: string, token: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 Hora
  if (isPostgresActive && pgPool) {
    await pgPool.query(`
      INSERT INTO password_resets (email, token, expires_at)
      VALUES ($1, $2, $3)
    `, [email.toLowerCase().trim(), token, expiresAt]);
  } else {
    const resetsRaw = dbInMemoryLocal.global['password_resets'] || '[]';
    let resets = [];
    try { resets = JSON.parse(resetsRaw); } catch(e) {}
    resets.push({
      email: email.toLowerCase().trim(),
      token,
      expires_at: expiresAt.toISOString(),
      used: false
    });
    dbInMemoryLocal.global['password_resets'] = JSON.stringify(resets);
    scheduleSaveLocalFallback();
  }
}

// 10. Atualizar senha por redefinição usando token temporal
export async function resetPasswordWithToken(token: string, newPasswordHash: string): Promise<boolean> {
  if (isPostgresActive && pgPool) {
    const res = await pgPool.query(`
      SELECT * FROM password_resets 
      WHERE token = $1 AND used = FALSE AND expires_at > CURRENT_TIMESTAMP
    `, [token]);
    if (res.rows.length === 0) return false;

    const email = res.rows[0].email;

    const client = await pgPool.connect();
    try {
      await client.query("BEGIN");
      // Atualizar senha do usuário
      await client.query("UPDATE users SET password_hash = $1, failed_login_attempts = 0, locked_until = NULL WHERE LOWER(login) = $2", [newPasswordHash, email]);
      // Marcar token como utilizado
      await client.query("UPDATE password_resets SET used = TRUE WHERE token = $1", [token]);
      // Revogar sessões antigas por segurança
      await client.query("DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE LOWER(login) = $1)", [email]);
      await client.query("COMMIT");
      return true;
    } catch(e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } else {
    // Local fallback
    const resetsRaw = dbInMemoryLocal.global['password_resets'];
    if (resetsRaw) {
      try {
        const resets = JSON.parse(resetsRaw);
        const match = resets.find((r: any) => r.token === token && !r.used && new Date(r.expires_at) > new Date());
        if (match) {
          const email = match.email;
          const users = JSON.parse(dbInMemoryLocal.global['users'] || '[]');
          const idx = users.findIndex((u: any) => u.login.toLowerCase() === email.toLowerCase());
          if (idx !== -1) {
            users[idx].password_hash = newPasswordHash;
            users[idx].failed_login_attempts = 0;
            users[idx].locked_until = null;
            dbInMemoryLocal.global['users'] = JSON.stringify(users);
          }

          match.used = true;
          dbInMemoryLocal.global['password_resets'] = JSON.stringify(resets);

          // Revogar sessões deste email
          let sessions = JSON.parse(dbInMemoryLocal.global['sessions'] || '[]');
          if (idx !== -1) {
            sessions = sessions.filter((s: any) => s.user_id !== users[idx].id);
            dbInMemoryLocal.global['sessions'] = JSON.stringify(sessions);
          }

          scheduleSaveLocalFallback();
          return true;
        }
      } catch (e) {}
    }
    return false;
  }
}

// 11. Atualizar Configurações Empresarias
export async function saveCompanyDetails(companyId: string, fields: any): Promise<void> {
  if (isPostgresActive && pgPool) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const parts: string[] = [];
    const vals: any[] = [];
    keys.forEach((k, idx) => {
      parts.push(`${k} = $${idx + 2}`);
      vals.push(fields[k]);
    });
    const query = `UPDATE companies SET ${parts.join(', ')} WHERE id = $1`;
    await pgPool.query(query, [companyId, ...vals]);
  } else {
    const compsRaw = dbInMemoryLocal.global['companies'] || '[]';
    try {
      const comps = JSON.parse(compsRaw);
      const idx = comps.findIndex((c: any) => c.id === companyId);
      if (idx !== -1) {
        comps[idx] = { ...comps[idx], ...fields };
        dbInMemoryLocal.global['companies'] = JSON.stringify(comps);
        scheduleSaveLocalFallback();
      }
    } catch (e) {}
  }
}

// 12. Obter Configurações e Cadastro Fiscal Empresarial
export async function getCompanyDetails(companyId: string): Promise<any | null> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM companies WHERE id = $1`, [companyId]);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Erro ao obter empresa no Postgres:", err);
      return null;
    }
  } else {
    const compsRaw = dbInMemoryLocal.global['companies'] || '[]';
    try {
      const comps = JSON.parse(compsRaw);
      return comps.find((c: any) => c.id === companyId) || null;
    } catch (e) {
      return null;
    }
  }
}

// 13. Módulo de Geração e Gerenciamento Contábil de Documentos XML Fiscais
export async function getFiscalDocuments(companyId: string, limit: number = 10, offset: number = 0): Promise<{ documents: any[], total: number }> {
  if (isPostgresActive && pgPool) {
    try {
      const totalRes = await pgPool.query(`SELECT COUNT(*) FROM fiscal_documents WHERE company_id = $1`, [companyId]);
      const total = parseInt(totalRes.rows[0].count, 10);
      
      const res = await pgPool.query(
        `SELECT * FROM fiscal_documents WHERE company_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
        [companyId, limit, offset]
      );
      return { documents: res.rows, total };
    } catch (err) {
      console.error("Erro ao obter documentos fiscais no Postgres:", err);
      return { documents: [], total: 0 };
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['fiscal_documents'] || '[]';
    try {
      const docs = JSON.parse(docsRaw).filter((d: any) => d.company_id === companyId);
      const sorted = docs.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      const paginated = sorted.slice(offset, offset + limit);
      return { documents: paginated, total: docs.length };
    } catch (e) {
      return { documents: [], total: 0 };
    }
  }
}

export async function getFiscalDocumentById(companyId: string, id: string): Promise<any | null> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM fiscal_documents WHERE company_id = $1 AND id = $2`, [companyId, id]);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Erro ao obter documento fiscal por ID:", err);
      return null;
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['fiscal_documents'] || '[]';
    try {
      const docs = JSON.parse(docsRaw);
      return docs.find((d: any) => d.company_id === companyId && d.id === id) || null;
    } catch (e) {
      return null;
    }
  }
}

export async function saveFiscalDocument(companyId: string, doc: { id: string, document_type: string, document_number: number, document_series: number, status: string, version: number, xml_content: string, created_by: string, company_id?: string }): Promise<void> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO fiscal_documents (id, company_id, document_type, document_number, document_series, status, version, xml_content, created_by, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
        ON CONFLICT (id) DO UPDATE SET
          status = EXCLUDED.status,
          version = EXCLUDED.version,
          xml_content = EXCLUDED.xml_content,
          updated_at = EXCLUDED.updated_at
      `, [doc.id, companyId, doc.document_type, doc.document_number, doc.document_series, doc.status, doc.version, doc.xml_content, doc.created_by, now]);
    } catch (err) {
      console.error("Erro ao salvar documento fiscal no Postgres:", err);
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['fiscal_documents'] || '[]';
    try {
      const docs = JSON.parse(docsRaw);
      const idx = docs.findIndex((d: any) => d.id === doc.id && d.company_id === companyId);
      if (idx !== -1) {
        docs[idx] = {
          ...docs[idx],
          status: doc.status,
          version: doc.version,
          xml_content: doc.xml_content,
          updated_at: now
        };
      } else {
        docs.push({
          id: doc.id,
          company_id: companyId,
          document_type: doc.document_type,
          document_number: doc.document_number,
          document_series: doc.document_series,
          status: doc.status,
          version: doc.version,
          xml_content: doc.xml_content,
          created_by: doc.created_by,
          created_at: now,
          updated_at: now
        });
      }
      dbInMemoryLocal.global['fiscal_documents'] = JSON.stringify(docs);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar documento fiscal em memória local:", e);
    }
  }
}

export async function deleteFiscalDocument(companyId: string, id: string): Promise<boolean> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`DELETE FROM fiscal_documents WHERE company_id = $1 AND id = $2`, [companyId, id]);
      return (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.error("Erro ao deletar documento fiscal no Postgres:", err);
      return false;
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['fiscal_documents'] || '[]';
    try {
      let docs = JSON.parse(docsRaw);
      const originalLength = docs.length;
      docs = docs.filter((d: any) => !(d.company_id === companyId && d.id === id));
      dbInMemoryLocal.global['fiscal_documents'] = JSON.stringify(docs);
      scheduleSaveLocalFallback();
      return docs.length < originalLength;
    } catch (e) {
      return false;
    }
  }
}

// --- METODOS DE CERTIFICADOS DIGITAIS ---
export async function getCompanyCertificates(companyId: string): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM certificates WHERE company_id = $1 ORDER BY created_at DESC`, [companyId]);
      return res.rows;
    } catch (err) {
      console.error("Erro ao obter todos os certificados no Postgres:", err);
      return [];
    }
  } else {
    const certsRaw = dbInMemoryLocal.global['certificates'] || '[]';
    try {
      const certs = JSON.parse(certsRaw);
      return certs.filter((c: any) => c.company_id === companyId);
    } catch (e) {
      return [];
    }
  }
}

export async function saveCertificate(companyId: string, cert: {
  id: string;
  certificate_name: string;
  certificate_type: string;
  encrypted_certificate: string;
  encrypted_password: string;
  serial_number?: string;
  issuer?: string;
  subject?: string;
  valid_from?: string;
  valid_until?: string;
  status?: string;
  is_active?: boolean;
  uploaded_by?: string;
}): Promise<void> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO certificates (
          id, company_id, certificate_name, certificate_type, encrypted_certificate, encrypted_password,
          serial_number, issuer, subject, valid_from, valid_until, status, is_active, uploaded_by, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $15)
        ON CONFLICT (id) DO UPDATE SET
          certificate_name = EXCLUDED.certificate_name,
          certificate_type = EXCLUDED.certificate_type,
          encrypted_certificate = EXCLUDED.encrypted_certificate,
          encrypted_password = EXCLUDED.encrypted_password,
          serial_number = EXCLUDED.serial_number,
          issuer = EXCLUDED.issuer,
          subject = EXCLUDED.subject,
          valid_from = EXCLUDED.valid_from,
          valid_until = EXCLUDED.valid_until,
          status = EXCLUDED.status,
          is_active = EXCLUDED.is_active,
          updated_at = EXCLUDED.updated_at
      `, [
        cert.id, companyId, cert.certificate_name, cert.certificate_type, cert.encrypted_certificate, cert.encrypted_password,
        cert.serial_number || null, cert.issuer || null, cert.subject || null, cert.valid_from || null, cert.valid_until || null,
        cert.status || 'Ativo', cert.is_active !== undefined ? cert.is_active : true, cert.uploaded_by || null, now
      ]);
    } catch (err) {
      console.error("Erro ao salvar certificado digital no Postgres:", err);
    }
  } else {
    const certsRaw = dbInMemoryLocal.global['certificates'] || '[]';
    try {
      const certs = JSON.parse(certsRaw);
      const idx = certs.findIndex((c: any) => c.id === cert.id && c.company_id === companyId);
      const item = {
        id: cert.id,
        company_id: companyId,
        certificate_name: cert.certificate_name,
        certificate_type: cert.certificate_type,
        encrypted_certificate: cert.encrypted_certificate,
        encrypted_password: cert.encrypted_password,
        serial_number: cert.serial_number || '',
        issuer: cert.issuer || '',
        subject: cert.subject || '',
        valid_from: cert.valid_from || now,
        valid_until: cert.valid_until || now,
        status: cert.status || 'Ativo',
        is_active: cert.is_active !== undefined ? cert.is_active : true,
        uploaded_by: cert.uploaded_by || '',
        created_at: now,
        updated_at: now
      };
      if (idx !== -1) {
        certs[idx] = { ...certs[idx], ...item, updated_at: now };
      } else {
        certs.push(item);
      }
      dbInMemoryLocal.global['certificates'] = JSON.stringify(certs);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar certificado digital em memória local:", e);
    }
  }
}

export async function deleteCertificate(companyId: string, id: string): Promise<boolean> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`DELETE FROM certificates WHERE company_id = $1 AND id = $2`, [companyId, id]);
      return (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.error("Erro ao deletar certificado no Postgres:", err);
      return false;
    }
  } else {
    const certsRaw = dbInMemoryLocal.global['certificates'] || '[]';
    try {
      let certs = JSON.parse(certsRaw);
      const originalLength = certs.length;
      certs = certs.filter((c: any) => !(c.company_id === companyId && c.id === id));
      dbInMemoryLocal.global['certificates'] = JSON.stringify(certs);
      scheduleSaveLocalFallback();
      return certs.length < originalLength;
    } catch (e) {
      return false;
    }
  }
}

// --- METODOS DE ASSINATURAS FISCAIS GERADAS (SIGNED DOCUMENTS) ---
export async function getSignedDocuments(companyId: string): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM signed_documents WHERE company_id = $1 ORDER BY signed_at DESC`, [companyId]);
      return res.rows;
    } catch (err) {
      console.error("Erro ao obter assinaturas digitais no Postgres:", err);
      return [];
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['signed_documents'] || '[]';
    try {
      const docs = JSON.parse(docsRaw);
      return docs.filter((d: any) => d.company_id === companyId);
    } catch (e) {
      return [];
    }
  }
}

export async function saveSignedDocument(companyId: string, doc: {
  id: string;
  document_id: string;
  certificate_id: string | null;
  signature_hash: string;
  signature_status: string;
  signed_xml: string;
  signed_by?: string;
}): Promise<void> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO signed_documents (
          id, company_id, document_id, certificate_id, signature_hash, signature_status, signed_xml, signed_by, signed_at, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9, $9)
        ON CONFLICT (id) DO UPDATE SET
          signature_hash = EXCLUDED.signature_hash,
          signature_status = EXCLUDED.signature_status,
          signed_xml = EXCLUDED.signed_xml,
          updated_at = EXCLUDED.updated_at
      `, [doc.id, companyId, doc.document_id, doc.certificate_id, doc.signature_hash, doc.signature_status, doc.signed_xml, doc.signed_by || null, now]);
    } catch (err) {
      console.error("Erro ao salvar assinatura digital no Postgres:", err);
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['signed_documents'] || '[]';
    try {
      const docs = JSON.parse(docsRaw);
      const idx = docs.findIndex((d: any) => d.id === doc.id && d.company_id === companyId);
      const item = {
        id: doc.id,
        company_id: companyId,
        document_id: doc.document_id,
        certificate_id: doc.certificate_id,
        signature_hash: doc.signature_hash,
        signature_status: doc.signature_status,
        signed_xml: doc.signed_xml,
        signed_by: doc.signed_by || '',
        signed_at: now,
        created_at: now,
        updated_at: now
      };
      if (idx !== -1) {
        docs[idx] = { ...docs[idx], ...item, updated_at: now };
      } else {
        docs.push(item);
      }
      dbInMemoryLocal.global['signed_documents'] = JSON.stringify(docs);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar assinatura digital em memória local:", e);
    }
  }
}

export async function deleteSignedDocument(companyId: string, id: string): Promise<boolean> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`DELETE FROM signed_documents WHERE company_id = $1 AND id = $2`, [companyId, id]);
      return (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.error("Erro ao deletar assinatura digital no Postgres:", err);
      return false;
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['signed_documents'] || '[]';
    try {
      let docs = JSON.parse(docsRaw);
      const originalLength = docs.length;
      docs = docs.filter((d: any) => !(d.company_id === companyId && d.id === id));
      dbInMemoryLocal.global['signed_documents'] = JSON.stringify(docs);
      scheduleSaveLocalFallback();
      return docs.length < originalLength;
    } catch (e) {
      return false;
    }
  }
}

// --- METODOS DE PROTOCOLOS SEFAZ ---
export async function saveSefazProtocol(companyId: string, protocol: {
  id: string;
  document_id: string;
  receipt_number: string | null;
  protocol_number: string | null;
  status_code: string;
  status_message: string;
  authorized: boolean;
  received_at: string;
}): Promise<void> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO sefaz_protocols (
          id, company_id, document_id, receipt_number, protocol_number, status_code, status_message, authorized, received_at, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
        ON CONFLICT (id) DO UPDATE SET
          receipt_number = EXCLUDED.receipt_number,
          protocol_number = EXCLUDED.protocol_number,
          status_code = EXCLUDED.status_code,
          status_message = EXCLUDED.status_message,
          authorized = EXCLUDED.authorized,
          received_at = EXCLUDED.received_at,
          updated_at = EXCLUDED.updated_at
      `, [
        protocol.id,
        companyId,
        protocol.document_id,
        protocol.receipt_number,
        protocol.protocol_number,
        protocol.status_code,
        protocol.status_message,
        protocol.authorized,
        protocol.received_at,
        now
      ]);
    } catch (err) {
      console.error("Erro ao salvar protocolo SEFAZ no Postgres:", err);
    }
  } else {
    const protocolsRaw = dbInMemoryLocal.global['sefaz_protocols'] || '[]';
    try {
      const protocols = JSON.parse(protocolsRaw);
      const idx = protocols.findIndex((p: any) => p.id === protocol.id && p.company_id === companyId);
      const item = {
        id: protocol.id,
        company_id: companyId,
        document_id: protocol.document_id,
        receipt_number: protocol.receipt_number,
        protocol_number: protocol.protocol_number,
        status_code: protocol.status_code,
        status_message: protocol.status_message,
        authorized: protocol.authorized,
        received_at: protocol.received_at,
        created_at: now,
        updated_at: now
      };
      if (idx !== -1) {
        protocols[idx] = { ...protocols[idx], ...item, updated_at: now };
      } else {
        protocols.push(item);
      }
      dbInMemoryLocal.global['sefaz_protocols'] = JSON.stringify(protocols);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar protocolo SEFAZ em memória local:", e);
    }
  }
}

export async function getSefazProtocols(companyId: string): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM sefaz_protocols WHERE company_id = $1 ORDER BY created_at DESC`, [companyId]);
      return res.rows;
    } catch (err) {
      console.error("Erro ao obter protocolos SEFAZ no Postgres:", err);
      return [];
    }
  } else {
    const protocolsRaw = dbInMemoryLocal.global['sefaz_protocols'] || '[]';
    try {
      const protocols = JSON.parse(protocolsRaw);
      return protocols.filter((p: any) => p.company_id === companyId).sort((a: any, b: any) => b.created_at.localeCompare(a.created_at));
    } catch (e) {
      return [];
    }
  }
}

export async function saveFiscalEvent(companyId: string, event: {
  id: string;
  document_id: string | null;
  event_type: string;
  event_sequence: number;
  protocol_number: string | null;
  status_code: string | null;
  status_message: string | null;
  event_xml: string | null;
  response_xml: string | null;
  created_by: string;
}): Promise<void> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO fiscal_events (
          id, company_id, document_id, event_type, event_sequence, protocol_number,
          status_code, status_message, event_xml, response_xml, created_by, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO UPDATE SET
          document_id = EXCLUDED.document_id,
          event_type = EXCLUDED.event_type,
          event_sequence = EXCLUDED.event_sequence,
          protocol_number = EXCLUDED.protocol_number,
          status_code = EXCLUDED.status_code,
          status_message = EXCLUDED.status_message,
          event_xml = EXCLUDED.event_xml,
          response_xml = EXCLUDED.response_xml,
          created_by = EXCLUDED.created_by,
          updated_at = EXCLUDED.updated_at
      `, [
        event.id,
        companyId,
        event.document_id,
        event.event_type,
        event.event_sequence,
        event.protocol_number,
        event.status_code,
        event.status_message,
        event.event_xml,
        event.response_xml,
        event.created_by,
        now,
        now
      ]);
    } catch (err) {
      console.error("Erro ao salvar evento fiscal no Postgres:", err);
    }
  } else {
    const eventsRaw = dbInMemoryLocal.global['fiscal_events'] || '[]';
    try {
      const events = JSON.parse(eventsRaw);
      const idx = events.findIndex((e: any) => e.id === event.id);
      const item = {
        ...event,
        company_id: companyId,
        created_at: now,
        updated_at: now
      };
      if (idx !== -1) {
        events[idx] = { ...events[idx], ...item, updated_at: now };
      } else {
        events.push(item);
      }
      dbInMemoryLocal.global['fiscal_events'] = JSON.stringify(events);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar evento fiscal em memória local:", e);
    }
  }
}

export async function getFiscalEvents(companyId: string, documentId?: string): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    try {
      let queryStr = `SELECT * FROM fiscal_events WHERE company_id = $1`;
      let params = [companyId];
      if (documentId) {
        queryStr += ` AND document_id = $2`;
        params.push(documentId);
      }
      queryStr += ` ORDER BY created_at DESC`;
      const res = await pgPool.query(queryStr, params);
      return res.rows;
    } catch (err) {
      console.error("Erro ao obter eventos fiscais no Postgres:", err);
      return [];
    }
  } else {
    const eventsRaw = dbInMemoryLocal.global['fiscal_events'] || '[]';
    try {
      const events = JSON.parse(eventsRaw);
      let filtered = events.filter((e: any) => e.company_id === companyId);
      if (documentId) {
        filtered = filtered.filter((e: any) => e.document_id === documentId);
      }
      return filtered.sort((a: any, b: any) => b.created_at.localeCompare(a.created_at));
    } catch (e) {
      return [];
    }
  }
}

export async function updateFiscalDocumentStatus(companyId: string, id: string, status: string, authorizedXml?: string): Promise<boolean> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      let queryStr = `UPDATE fiscal_documents SET status = $1, updated_at = $2`;
      const queryParams: any[] = [status, now, id, companyId];
      if (authorizedXml) {
        queryStr += `, xml_content = $5`;
        queryParams.push(authorizedXml);
      }
      queryStr += ` WHERE id = $3 AND company_id = $4`;
      const res = await pgPool.query(queryStr, queryParams);
      return (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.error("Erro ao atualizar status do xml no Postgres:", err);
      return false;
    }
  } else {
    const docsRaw = dbInMemoryLocal.global['fiscal_documents'] || '[]';
    try {
      const docs = JSON.parse(docsRaw);
      const idx = docs.findIndex((d: any) => d.id === id && d.company_id === companyId);
      if (idx !== -1) {
        docs[idx].status = status;
        docs[idx].updated_at = now;
        if (authorizedXml) {
          docs[idx].xml_content = authorizedXml;
        }
        dbInMemoryLocal.global['fiscal_documents'] = JSON.stringify(docs);
        scheduleSaveLocalFallback();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

// --- METODOS DE NFE_DOCUMENTS COMPLETOS ---
export async function saveNfeDocument(companyId: string, doc: {
  id: string,
  invoice_number: number,
  series: number,
  access_key?: string,
  customer_id?: string,
  status: string,
  issue_date?: string,
  total_value: number,
  xml_original?: string,
  xml_signed?: string,
  xml_authorized?: string,
  protocol_number?: string,
  created_by?: string
}): Promise<void> {
  const now = new Date().toISOString();
  const issueDate = doc.issue_date || now;
  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO nfe_documents (
          id, company_id, invoice_number, series, access_key, customer_id, status, issue_date, total_value, xml_original, xml_signed, xml_authorized, protocol_number, created_by, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $15)
        ON CONFLICT (id) DO UPDATE SET
          access_key = COALESCE(EXCLUDED.access_key, nfe_documents.access_key),
          status = EXCLUDED.status,
          total_value = EXCLUDED.total_value,
          xml_original = COALESCE(EXCLUDED.xml_original, nfe_documents.xml_original),
          xml_signed = COALESCE(EXCLUDED.xml_signed, nfe_documents.xml_signed),
          xml_authorized = COALESCE(EXCLUDED.xml_authorized, nfe_documents.xml_authorized),
          protocol_number = COALESCE(EXCLUDED.protocol_number, nfe_documents.protocol_number),
          updated_at = EXCLUDED.updated_at
      `, [
        doc.id,
        companyId,
        doc.invoice_number,
        doc.series,
        doc.access_key || null,
        doc.customer_id || null,
        doc.status,
        issueDate,
        doc.total_value,
        doc.xml_original || null,
        doc.xml_signed || null,
        doc.xml_authorized || null,
        doc.protocol_number || null,
        doc.created_by || null,
        now
      ]);
    } catch (err) {
      console.error("Erro ao salvar nfe_document no Postgres:", err);
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfe_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      const idx = list.findIndex((item: any) => item.id === doc.id && item.company_id === companyId);
      const itemData = {
        id: doc.id,
        company_id: companyId,
        invoice_number: doc.invoice_number,
        series: doc.series,
        access_key: doc.access_key || null,
        customer_id: doc.customer_id || null,
        status: doc.status,
        issue_date: issueDate,
        total_value: doc.total_value,
        xml_original: doc.xml_original || null,
        xml_signed: doc.xml_signed || null,
        xml_authorized: doc.xml_authorized || null,
        protocol_number: doc.protocol_number || null,
        created_by: doc.created_by || null,
        created_at: now,
        updated_at: now
      };
      if (idx !== -1) {
        list[idx] = { 
          ...list[idx], 
          ...itemData,
          xml_original: doc.xml_original || list[idx].xml_original,
          xml_signed: doc.xml_signed || list[idx].xml_signed,
          xml_authorized: doc.xml_authorized || list[idx].xml_authorized,
          protocol_number: doc.protocol_number || list[idx].protocol_number,
          access_key: doc.access_key || list[idx].access_key,
          updated_at: now 
        };
      } else {
        list.push(itemData);
      }
      dbInMemoryLocal.global['nfe_documents'] = JSON.stringify(list);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar nfe_document em memória:", e);
    }
  }
}

export async function getNfeDocuments(companyId: string, filters?: { 
  invoice_number?: number, 
  series?: number, 
  customer_id?: string, 
  status?: string 
}): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    try {
      let queryStr = `SELECT * FROM nfe_documents WHERE company_id = $1`;
      const params: any[] = [companyId];
      let pIdx = 2;
      
      if (filters?.invoice_number) {
        queryStr += ` AND invoice_number = $${pIdx++}`;
        params.push(filters.invoice_number);
      }
      if (filters?.series) {
        queryStr += ` AND series = $${pIdx++}`;
        params.push(filters.series);
      }
      if (filters?.customer_id) {
        queryStr += ` AND customer_id = $${pIdx++}`;
        params.push(filters.customer_id);
      }
      if (filters?.status) {
        queryStr += ` AND status = $${pIdx++}`;
        params.push(filters.status);
      }
      
      queryStr += ` ORDER BY issue_date DESC, invoice_number DESC`;
      const res = await pgPool.query(queryStr, params);
      return res.rows;
    } catch (err) {
      console.error("Erro ao ler nfe_documents no Postgres:", err);
      return [];
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfe_documents'] || '[]';
    try {
      let list = JSON.parse(listRaw);
      list = list.filter((item: any) => item.company_id === companyId);
      
      if (filters?.invoice_number) {
        list = list.filter((item: any) => item.invoice_number === filters.invoice_number);
      }
      if (filters?.series) {
        list = list.filter((item: any) => item.series === filters.series);
      }
      if (filters?.customer_id) {
        list = list.filter((item: any) => item.customer_id === filters.customer_id);
      }
      if (filters?.status) {
        list = list.filter((item: any) => item.status === filters.status);
      }
      return list.sort((a: any, b: any) => b.issue_date.localeCompare(a.issue_date));
    } catch (e) {
      return [];
    }
  }
}

export async function getNfeDocumentById(companyId: string, id: string): Promise<any | null> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM nfe_documents WHERE company_id = $1 AND id = $2`, [companyId, id]);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Erro ao obter nfe_document por ID:", err);
      return null;
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfe_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      return list.find((item: any) => item.company_id === companyId && item.id === id) || null;
    } catch (e) {
      return null;
    }
  }
}

export async function updateNfeDocumentStatus(companyId: string, id: string, status: string, fields?: {
  xml_signed?: string,
  xml_authorized?: string,
  protocol_number?: string,
  access_key?: string
}): Promise<boolean> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      let queryStr = `UPDATE nfe_documents SET status = $1, updated_at = $2`;
      const params: any[] = [status, now, id, companyId];
      let pIdx = 5;
      
      if (fields?.xml_signed) {
        queryStr += `, xml_signed = $${pIdx++}`;
        params.push(fields.xml_signed);
      }
      if (fields?.xml_authorized) {
        queryStr += `, xml_authorized = $${pIdx++}`;
        params.push(fields.xml_authorized);
      }
      if (fields?.protocol_number) {
        queryStr += `, protocol_number = $${pIdx++}`;
        params.push(fields.protocol_number);
      }
      if (fields?.access_key) {
        queryStr += `, access_key = $${pIdx++}`;
        params.push(fields.access_key);
      }
      
      queryStr += ` WHERE id = $3 AND company_id = $4`;
      const res = await pgPool.query(queryStr, params);
      return (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.error("Erro ao atualizar status de nfe_document no Postgres:", err);
      return false;
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfe_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      const idx = list.findIndex((item: any) => item.id === id && item.company_id === companyId);
      if (idx !== -1) {
        list[idx].status = status;
        list[idx].updated_at = now;
        if (fields?.xml_signed) list[idx].xml_signed = fields.xml_signed;
        if (fields?.xml_authorized) list[idx].xml_authorized = fields.xml_authorized;
        if (fields?.protocol_number) list[idx].protocol_number = fields.protocol_number;
        if (fields?.access_key) list[idx].access_key = fields.access_key;
        
        dbInMemoryLocal.global['nfe_documents'] = JSON.stringify(list);
        scheduleSaveLocalFallback();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

// Helper methods for danfe_documents
export async function saveDanfeDocument(companyId: string, doc: {
  id: string;
  nfe_id: string;
  pdf_path: string;
  generation_hash: string;
  generated_by: string;
}): Promise<void> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO danfe_documents (id, company_id, nfe_id, pdf_path, generation_hash, generated_by, generated_at, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $7, $7)
        ON CONFLICT (id) DO UPDATE SET
          pdf_path = EXCLUDED.pdf_path,
          generation_hash = EXCLUDED.generation_hash,
          generated_by = EXCLUDED.generated_by,
          updated_at = EXCLUDED.updated_at
      `, [doc.id, companyId, doc.nfe_id, doc.pdf_path, doc.generation_hash, doc.generated_by, now]);
    } catch (err) {
      console.error("Erro ao salvar danfe_document no Postgres:", err);
      throw err;
    }
  } else {
    const listRaw = dbInMemoryLocal.global['danfe_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      const existingIdx = list.findIndex((item: any) => item.id === doc.id && item.company_id === companyId);
      const newDoc = {
        id: doc.id,
        company_id: companyId,
        nfe_id: doc.nfe_id,
        pdf_path: doc.pdf_path,
        generation_hash: doc.generation_hash,
        generated_by: doc.generated_by,
        generated_at: now,
        created_at: now,
        updated_at: now
      };
      if (existingIdx !== -1) {
        list[existingIdx] = { ...list[existingIdx], ...newDoc, created_at: list[existingIdx].created_at };
      } else {
        list.push(newDoc);
      }
      dbInMemoryLocal.global['danfe_documents'] = JSON.stringify(list);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar danfe_document em fallback local:", e);
    }
  }
}

export async function getDanfeDocuments(companyId: string, filters?: { nfe_id?: string }): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    try {
      let queryStr = `SELECT * FROM danfe_documents WHERE company_id = $1`;
      const params: any[] = [companyId];
      if (filters?.nfe_id) {
        queryStr += ` AND nfe_id = $2`;
        params.push(filters.nfe_id);
      }
      queryStr += ` ORDER BY generated_at DESC`;
      const res = await pgPool.query(queryStr, params);
      return res.rows;
    } catch (err) {
      console.error("Erro ao ler listagem de DANFE no Postgres:", err);
      return [];
    }
  } else {
    const listRaw = dbInMemoryLocal.global['danfe_documents'] || '[]';
    try {
      let list = JSON.parse(listRaw);
      list = list.filter((item: any) => item.company_id === companyId);
      if (filters?.nfe_id) {
        list = list.filter((item: any) => item.nfe_id === filters.nfe_id);
      }
      return list.sort((a: any, b: any) => b.generated_at.localeCompare(a.generated_at));
    } catch (e) {
      return [];
    }
  }
}

export async function getDanfeDocumentById(companyId: string, id: string): Promise<any | null> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM danfe_documents WHERE company_id = $1 AND id = $2`, [companyId, id]);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Erro ao ler DANFE por ID no Postgres:", err);
      return null;
    }
  } else {
    const listRaw = dbInMemoryLocal.global['danfe_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      return list.find((item: any) => item.company_id === companyId && item.id === id) || null;
    } catch (e) {
      return null;
    }
  }
}

export async function getDanfeDocumentByNfeId(companyId: string, nfeId: string): Promise<any | null> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM danfe_documents WHERE company_id = $1 AND nfe_id = $2 ORDER BY generated_at DESC LIMIT 1`, [companyId, nfeId]);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Erro ao ler DANFE por NFe ID no Postgres:", err);
      return null;
    }
  } else {
    const listRaw = dbInMemoryLocal.global['danfe_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      const docs = list.filter((item: any) => item.company_id === companyId && item.nfe_id === nfeId);
      if (docs.length === 0) return null;
      docs.sort((a: any, b: any) => b.generated_at.localeCompare(a.generated_at));
      return docs[0];
    } catch (e) {
      return null;
    }
  }
}

export async function saveNfceDocument(companyId: string, doc: {
  id: string;
  number: number;
  series: number;
  access_key?: string;
  customer_document?: string;
  customer_name?: string;
  total_value: number;
  payment_method: string;
  status: string;
  protocol_number?: string;
  xml_signed?: string;
  xml_authorized?: string;
  issued_at?: string;
  created_by?: string;
  items?: any;
}): Promise<void> {
  const now = new Date().toISOString();
  const issuedAt = doc.issued_at || now;
  const itemsJson = doc.items ? JSON.stringify(doc.items) : '[]';

  if (isPostgresActive && pgPool) {
    try {
      await pgPool.query(`
        INSERT INTO nfce_documents (
          id, company_id, number, series, access_key, customer_document, customer_name, total_value, payment_method, status, protocol_number, xml_signed, xml_authorized, issued_at, created_by, created_at, updated_at, items
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $16, $17)
        ON CONFLICT (id) DO UPDATE SET
          access_key = COALESCE(EXCLUDED.access_key, nfce_documents.access_key),
          status = EXCLUDED.status,
          total_value = EXCLUDED.total_value,
          payment_method = EXCLUDED.payment_method,
          xml_signed = COALESCE(EXCLUDED.xml_signed, nfce_documents.xml_signed),
          xml_authorized = COALESCE(EXCLUDED.xml_authorized, nfce_documents.xml_authorized),
          protocol_number = COALESCE(EXCLUDED.protocol_number, nfce_documents.protocol_number),
          updated_at = EXCLUDED.updated_at,
          items = COALESCE(EXCLUDED.items, nfce_documents.items)
      `, [
        doc.id,
        companyId,
        doc.number,
        doc.series,
        doc.access_key || null,
        doc.customer_document || null,
        doc.customer_name || null,
        doc.total_value,
        doc.payment_method,
        doc.status,
        doc.protocol_number || null,
        doc.xml_signed || null,
        doc.xml_authorized || null,
        issuedAt,
        doc.created_by || null,
        now,
        itemsJson
      ]);
    } catch (err) {
      console.error("Erro ao salvar nfce_document no Postgres:", err);
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfce_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      const idx = list.findIndex((item: any) => item.id === doc.id && item.company_id === companyId);
      const itemData = {
        id: doc.id,
        company_id: companyId,
        number: doc.number,
        series: doc.series,
        access_key: doc.access_key || null,
        customer_document: doc.customer_document || null,
        customer_name: doc.customer_name || null,
        total_value: doc.total_value,
        payment_method: doc.payment_method,
        status: doc.status,
        protocol_number: doc.protocol_number || null,
        xml_signed: doc.xml_signed || null,
        xml_authorized: doc.xml_authorized || null,
        issued_at: issuedAt,
        created_by: doc.created_by || null,
        created_at: now,
        updated_at: now,
        items: doc.items || []
      };
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...itemData,
          xml_signed: doc.xml_signed || list[idx].xml_signed,
          xml_authorized: doc.xml_authorized || list[idx].xml_authorized,
          protocol_number: doc.protocol_number || list[idx].protocol_number,
          access_key: doc.access_key || list[idx].access_key,
          updated_at: now
        };
      } else {
        list.push(itemData);
      }
      dbInMemoryLocal.global['nfce_documents'] = JSON.stringify(list);
      scheduleSaveLocalFallback();
    } catch (e) {
      console.error("Erro ao salvar nfce_document em memória:", e);
    }
  }
}

export async function getNfceDocuments(companyId: string, filters?: {
  number?: number,
  series?: number,
  customer_document?: string,
  status?: string
}): Promise<any[]> {
  if (isPostgresActive && pgPool) {
    try {
      let queryStr = `SELECT * FROM nfce_documents WHERE company_id = $1`;
      const params: any[] = [companyId];
      let pIdx = 2;

      if (filters?.number) {
        queryStr += ` AND number = $${pIdx++}`;
        params.push(filters.number);
      }
      if (filters?.series) {
        queryStr += ` AND series = $${pIdx++}`;
        params.push(filters.series);
      }
      if (filters?.customer_document) {
        queryStr += ` AND customer_document = $${pIdx++}`;
        params.push(filters.customer_document);
      }
      if (filters?.status) {
        queryStr += ` AND status = $${pIdx++}`;
        params.push(filters.status);
      }

      queryStr += ` ORDER BY issued_at DESC, number DESC`;
      const res = await pgPool.query(queryStr, params);
      return res.rows;
    } catch (err) {
      console.error("Erro ao ler nfce_documents no Postgres:", err);
      return [];
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfce_documents'] || '[]';
    try {
      let list = JSON.parse(listRaw);
      list = list.filter((item: any) => item.company_id === companyId);

      if (filters?.number) {
        list = list.filter((item: any) => item.number === filters.number);
      }
      if (filters?.series) {
        list = list.filter((item: any) => item.series === filters.series);
      }
      if (filters?.customer_document) {
        list = list.filter((item: any) => item.customer_document === filters.customer_document);
      }
      if (filters?.status) {
        list = list.filter((item: any) => item.status === filters.status);
      }
      return list.sort((a: any, b: any) => b.issued_at.localeCompare(a.issued_at));
    } catch (e) {
      return [];
    }
  }
}

export async function getNfceDocumentById(companyId: string, id: string): Promise<any | null> {
  if (isPostgresActive && pgPool) {
    try {
      const res = await pgPool.query(`SELECT * FROM nfce_documents WHERE company_id = $1 AND id = $2`, [companyId, id]);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Erro ao obter nfce_document por ID no Postgres:", err);
      return null;
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfce_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      return list.find((item: any) => item.company_id === companyId && item.id === id) || null;
    } catch (e) {
      return null;
    }
  }
}

export async function updateNfceDocumentStatus(companyId: string, id: string, status: string, fields?: {
  xml_signed?: string,
  xml_authorized?: string,
  protocol_number?: string,
  access_key?: string
}): Promise<boolean> {
  const now = new Date().toISOString();
  if (isPostgresActive && pgPool) {
    try {
      let queryStr = `UPDATE nfce_documents SET status = $1, updated_at = $2`;
      const params: any[] = [status, now, id, companyId];
      let pIdx = 5;

      if (fields?.xml_signed) {
        queryStr += `, xml_signed = $${pIdx++}`;
        params.push(fields.xml_signed);
      }
      if (fields?.xml_authorized) {
        queryStr += `, xml_authorized = $${pIdx++}`;
        params.push(fields.xml_authorized);
      }
      if (fields?.protocol_number) {
        queryStr += `, protocol_number = $${pIdx++}`;
        params.push(fields.protocol_number);
      }
      if (fields?.access_key) {
        queryStr += `, access_key = $${pIdx++}`;
        params.push(fields.access_key);
      }

      queryStr += ` WHERE id = $3 AND company_id = $4`;
      const res = await pgPool.query(queryStr, params);
      return (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.error("Erro ao atualizar status de nfce_document no Postgres:", err);
      return false;
    }
  } else {
    const listRaw = dbInMemoryLocal.global['nfce_documents'] || '[]';
    try {
      const list = JSON.parse(listRaw);
      const idx = list.findIndex((item: any) => item.id === id && item.company_id === companyId);
      if (idx !== -1) {
        list[idx].status = status;
        list[idx].updated_at = now;
        if (fields?.xml_signed) list[idx].xml_signed = fields.xml_signed;
        if (fields?.xml_authorized) list[idx].xml_authorized = fields.xml_authorized;
        if (fields?.protocol_number) list[idx].protocol_number = fields.protocol_number;
        if (fields?.access_key) list[idx].access_key = fields.access_key;

        dbInMemoryLocal.global['nfce_documents'] = JSON.stringify(list);
        scheduleSaveLocalFallback();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

// Dummy variables for backward compatibility compile checks (unused in Postgres mode)
export const dbInMemoryLocal: any = { global: {}, user_data: {} };
export function scheduleSaveLocalFallback() {}


const fs = require('fs');

let code = fs.readFileSync('db.ts', 'utf8');

const additionalTables = `
    // Tabelas do Modulo de Eventos SEFAZ
    await client.query(\`
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
    \`);

    await client.query(\`
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
    \`);

    await client.query(\`
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
    \`);
`;

code = code.replace(/CREATE INDEX IF NOT EXISTS idx_event_protocol ON fiscal_events \(protocol_number\);\n\s*`\);/, "CREATE INDEX IF NOT EXISTS idx_event_protocol ON fiscal_events (protocol_number);\n    `);\n" + additionalTables);

fs.writeFileSync('db.ts', code, 'utf8');
console.log("Patched db.ts successfully.");

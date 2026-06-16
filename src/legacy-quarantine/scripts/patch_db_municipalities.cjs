const fs = require('fs');

let code = fs.readFileSync('db.ts', 'utf8');

const newTable = `
    // Tabela de Configuração Municipal para NFS-e (Integrações Reais)
    await client.query(\`
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
    \`);
`;

code = code.replace(/console\.log\("⚙️ Inicializando Banco de Dados Local .Mock.\\!"\);/, newTable + "\n    console.log(\"⚙️ Inicializando Banco de Dados Local [Mock]!\");");
// Wait, is it before that? Let's check where the other table creations are inside `db.ts`...
code = code.replace(/await client\.query\(\`\n      CREATE TABLE IF NOT EXISTS nfse_settings/, newTable + "\n    await client.query(`\n      CREATE TABLE IF NOT EXISTS nfse_settings");

fs.writeFileSync('db.ts', code, 'utf8');
console.log("Patched db.ts with nfse_municipalities table.");

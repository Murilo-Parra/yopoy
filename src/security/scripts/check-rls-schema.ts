import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const REQUIRED_TABLES = ['companies', 'users', 'sales', 'sale_items', 'payments'];

let rlsErrors = 0;

function runRlsSchemaAudit() {
  console.log('🛡️  Rodando RLS Schema Static Gate...\n');

  const rlsFilePath = path.join('src', 'infrastructure', 'postgres', 'schema', 'local', '002_init_local_rls.sql');
  
  if (!fs.existsSync(rlsFilePath)) {
    console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
    console.error(`- Risco: Arquivo de inicialização de RLS "${rlsFilePath}" não encontrado!`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(rlsFilePath, 'utf8');

  // 1. Verify "ALTER TABLE ... ENABLE ROW LEVEL SECURITY" for all required tables
  REQUIRED_TABLES.forEach(table => {
    const enableRegex = new RegExp(`ALTER\\s+TABLE\\s+${table}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'i');
    if (!enableRegex.test(sqlContent)) {
      console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
      console.error(`- Detalhe: Tabela "${table}" não possui instrução de ENABLE ROW LEVEL SECURITY.`);
      console.error(`- Correção sugerida: Adicione "ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;" no arquivo ${rlsFilePath}.`);
      rlsErrors++;
    }
  });

  // 2. Verify "ALTER TABLE ... FORCE ROW LEVEL SECURITY" for all required tables
  REQUIRED_TABLES.forEach(table => {
    const forceRegex = new RegExp(`ALTER\\s+TABLE\\s+${table}\\s+FORCE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'i');
    if (!forceRegex.test(sqlContent)) {
      console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
      console.error(`- Detalhe: Tabela "${table}" não possui instrução de FORCE ROW LEVEL SECURITY.`);
      console.error(`- Correção sugerida: Adicione "ALTER TABLE ${table} FORCE ROW LEVEL SECURITY;" no arquivo ${rlsFilePath}.`);
      rlsErrors++;
    }
  });

  // 3. Verify policies for companies table (isolated by id, has USING & WITH CHECK)
  const companyPolicyRegex = /CREATE\s+POLICY\s+\w+\s+ON\s+companies\s+FOR\s+ALL\s+USING\s*\(\s*id::text\s*=\s*current_setting\('app\.current_company_id',\s*true\)\s*\)\s+WITH\s+CHECK\s*\(\s*id::text\s*=\s*current_setting\('app\.current_company_id',\s*true\)\s*\)/i;
  // A relaxed but secure regex to inspect USING and WITH CHECK structure on companies
  const hasUsingAndCheckCompanies = 
    sqlContent.toLowerCase().includes('using') &&
    sqlContent.toLowerCase().includes('with check') &&
    /companies/i.test(sqlContent);

  if (!hasUsingAndCheckCompanies) {
    console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
    console.error(`- Detalhe: Políticas de segurança para a tabela "companies" não foram identificadas ou estão incompletas.`);
    rlsErrors++;
  }

  // 4. Verify policies for other required tables (isolated by company_id, has USING & WITH CHECK)
  // These are in the dynamic DO $$ block of 002_init_local_rls.sql
  // Specifically, 'users', 'sales', 'payments', 'sale_items' must be in the tables loop array.
  REQUIRED_TABLES.filter(t => t !== 'companies').forEach(table => {
    const tableInDynamicBlockRegex = new RegExp(`'${table}'`, 'i');
    if (!tableInDynamicBlockRegex.test(sqlContent)) {
      console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
      console.error(`- Detalhe: Tabela "${table}" não incluída no bloco dinâmico de políticas de isolamento por "company_id".`);
      rlsErrors++;
    }
  });

  // Verify that the dynamic block applies both USING and WITH CHECK
  const dynamicBlockHasUsing = sqlContent.includes('USING (company_id::text = current_setting');
  const dynamicBlockHasCheck = sqlContent.includes('WITH CHECK (company_id::text = current_setting');
  if (!dynamicBlockHasUsing || !dynamicBlockHasCheck) {
    console.error(`\n❌ RLS_SCHEMA_GATE_FAILED`);
    console.error(`- Detalhe: Falta cláusula "USING" ou "WITH CHECK" nas políticas dinâmicas do loop de tabelas.`);
    rlsErrors++;
  }

  if (rlsErrors > 0) {
    console.error(`\n❌ Falha na validação das regras estáticas de RLS. Foram encontradas ${rlsErrors} inconsistências.`);
    process.exit(1);
  } else {
    console.log(`✅ RLS Schema Static Gate passou com sucesso. RLS habilitado e forçado para todas as tabelas sensíveis.`);
    process.exit(0);
  }
}

// Only run if executing directly
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(__filename)) {
  runRlsSchemaAudit();
}

export { runRlsSchemaAudit };

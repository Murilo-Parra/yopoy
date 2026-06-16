import { Pool } from "pg";

async function testConnection() {
  const password = "zFGu%k*N?9/yv/v";
  const encodedPassword = encodeURIComponent(password);
  const projRef = "jymucotbvrdspjczpkks";
  const dbname = "postgres";
  const host = "aws-0-us-east-1.pooler.supabase.com";

  console.log(`\n--- Teste 6: process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" + Connection String Direta con ?sslmode=require ---`);
  
  // Define o override de rejeição de TLS no nível de processo node
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
    const connStr = `postgresql://postgres.${projRef}:${encodedPassword}@${host}:6543/${dbname}?sslmode=require`;
    
    const pool = new Pool({
      connectionString: connStr,
      connectionTimeoutMillis: 5000
    });

    const client = await pool.connect();
    const res = await client.query("SELECT version() AS version, current_database() AS db_name;");
    console.log(`\n🎉🎉🎉 SUCESSO ABSOLUTO NO TESTE 6! 🎉🎉🎉`);
    console.log(`Versão estável detectada:`, res.rows[0].version);
    console.log(`Banco conectado:`, res.rows[0].db_name);
    
    client.release();
    await pool.end();
  } catch (err: any) {
    console.log(`❌ Erro no Teste 6:`, err.message);
  }
}

testConnection();

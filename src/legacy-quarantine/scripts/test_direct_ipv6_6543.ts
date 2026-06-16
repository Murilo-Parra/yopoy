import { Pool } from "pg";

async function testDirectIpv6() {
  const password = "zFGu%k*N?9/yv/v";
  const encodedPassword = encodeURIComponent(password);
  const host = "db.jymucotbvrdspjczpkks.supabase.co";
  const port = 6543;
  const username = "postgres";
  const dbname = "postgres";

  console.log("=== TESTANDO CONEXÃO DIRETA IPV6 NA PORTA 6543 ===");
  console.log(`Conectando ao host: ${host}`);

  // Testamos duas formas:
  // Modo 1: Usando Connection String padrão com sslmode=require
  const connStr = `postgresql://${username}:${encodedPassword}@${host}:${port}/${dbname}?sslmode=require`;

  const pool = new Pool({
    connectionString: connStr,
    connectionTimeoutMillis: 5000
  });

  try {
    console.log("Tentando conexão via Connection String...");
    const client = await pool.connect();
    const res = await client.query("SELECT version() AS version, current_database() AS db_name;");
    console.log(`\n🎉🎉🎉 SUCESSO DE CONEXÃO DIRETA IPV6 NA PORTA 6543! 🎉🎉🎉`);
    console.log(`Versão:`, res.rows[0].version);
    console.log(`Banco conectado:`, res.rows[0].db_name);
    client.release();
    await pool.end();
    return;
  } catch (err: any) {
    console.log(`❌ Erro no Modo 1:`, err.message);
  } finally {
    await pool.end();
  }

  // Modo 2: Usando config por objeto, garantindo que o DNS IPv6 seja usado
  console.log("\nTentando conexão via Configuração de Objeto...");
  const poolObj = new Pool({
    host: host,
    port: port,
    user: username,
    password: password,
    database: dbname,
    ssl: true, // Requer SSL para conexões Supabase seguras
    connectionTimeoutMillis: 5000
  });

  try {
    const client = await poolObj.connect();
    const res = await client.query("SELECT version() AS version, current_database() AS db_name;");
    console.log(`\n🎉🎉🎉 SUCESSO DE CONEXÃO DIRETA IPV6 DE OBJETO NA PORTA 6543! 🎉🎉🎉`);
    console.log(`Versão:`, res.rows[0].version);
    console.log(`Banco conectado:`, res.rows[0].db_name);
    client.release();
  } catch (err: any) {
    console.log(`❌ Erro no Modo 2:`, err.message);
  } finally {
    await poolObj.end();
  }
}

testDirectIpv6();

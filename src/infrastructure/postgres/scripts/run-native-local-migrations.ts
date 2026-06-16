import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { assertLocalDatabaseUrl } from '../guards/assertLocalDatabaseUrl';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

async function runLocalMigrations() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL missing');
  
  assertLocalDatabaseUrl(dbUrl);

  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  console.log('✅ Connected to native local DB.');

  const schemasDir = path.join(__dirname, '../schema/local');
  const files = fs.readdirSync(schemasDir).sort();

  for (const file of files) {
    if (file.endsWith('.sql')) {
      console.log(`Executing ${file}...`);
      const sql = fs.readFileSync(path.join(schemasDir, file), 'utf8');
      
      if (sql.includes('PRODUCTION') && !sql.includes('DO NOT RUN AGAINST PRODUCTION')) {
         throw new Error(`Migration ${file} seems unsafe.`);
      }

      await client.query(sql);
      console.log(`✅ ${file} executed.`);
    }
  }

  await client.end();
  console.log('✅ Native local migrations completed.');
}

runLocalMigrations().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});

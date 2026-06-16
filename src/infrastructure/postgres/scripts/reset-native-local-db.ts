import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { assertLocalDatabaseUrl } from '../guards/assertLocalDatabaseUrl';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

async function resetNativeLocalDb() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL missing');
  
  assertLocalDatabaseUrl(dbUrl);

  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  console.log('✅ Connected to native local DB.');

  console.log('Dropping schema public cascade...');
  await client.query('DROP SCHEMA public CASCADE;');
  
  console.log('Creating schema public...');
  await client.query('CREATE SCHEMA public;');
  
  await client.end();
  console.log('✅ Native local db reset completed.');
}

resetNativeLocalDb().catch(err => {
  console.error('❌ Reset failed:', err);
  process.exit(1);
});

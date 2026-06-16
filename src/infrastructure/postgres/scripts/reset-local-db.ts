import * as dotenv from 'dotenv';
import { assertLocalDatabaseUrl } from '../guards/assertLocalDatabaseUrl';

dotenv.config();
dotenv.config({ path: '.env.local' });

// Just a placeholder script for tearing down schema or logic locally
function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL missing');
  assertLocalDatabaseUrl(dbUrl);
  console.log('✅ Local db ready to be reset (Not fully implemented teardown yet). Drop schema public cascade if needed.');
}

if (require.main === module) {
  main();
}

import * as dotenv from 'dotenv';
import { assertLocalDatabaseUrl } from '../guards/assertLocalDatabaseUrl';

dotenv.config();
dotenv.config({ path: '.env.local' });

function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL is not set.');
    process.exit(1);
  }

  try {
    assertLocalDatabaseUrl(dbUrl);
    console.log('✅ DATABASE_URL is local and allowed.');
    process.exit(0);
  } catch (err: any) {
    console.error(`❌ Check failed: ${err.message}`);
    process.exit(1);
  }
}

main();

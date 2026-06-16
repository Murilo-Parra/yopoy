import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Frontend Boundary Regressions', () => {
  it('should not import server modules in frontend files', () => {
    // The check-frontend-boundary.ts script acts as the main enforcer.
    // We can just execute the same logic or spawn it to ensure it passes in vitest context.
    
    // As a simple proxy, run the script and assert code 0
    const { execSync } = require('child_process');
    try {
      execSync('npx tsx src/security/scripts/check-frontend-boundary.ts', { stdio: 'pipe' });
    } catch (e: any) {
      const output = e.stdout ? e.stdout.toString() : '';
      const stderr = e.stderr ? e.stderr.toString() : '';
      throw new Error(`Frontend Boundary violated! \n${output}\n${stderr}`);
    }
  });
});

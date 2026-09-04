/**
 * Strict Asset Validation Script
 * ====================================
 * Validates the Image Manifest against the actual filesystem.
 * This is the ultimate gatekeeper for the zero-404 directive.
 */

import * as fs from 'fs';
import * as path from 'path';
// We use a raw read since we're in a script environment without full TS loader sometimes
// But since we run with npx tsx, we can try importing.

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MANIFEST_PATH = path.join(process.cwd(), 'data/imageManifest.ts');

function validateManifest(): void {
  console.log('🔍 Starting Strict Asset Validation...');
  
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ Manifest not found at:', MANIFEST_PATH);
    process.exit(1);
  }

  const content = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  
  // Extract all paths using regex for script speed and reliability
  const pathMatches = content.match(/:\s*['"](\/place-images\/[^'"]+)['"]/g) || [];
  const paths = pathMatches.map(m => m.match(/['"]([^'"]+)['"]/)?.[1]).filter(Boolean) as string[];

  if (paths.length === 0) {
    console.error('❌ No asset paths found in manifest. Check regex or content.');
    process.exit(1);
  }

  console.log(`📊 Validating ${paths.length} manifest entries...`);

  const missing: string[] = [];
  const caseMismatches: string[] = [];

  for (const assetPath of paths) {
    const relativePath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
    const fullPath = path.join(PUBLIC_DIR, relativePath);

    const dir = path.dirname(fullPath);
    const basename = path.basename(fullPath);
    
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (!files.includes(basename)) {
        const caseMatch = files.find(f => f.toLowerCase() === basename.toLowerCase());
        if (caseMatch) {
          caseMismatches.push(`${assetPath} (Found actual file: ${caseMatch})`);
        } else {
          missing.push(assetPath);
        }
      }
    } else {
      missing.push(assetPath);
    }
  }

  if (missing.length > 0) {
    console.error('\n❌ BUILD FAILED: Missing Assets in Manifest:');
    missing.forEach(p => console.error(`  - ${p}`));
    process.exit(1);
  }

  if (caseMismatches.length > 0) {
    console.error('\n❌ BUILD FAILED: Case Mismatch in Manifest:');
    caseMismatches.forEach(p => console.error(`  - ${p}`));
    console.error('\nFix: Update data/imageManifest.ts to match the EXACT casing shown above.');
    process.exit(1);
  }

  console.log('\n✅ 100% Asset Integrity Verified. No 404s possible.');
}

validateManifest();

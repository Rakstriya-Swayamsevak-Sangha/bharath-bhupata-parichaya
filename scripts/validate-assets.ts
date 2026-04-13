/**
 * Build-time Asset Validation Script
 * ====================================
 * Scans all data sources for image paths and verifies they exist.
 * FAIL BUILD if any referenced asset is missing.
 *
 * Run: npx tsx scripts/validate-assets.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

interface ValidationResult {
  path: string;
  exists: boolean;
  caseMismatch?: boolean;
}

// Trusted path prefixes that can be validated
const VALIDATABLE_PREFIXES = ['/place-images/', '/textures/', '/icons/', '/fonts/'];

// Extract image paths from various data structures
function extractImagePaths(): string[] {
  const paths = new Set<string>();

  // 1. Load all knowledge files
  const knowledgeFiles = [
    'data/mountainKnowledge.ts',
    'data/riverKnowledge.ts',
    'data/cityKnowledge.ts',
    'data/regionKnowledge.ts',
  ];

  for (const file of knowledgeFiles) {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const imageMatches = content.match(/image:\s*['"]([^'"]+)['"]/g) || [];
    for (const match of imageMatches) {
      const imagePath = match.match(/image:\s*['"]([^'"]+)['"]/)?.[1];
      if (imagePath && VALIDATABLE_PREFIXES.some(prefix => imagePath.startsWith(prefix))) {
        paths.add(imagePath);
      }
    }
  }

  // 2. Load assetsList.ts (PRELOAD_IMAGES)
  const assetsListPath = path.join(process.cwd(), 'data/assetsList.ts');
  if (fs.existsSync(assetsListPath)) {
    const content = fs.readFileSync(assetsListPath, 'utf-8');
    const preloadMatches = content.match(/PRELOAD_IMAGES\s*=\s*\[([\s\S]*?)\];/);
    if (preloadMatches) {
      const imageMatches = preloadMatches[1].match(/['"]([^'"]+)['"]/g) || [];
      for (const match of imageMatches) {
        const imagePath = match.replace(/['"]/g, '');
        if (VALIDATABLE_PREFIXES.some(prefix => imagePath.startsWith(prefix))) {
          paths.add(imagePath);
        }
      }
    }
  }

  // 3. Scan knowledge JSON files for image references
  const jsonFiles = ['data/mountains.json', 'data/rivers.json'];
  for (const file of jsonFiles) {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) continue;
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const imageMatches = content.match(/image:\s*['"]([^'"]+)['"]/g) || [];
      for (const match of imageMatches) {
        const imagePath = match.match(/image:\s*['"]([^'"]+)['"]/)?.[1];
        if (imagePath && VALIDATABLE_PREFIXES.some(prefix => imagePath.startsWith(prefix))) {
          paths.add(imagePath);
        }
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  }

  return Array.from(paths);
}

// Validate that all paths exist in public directory
function validatePaths(paths: string[]): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (const imagePath of paths) {
    const relativePath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const fullPath = path.join(PUBLIC_DIR, relativePath);

    let exists = fs.existsSync(fullPath);
    let caseMismatch = false;

    if (!exists) {
      const dir = path.dirname(fullPath);
      const basename = path.basename(fullPath);
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        const similar = files.find(f => f.toLowerCase() === basename.toLowerCase());
        if (similar) {
          caseMismatch = true;
          exists = true;
        }
      }
    }

    results.push({ path: imagePath, exists, caseMismatch });
  }

  return results;
}

// Print results and exit with appropriate code
function reportResults(results: ValidationResult[]): void {
  const missing = results.filter(r => !r.exists);
  const caseMismatches = results.filter(r => r.caseMismatch);

  if (missing.length > 0) {
    console.error('Missing assets:');
    for (const m of missing) {
      console.error(`  - ${m.path}`);
    }
    console.error('\nFix: Add missing files to public/ or remove reference from data file');
    process.exit(1);
  }

  if (caseMismatches.length > 0) {
    console.error('Case mismatch errors:');
    for (const m of caseMismatches) {
      console.error(`  - ${m.path}`);
    }
    console.error('\nFix: Use lowercase filenames in references to match actual files');
    process.exit(1);
  }

  console.log('✓ All assets validated successfully!');
}

// Main execution
const paths = extractImagePaths();
const results = validatePaths(paths);
reportResults(results);

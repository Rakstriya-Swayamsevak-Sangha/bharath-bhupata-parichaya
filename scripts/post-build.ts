import * as fs from 'fs';
import * as path from 'path';

function postBuild() {
  console.log('📦 Starting Post-Build Optimizations...');
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    console.warn('⚠️ out directory does not exist yet.');
    return;
  }

  // 1. Copy serve.json to out/serve.json with normalized public root
  const serveJsonPath = path.join(process.cwd(), 'serve.json');
  if (fs.existsSync(serveJsonPath)) {
    const serveConfig = JSON.parse(fs.readFileSync(serveJsonPath, 'utf-8'));
    serveConfig.public = '.';
    fs.writeFileSync(path.join(outDir, 'serve.json'), JSON.stringify(serveConfig, null, 2));
    console.log('✅ Generated out/serve.json with localized public root');
  }

  // 2. Scan recursively for all __PAGE__.txt inside __next.* directories
  // and create the dot-delimited aliases that Next.js client router requests
  function processDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('__next.')) {
          const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });
          for (const sub of subEntries) {
            if (sub.isFile()) {
              const srcFile = path.join(fullPath, sub.name);
              const aliasName = `${entry.name}.${sub.name}`;
              const targetFile = path.join(dir, aliasName);
              fs.copyFileSync(srcFile, targetFile);
              console.log(`✅ Created RSC alias: ${path.relative(outDir, targetFile)} -> ${path.relative(outDir, srcFile)}`);
            }
          }
        }
        processDir(fullPath);
      }
    }
  }

  // 3. Stamp out/sw.js and public/sw.js with dynamic buildId to automatically invalidate obsolete caches
  const buildIdPath = path.join(process.cwd(), '.next/BUILD_ID');
  const buildId = fs.existsSync(buildIdPath) ? fs.readFileSync(buildIdPath, 'utf-8').trim() : Date.now().toString();
  const versionRegex = /const CACHE_VERSION = ['"][^'"]+['"];/;
  const versionReplacement = `const CACHE_VERSION = 'v-${buildId}';`;

  for (const swTarget of [path.join(outDir, 'sw.js'), path.join(process.cwd(), 'public/sw.js')]) {
    if (fs.existsSync(swTarget)) {
      let swContent = fs.readFileSync(swTarget, 'utf-8');
      swContent = swContent.replace(versionRegex, versionReplacement);
      fs.writeFileSync(swTarget, swContent);
      console.log(`✅ Stamped ${path.relative(process.cwd(), swTarget)} with CACHE_VERSION: v-${buildId}`);
    }
  }

  processDir(outDir);
  console.log('✨ Post-Build Complete.');
}

postBuild();

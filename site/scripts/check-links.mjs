// Checks that every internal href/src in dist/ points at a file that exists.
// Plain Node, no deps. Usage: node scripts/check-links.mjs [distDir]

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(process.argv[2] ?? join(siteDir, 'dist'));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function targetExists(urlPath) {
  const clean = urlPath.split(/[?#]/)[0];
  const candidates = [
    join(distDir, clean),
    join(distDir, clean, 'index.html'),
    join(distDir, `${clean}.html`),
  ];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
}

const htmlFiles = walk(distDir).filter((f) => f.endsWith('.html'));
const attrRe = /\b(?:href|src)=["']([^"']+)["']/g;
let checked = 0;
const broken = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(attrRe)) {
    const target = match[1];
    if (!target.startsWith('/') || target.startsWith('//')) continue; // external, mailto, anchors
    checked += 1;
    if (!targetExists(target)) broken.push({ file: file.slice(distDir.length), target });
  }
}

console.log(`check-links: ${htmlFiles.length} HTML files, ${checked} internal links checked`);
if (broken.length) {
  for (const b of broken) console.error(`  broken: ${b.target} (in ${b.file})`);
  process.exit(1);
}
console.log('check-links: no broken internal links');

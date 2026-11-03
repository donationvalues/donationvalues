// Copies the repository's Markdown into src/content/pages/ so the site has one
// source of truth. Runs as the npm `prebuild` and `predev` script. Plain Node, no deps.
//
// The only edit made to the text is link rewriting: relative links and
// backticked repository paths are pointed at site routes (when the file is
// rendered here) or at GitHub (when it is not), so no link on the site 404s.

import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, normalize, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = resolve(siteDir, '..');
const outDir = join(siteDir, 'src', 'content', 'pages');

const GITHUB = 'https://github.com/donationvalues/donationvalues';
const BRANCH = 'main';

// Repository file -> site page. `route` is the site path; `title` and
// `description` feed <title> and <meta name="description">.
const PAGES = [
  {
    source: 'README.md',
    slug: 'about',
    title: 'About',
    description:
      'What DonationValues is: an open dataset of fair-market values for donated used clothing and household items, built from observed US thrift prices.',
  },
  {
    source: 'GOVERNANCE.md',
    slug: 'governance',
    title: 'Governance',
    description:
      'Roles, decision process, funding rules and commitments for the DonationValues project, including the sponsor relationship with Foothill AI LLC.',
  },
  {
    source: 'CONTRIBUTING.md',
    slug: 'contribute',
    title: 'Contribute',
    description:
      'How to contribute price observations, taxonomy proposals, methodology comments and code to DonationValues, and the Data Contributor Certificate.',
  },
  {
    source: 'methodology/METHODOLOGY-2027.0.md',
    slug: 'methodology',
    title: 'Methodology',
    description:
      'METHODOLOGY-2027.0 (draft): market definition, sampling frame, in-store protocol, statistics, minimum sample rules, AI agent contract and edition versioning.',
  },
  {
    source: 'CODE_OF_CONDUCT.md',
    slug: 'conduct',
    title: 'Code of conduct',
    description: 'The DonationValues code of conduct and how to report a problem.',
  },
];

// Repository paths that resolve to a site route rather than to GitHub.
const ROUTES = new Map(PAGES.map((p) => [p.source, `/${p.slug}`]));
ROUTES.set('methodology/', '/methodology');
ROUTES.set('methodology', '/methodology');

function repoPathExists(repoPath) {
  const full = normalize(join(repoDir, repoPath));
  if (!full.startsWith(repoDir)) return false;
  return existsSync(full);
}

function isDirectory(repoPath) {
  return statSync(join(repoDir, repoPath)).isDirectory();
}

// Map a repository-relative path to a URL, or null when nothing exists there.
function urlForRepoPath(repoPath) {
  const clean = repoPath.replace(/^\.\//, '');
  if (ROUTES.has(clean)) return ROUTES.get(clean);
  const bare = clean.replace(/\/$/, '');
  if (ROUTES.has(bare)) return ROUTES.get(bare);
  if (!bare || !repoPathExists(bare)) return null;
  const kind = isDirectory(bare) ? 'tree' : 'blob';
  return `${GITHUB}/${kind}/${BRANCH}/${bare}`;
}

function isExternal(target) {
  return /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#') || target.startsWith('/');
}

// Looks like a path into the repository: has a directory separator or a
// recognisable file extension or is one of the top-level license files.
const PATH_LIKE = /^(?:[\w.-]+\/)*[\w.-]+\/?$/;
function looksLikeRepoPath(text) {
  if (!PATH_LIKE.test(text)) return false;
  if (text.includes('<')) return false;
  return (
    text.includes('/') ||
    /\.(md|json|csv|cff|txt|yml|yaml|py|mjs|js|ts)$/i.test(text) ||
    /^(LICENSE|LICENSE-DATA|LICENSE-DOCS|NOTICE)$/.test(text)
  );
}

function rewriteLinks(markdown, sourcePath) {
  const sourceDir = posix.dirname(sourcePath);
  const lines = markdown.split('\n');
  let inFence = false;
  const out = lines.map((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;

    // 1. Markdown links with a relative target: [text](path) -> route or GitHub.
    line = line.replace(/\]\(([^)\s]+)\)/g, (match, target) => {
      if (isExternal(target)) return match;
      const [pathPart, hash = ''] = target.split('#');
      const repoPath = posix.normalize(posix.join(sourceDir, pathPart));
      const url = urlForRepoPath(repoPath);
      return url ? `](${url}${hash ? `#${hash}` : ''})` : match;
    });

    // 2. Backticked repository paths not already inside a link: `path` -> [`path`](url).
    line = line.replace(/(\[?)`([^`\n]+)`(\]\([^)]*\))?/g, (match, openBracket, text, linkTail) => {
      if (openBracket || linkTail) return match; // already a link
      if (!looksLikeRepoPath(text)) return match;
      const repoPath = posix.normalize(posix.join(sourceDir, text));
      const url = urlForRepoPath(repoPath) ?? urlForRepoPath(text);
      return url ? `[\`${text}\`](${url})` : match;
    });

    return line;
  });
  return out.join('\n');
}

function yamlString(value) {
  return JSON.stringify(value);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const page of PAGES) {
  const sourceFile = join(repoDir, page.source);
  if (!existsSync(sourceFile)) {
    console.error(`sync-content: missing ${page.source}`);
    process.exit(1);
  }
  const body = rewriteLinks(readFileSync(sourceFile, 'utf8'), page.source);
  const frontmatter = [
    '---',
    `title: ${yamlString(page.title)}`,
    `description: ${yamlString(page.description)}`,
    `source: ${yamlString(page.source)}`,
    `sourceUrl: ${yamlString(`${GITHUB}/blob/${BRANCH}/${page.source}`)}`,
    '---',
    '',
  ].join('\n');
  writeFileSync(join(outDir, `${page.slug}.md`), frontmatter + body);
  console.log(`sync-content: ${page.source} -> src/content/pages/${page.slug}.md`);
}

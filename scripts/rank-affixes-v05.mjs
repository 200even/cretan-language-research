#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};
const outDir = getArg('--out-dir', 'data/generated-v05');

// v0.5 intentionally reuses the frozen v0.4 ranking/scoring implementation.
// Only the pre-ranking source-consistency mask changes, isolating extraction effects.
const run = spawnSync(process.execPath, ['scripts/rank-affixes-v04.mjs', ...args], { stdio: 'inherit' });
if (run.status !== 0) process.exit(run.status ?? 1);

const readme = path.join(outDir, 'README.md');
if (fs.existsSync(readme)) {
  let text = fs.readFileSync(readme, 'utf8');
  text = text.replace('# Structural-aware morphology v0.4', '# Source-consistent morphology v0.5');
  text = text.replace('Boundary enrichment and exact-paradigm evidence remain separate.', 'v0.5 keeps the v0.4 ranking formulas unchanged; only the source-consistency mask is revised. Boundary enrichment and exact-paradigm evidence remain separate.');
  fs.writeFileSync(readme, text);
}

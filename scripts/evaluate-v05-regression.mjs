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

const run = spawnSync(process.execPath, ['scripts/evaluate-v04-regression.mjs', ...args], { stdio: 'inherit' });
const report = path.join(outDir, 'REGRESSION.md');
if (fs.existsSync(report)) {
  let text = fs.readFileSync(report, 'utf8');
  text = text.replace('# v0.4 regression evaluation', '# v0.5 regression evaluation');
  fs.writeFileSync(report, text);
}
if (run.status !== 0) process.exit(run.status ?? 1);

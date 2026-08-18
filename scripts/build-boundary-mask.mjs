#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const commentaryDir = getArg('--commentary-dir');
const outPath = getArg('--out', 'data/generated/boundary-mask.csv');

if (!commentaryDir) {
  console.error('Usage: node scripts/build-boundary-mask.mjs --commentary-dir /path/to/commentary --out boundary-mask.csv');
  process.exit(2);
}

const canonical = value => String(value)
  .normalize('NFKC')
  .toUpperCase()
  .replaceAll('–', '-')
  .replaceAll('—', '-')
  .replace(/\s*-\s*/g, '-')
  .replace(/\s+/g, ' ')
  .trim();

const decodeEntities = text => text
  .replace(/&nbsp;/gi, ' ')
  .replace(/&bull;/gi, '•')
  .replace(/&middot;/gi, '·')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));

const htmlToText = html => {
  let text = String(html);
  text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  text = text.replace(/<\/?(?:br|p|div|table|tbody|tr|td|th|dt|dd|li|ul|ol|h[1-6])\b[^>]*>/gi, ' ');
  text = text.replace(/<[^>]+>/g, '');
  return canonical(decodeEntities(text));
};

// A deliberately syntax-only definition. It captures transliterated sign groups
// of at least two components; no phonetic or lexical interpretation is used.
const SIGN = String.raw`(?:\*[0-9]+[A-Z]?|[A-Z]+[0-9]*)`;
const WORD = String.raw`${SIGN}(?:-${SIGN})+`;
const leftFragment = new RegExp(String.raw`]\s*(${WORD})`, 'g');
const rightFragment = new RegExp(String.raw`(${WORD})(?:-)?\s*\[`, 'g');

const rows = new Map();
const add = ({ commentaryId, form, side, sourceFile, evidence }) => {
  const normalized = canonical(form);
  const key = `${commentaryId}\t${normalized}`;
  if (!rows.has(key)) {
    rows.set(key, {
      commentary_id: commentaryId,
      form: normalized,
      left_insecure: false,
      right_insecure: false,
      source_files: new Set(),
      evidence: new Set(),
    });
  }
  const row = rows.get(key);
  row[side === 'left' ? 'left_insecure' : 'right_insecure'] = true;
  row.source_files.add(sourceFile);
  if (evidence) row.evidence.add(evidence.slice(0, 160));
};

const files = fs.readdirSync(commentaryDir)
  .filter(file => file.toLowerCase().endsWith('.html'))
  .sort();

for (const file of files) {
  const fullPath = path.join(commentaryDir, file);
  const commentaryId = path.basename(file, path.extname(file));
  const text = htmlToText(fs.readFileSync(fullPath, 'utf8'));

  for (const match of text.matchAll(leftFragment)) {
    add({
      commentaryId,
      form: match[1],
      side: 'left',
      sourceFile: file,
      evidence: text.slice(Math.max(0, match.index - 20), match.index + match[0].length + 20),
    });
  }

  for (const match of text.matchAll(rightFragment)) {
    add({
      commentaryId,
      form: match[1],
      side: 'right',
      sourceFile: file,
      evidence: text.slice(Math.max(0, match.index - 20), match.index + match[0].length + 20),
    });
  }
}

const escapeCsv = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const outputRows = [...rows.values()].sort((a, b) =>
  a.commentary_id.localeCompare(b.commentary_id) || a.form.localeCompare(b.form)
);

const headers = [
  'commentary_id',
  'form',
  'left_insecure',
  'right_insecure',
  'source_files',
  'evidence',
];

const csv = [
  headers.join(','),
  ...outputRows.map(row => [
    row.commentary_id,
    row.form,
    row.left_insecure ? 'yes' : 'no',
    row.right_insecure ? 'yes' : 'no',
    [...row.source_files].join(' | '),
    [...row.evidence].slice(0, 3).join(' || '),
  ].map(escapeCsv).join(',')),
].join('\n') + '\n';

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, csv);

const leftCount = outputRows.filter(row => row.left_insecure).length;
const rightCount = outputRows.filter(row => row.right_insecure).length;
console.log(`Boundary mask: ${outputRows.length} inscription/form rows; ${leftCount} left-insecure; ${rightCount} right-insecure.`);
console.log(`Wrote ${outPath}`);

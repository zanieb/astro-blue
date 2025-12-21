#!/usr/bin/env bun
import { extname } from 'path';
import { spawnSync } from 'child_process';

const input = await Bun.stdin.json();

const toolName = input.tool_name;
const toolInput = input.tool_input || {};
const filePath = toolInput.file_path;

// Only process Write, Edit, and MultiEdit tools
if (!['Write', 'Edit', 'MultiEdit'].includes(toolName)) {
  process.exit(0);
}

if (!filePath) {
  process.exit(0);
}

const ext = extname(filePath);

// Extensions that should be formatted with prettier
const PRETTIER_EXTENSIONS = [
  '.astro',
  '.css',
  '.js',
  '.json',
  '.json5',
  '.md',
  '.mdx',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
];

function formatWithPrettier() {
  try {
    spawnSync('./node_modules/.bin/prettier', ['--write', filePath], {
      cwd: process.env.CLAUDE_PROJECT_DIR || process.cwd(),
      encoding: 'utf-8',
    });
  } catch (error) {
    // Silently ignore errors
  }
}

if (PRETTIER_EXTENSIONS.includes(ext)) {
  formatWithPrettier();
}

process.exit(0);

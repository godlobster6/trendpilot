import { readFile } from 'node:fs/promises';

export async function fetchForumSignals() {
  try {
    const raw = await readFile(new URL('../../data/forum-signals.json', import.meta.url), 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

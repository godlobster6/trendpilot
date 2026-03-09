export async function fetchGithubTrending() {
  const fallback = [
    'GoogleCloudPlatform/generative-ai',
    '666ghj/MiroFish',
    'shadcn-ui/ui',
    'openclaw/openclaw',
    'toeverything/AFFiNE',
    'openai/skills',
    'virattt/ai-hedge-fund'
  ];

  try {
    const res = await fetch('https://github.com/trending');
    const html = await res.text();
    const items = [...html.matchAll(/<h2 class="h3 lh-condensed">([\s\S]*?)<\/h2>/g)]
      .map(m => m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim())
      .map(s => s.replace(/\s*\/\s*/g,'/'));
    const rows = (items.length ? items : fallback).slice(0,10);
    return rows.map((repo, i) => ({ repo, rank: i+1 }));
  } catch {
    return fallback.map((repo, i) => ({ repo, rank: i+1 }));
  }
}

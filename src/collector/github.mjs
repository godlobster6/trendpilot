export async function fetchGithubTrending() {
  const res = await fetch('https://github.com/trending');
  const html = await res.text();
  const items = [...html.matchAll(/<h2 class="h3 lh-condensed">([\s\S]*?)<\/h2>/g)]
    .map(m => m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim())
    .map(s => s.replace(/\s*\/\s*/g,'/'));
  return items.slice(0,10).map((repo, i) => ({ repo, rank: i+1 }));
}

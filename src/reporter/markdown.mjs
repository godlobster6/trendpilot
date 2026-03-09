export function renderMarkdownReport({ date, projects, xSignals = [], forumSignals = [], limit = 8 }) {
  const lines = [
    '# TrendPilot Daily Report',
    '',
    `- Date: ${date}`,
    `- Top N: ${limit}`,
    '',
    '## Top Projects'
  ];

  for (const p of projects) {
    lines.push(`### ${p.repo}`);
    lines.push(`- Score: ${p.score} | Track: ${p.track} | Difficulty: ${p.difficulty}`);
    lines.push(`- Heat: ${p.heat} | Reproducibility: ${p.reproducibility} | Business: ${p.business} | X Boost: ${p.xBoost} | Forum Boost: ${p.forumBoost}`);
    lines.push('- 7-day plan:');
    for (const step of p.plan) lines.push(`  - ${step}`);
    lines.push('');
  }

  lines.push('## X Signals');
  if (xSignals.length === 0) lines.push('- 暂无');
  for (const x of xSignals) {
    lines.push(`- ${x.title} (${(x.tags || []).join('/')})`);
    lines.push(`  - ${x.url}`);
  }

  lines.push('');
  lines.push('## Forum Signals');
  if (forumSignals.length === 0) lines.push('- 暂无');
  for (const f of forumSignals) {
    lines.push(`- ${f.title} (${(f.tags || []).join('/')})`);
    lines.push(`  - ${f.url}`);
  }

  return lines.join('\n');
}

export function renderJsonReport({ date, projects, xSignals = [], forumSignals = [], limit = 8 }) {
  return {
    date,
    topN: limit,
    projects,
    xSignals,
    forumSignals
  };
}

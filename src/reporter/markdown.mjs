export function renderMarkdownReport({ date, projects }) {
  const lines = [`# TrendPilot Daily Report`, ``, `- Date: ${date}`, ``, `## Top Projects`];
  for (const p of projects) {
    lines.push(`### ${p.repo}`);
    lines.push(`- Score: ${p.score}`);
    lines.push(`- Heat: ${p.heat} | Reproducibility: ${p.reproducibility} | Business: ${p.business}`);
    lines.push(`- 7-day plan:`);
    for (const step of p.plan) lines.push(`  - ${step}`);
    lines.push('');
  }
  return lines.join('\n');
}

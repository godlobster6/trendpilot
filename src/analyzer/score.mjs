function inferTrack(repo) {
  const s = repo.toLowerCase();
  if (/(agent|copilot|claude|gpt|openai|llm|rag)/.test(s)) return 'AI工具链';
  if (/(ui|web|frontend|react|next|design)/.test(s)) return '前端产品';
  if (/(ops|infra|deploy|docker|k8s|monitor)/.test(s)) return '基础设施';
  return '通用开发';
}

export function scoreProjects(projects, { xSignals = [], forumSignals = [] } = {}) {
  const xText = xSignals.map(x => `${x.title} ${(x.tags || []).join(' ')}`.toLowerCase()).join(' ');
  const forumText = forumSignals.map(f => `${f.title} ${(f.tags || []).join(' ')}`.toLowerCase()).join(' ');

  return projects.map((p) => {
    const track = inferTrack(p.repo);
    const heat = Math.max(0, 100 - p.rank * 6);
    const reproducibility = p.rank <= 5 ? 72 : 62;
    const business = /ai|agent|open|ui|tool|code|workflow/i.test(p.repo) ? 78 : 60;
    const keys = p.repo.toLowerCase().split('/').filter(k => k.length > 3);
    const xBoost = xText && keys.some(k => xText.includes(k)) ? 8 : 0;
    const forumBoost = forumText && (keys.some(k => forumText.includes(k)) || /agent|ai|workflow|tool/.test(p.repo.toLowerCase())) ? 6 : 0;
    const score = Math.min(100, Math.round(heat * 0.34 + reproducibility * 0.26 + business * 0.24 + xBoost + forumBoost));

    return {
      ...p,
      track,
      score,
      heat,
      reproducibility,
      business,
      xBoost,
      forumBoost,
      difficulty: score >= 82 ? '中' : '低'
    };
  }).sort((a, b) => b.score - a.score);
}

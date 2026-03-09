export function scoreProjects(projects) {
  return projects.map(p => {
    const heat = Math.max(0, 100 - p.rank * 6);
    const reproducibility = p.rank <= 5 ? 70 : 60;
    const business = /ai|agent|open|ui|tool|code/i.test(p.repo) ? 75 : 60;
    const score = Math.round(heat * 0.4 + reproducibility * 0.3 + business * 0.3);
    return { ...p, score, heat, reproducibility, business };
  }).sort((a,b)=>b.score-a.score);
}

import { fetchGithubTrending } from './collector/github.mjs';
import { scoreProjects } from './analyzer/score.mjs';
import { buildPlan } from './planner/plan.mjs';
import { renderMarkdownReport } from './reporter/markdown.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fetchXSignals } from './collector/x.mjs';

const today = new Date().toISOString().slice(0,10);
const trending = await fetchGithubTrending();
const scored = scoreProjects(trending);
const planned = buildPlan(scored.slice(0,5));
const xSignals = await fetchXSignals();
const md = renderMarkdownReport({ date: today, projects: planned, xSignals });

mkdirSync(`reports/${today}`, { recursive: true });
writeFileSync(`reports/${today}/daily.md`, md, 'utf8');
console.log(`Generated: reports/${today}/daily.md`);

import { fetchGithubTrending } from './collector/github.mjs';
import { fetchXSignals } from './collector/x.mjs';
import { scoreProjects } from './analyzer/score.mjs';
import { buildPlan } from './planner/plan.mjs';
import { renderMarkdownReport, renderJsonReport } from './reporter/markdown.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';

const today = new Date().toISOString().slice(0, 10);
const limit = Number(process.env.TRENDPILOT_TOP_N || 8);

const trending = await fetchGithubTrending();
const xSignals = await fetchXSignals();

const scored = scoreProjects(trending, { xSignals });
const planned = buildPlan(scored.slice(0, limit));

const reportDir = `reports/${today}`;
mkdirSync(reportDir, { recursive: true });

const md = renderMarkdownReport({ date: today, projects: planned, xSignals, limit });
const json = renderJsonReport({ date: today, projects: planned, xSignals, limit });

writeFileSync(`${reportDir}/daily.md`, md, 'utf8');
writeFileSync(`${reportDir}/daily.json`, JSON.stringify(json, null, 2), 'utf8');

console.log(`Generated:\n- ${reportDir}/daily.md\n- ${reportDir}/daily.json`);

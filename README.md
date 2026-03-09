# TrendPilot

TrendPilot 是一个“热点项目雷达”CLI：
- 抓取 GitHub Trending（含网络失败 fallback）
- 合并 X 热点信号
- 输出可执行的 7 天复刻计划日报

## Quick Start

```bash
cd trendpilot
node src/index.mjs
```

输出文件：
- `reports/YYYY-MM-DD/daily.md`

## X 信号配置

编辑：`data/x-signals.json`

格式示例：
```json
[
  {
    "source": "x",
    "title": "示例话题",
    "url": "https://x.com/...",
    "tags": ["AI", "创业"]
  }
]
```

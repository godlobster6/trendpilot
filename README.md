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


## v0.2 改进
- 支持 `TRENDPILOT_TOP_N` 控制输出项目数量（默认 8）
- 输出双报告：`daily.md` + `daily.json`
- 新增赛道识别（AI工具链/前端产品/基础设施/通用开发）
- 引入 X 信号匹配加权（X Boost）


## v0.3 改进
- 新增论坛信号源：`data/forum-signals.json`
- 新增采集模块：`src/collector/forum.mjs`
- 评分模型支持论坛加权（`Forum Boost`）
- 日报新增 `Forum Signals` 区块

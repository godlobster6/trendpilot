export function buildPlan(projects) {
  return projects.map(p => ({
    ...p,
    plan: [
      'Day1: 复现核心功能最小闭环',
      'Day2: 输出差异化定位与用户画像',
      'Day3: 做一个可分享 demo 页面',
      'Day4: 接入基础数据埋点',
      'Day5: 发布第一版并收集反馈',
      'Day6: 修复高频问题并补文档',
      'Day7: 发复盘与下一步路线图'
    ]
  }));
}

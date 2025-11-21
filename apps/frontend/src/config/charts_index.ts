/**
 * 图表配置索引文件
 * 统一导入和导出所有图表类型
 */

import { allKindsOfBarCharts } from "./charts/charts_bars"
import { allKindsOfLineCharts } from "./charts/charts_lines"
import { allKindsOfPieCharts } from "./charts/charts_pies"
import { allKindsOfScatterCharts } from "./charts/charts_scatters"
import { allKindsOfRadarCharts } from "./charts/charts_radars"
import { allKindsOfGaugeCharts } from "./charts/charts_gauges"
import { allKindsOfFunnelCharts } from "./charts/charts_funnels"

/**
 * 所有图表类型的集合
 * 每个对象包含一个图表类别及其下所有图表变体
 */
export const allKindsOfCharts = [
  {
		id: "line-chart",
		name: "折线图",
		type: "line-chart",
		charts: allKindsOfLineCharts,
	},
  {
		id: "bar-chart",
		name: "柱状图",
		type: "bar-chart",
		charts: allKindsOfBarCharts,
	},
  {
		id: "pie-chart",
		name: "饼图",
		type: "pie-chart",
		charts: allKindsOfPieCharts,
	},
  {
		id: "scatter-chart",
		name: "散点图",
		type: "scatter-chart",
		charts: allKindsOfScatterCharts,
	},
  {
		id: "radar-chart",
		name: "雷达图",
		type: "radar-chart",
		charts: allKindsOfRadarCharts,
	},
  {
		id: "gauge-chart",
		name: "仪表盘",
		type: "gauge-chart",
		charts: allKindsOfGaugeCharts,
	},
  {
		id: "funnel-chart",
		name: "漏斗图",
		type: "funnel-chart",
		charts: allKindsOfFunnelCharts,
	},
]
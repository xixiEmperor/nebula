import type { ConponentsAttribute, ChartAttribute } from "@/types/components";
import _ from "lodash";

/**
 * 基础漏斗图配置模板
 */
const baseFunnelOptions: ChartAttribute = {
	title: {
		text: "基础漏斗图",
		left: "center",
		top: 15,
		textStyle: {
			color: "#ffffff",
			fontSize: 16,
		},
	},
	tooltip: {
		trigger: "item",
		show: true,
	},
	series: [
		{
			type: "funnel",
			data: [
				{ value: 100, name: '访问' },
				{ value: 80, name: '咨询' },
				{ value: 60, name: '订单' },
				{ value: 40, name: '点击' },
				{ value: 20, name: '成交' }
			],
			label: {
				show: true,
				position: 'inside',
			},
		},
	],
}

/**
 * 基础漏斗图配置生成函数
 */
const basicFunnelChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseFunnelOptions);
	return config;
}

/**
 * 金字塔漏斗图配置生成函数（反向漏斗图）
 */
const pyramidFunnelChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseFunnelOptions);
	config.title.text = "金字塔图";
	config.series = [
		{
			type: "funnel",
			data: [
				{ value: 20, name: '高管' },
				{ value: 40, name: '中层管理' },
				{ value: 60, name: '基层管理' },
				{ value: 80, name: '骨干员工' },
				{ value: 100, name: '普通员工' }
			],
			label: {
				show: true,
				position: 'inside',
			},
		},
	];
	return config;
}

/**
 * 带图例的漏斗图配置生成函数
 */
const funnelChartWithLegendOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseFunnelOptions);
	config.title.text = "带图例的漏斗图";
	config.legend = {
		orient: "vertical",
		left: "left",
		show: true,
		top: "center",
		textStyle: {
			color: "#ffffff",
			fontSize: 12,
		},
	};
	return config;
}

/**
 * 基础漏斗图组件
 */
export const basicFunnelChart: ConponentsAttribute = {
	id: "basic-funnel-chart",
	name: "基础漏斗图",
	type: "funnel-chart",
	options: basicFunnelChartOptions(),
}

/**
 * 金字塔图组件
 */
const pyramidFunnelChart: ConponentsAttribute = {
	id: "pyramid-funnel-chart",
	name: "金字塔图",
	type: "funnel-chart",
	options: pyramidFunnelChartOptions(),
}

/**
 * 带图例的漏斗图组件
 */
const funnelChartWithLegend: ConponentsAttribute = {
	id: "funnel-chart-with-legend",
	name: "带图例的漏斗图",
	type: "funnel-chart",
	options: funnelChartWithLegendOptions(),
}

/**
 * 统一导出所有漏斗图组件
 */
export const allKindsOfFunnelCharts: ConponentsAttribute[] = [
	basicFunnelChart,
	pyramidFunnelChart,
	funnelChartWithLegend,
]


import type { ConponentsAttribute, ChartAttribute } from "@/types/components";
import _ from "lodash";

/**
 * 基础雷达图配置模板
 */
const baseRadarOptions: ChartAttribute = {
	title: {
		text: "基础雷达图",
		left: "center",
		top: 15,
		textStyle: {
			color: "#ffffff",
			fontSize: 22,
		},
	},
	tooltip: {
		trigger: "item",
		show: true,
	},
	radar: {
		indicator: [
			{ name: '销售', max: 6500 },
			{ name: '管理', max: 16000 },
			{ name: '信息技术', max: 30000 },
			{ name: '客服', max: 38000 },
			{ name: '研发', max: 52000 },
			{ name: '市场', max: 25000 }
		],
		shape: 'polygon',
		splitNumber: 5,
		name: {
			textStyle: {
				color: '#ffffff',
				fontSize: 12,
			}
		},
	},
	series: [
		{
			type: "radar",
			data: [
				{
					value: [4200, 3000, 20000, 35000, 50000, 18000],
					name: '预算分配'
				}
			],
		},
	],
}

/**
 * 基础雷达图配置生成函数
 */
const basicRadarChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseRadarOptions);
	return config;
}

/**
 * 圆形雷达图配置生成函数
 */
const circleRadarChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseRadarOptions);
	config.title.text = "圆形雷达图";
	config.radar.shape = 'circle';
	return config;
}

/**
 * 多系列雷达图配置生成函数
 */
const multiSeriesRadarChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseRadarOptions);
	config.title.text = "多系列雷达图";
	config.legend = {
		orient: "horizontal",
		left: "center",
		show: true,
		top: "bottom",
		textStyle: {
			color: "#ffffff",
			fontSize: 12,
		},
	};
	config.series = [
		{
			type: "radar",
			data: [
				{
					value: [4200, 3000, 20000, 35000, 50000, 18000],
					name: '预算分配（实际开销）'
				},
				{
					value: [5000, 14000, 28000, 26000, 42000, 21000],
					name: '预算分配（预期收益）'
				}
			],
		},
	];
	return config;
}

/**
 * 基础雷达图组件
 */
export const basicRadarChart: ConponentsAttribute = {
	id: "basic-radar-chart",
	name: "基础雷达图",
	type: "radar-chart",
	options: basicRadarChartOptions(),
}

/**
 * 圆形雷达图组件
 */
const circleRadarChart: ConponentsAttribute = {
	id: "circle-radar-chart",
	name: "圆形雷达图",
	type: "radar-chart",
	options: circleRadarChartOptions(),
}

/**
 * 多系列雷达图组件
 * 注意：必须是多系列才会显示图例
 */
const multiSeriesRadarChart: ConponentsAttribute = {
	id: "multi-series-radar-chart",
	name: "多系列雷达图",
	type: "radar-chart",
	options: multiSeriesRadarChartOptions(),
}

/**
 * 统一导出所有雷达图组件
 */
export const allKindsOfRadarCharts: ConponentsAttribute[] = [
	basicRadarChart,
	circleRadarChart,
	multiSeriesRadarChart,
]


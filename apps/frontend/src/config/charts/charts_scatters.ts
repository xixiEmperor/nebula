import type { ConponentsAttribute, ChartAttribute } from "@/types/charts-components";
import _ from "lodash";

/**
 * 基础散点图配置模板
 */
const baseScatterOptions: ChartAttribute = {
	title: {
		text: "基础散点图",
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
	xAxis: {
		type: "value",
		data: [],
		axisLine: {
			lineStyle: {
				color: "#ffffff"
			},
		},
		axisLabel: {
			color: "#ffffff",
			fontSize: 12,
		},
	},
	yAxis: {
		type: "value",
		data: [],
		axisLine: {
			lineStyle: {
				color: "#ffffff"
			},
		},
		axisLabel: {
			color: "#ffffff",
			fontSize: 12,
		},
	},
	series: [
		{
			type: "scatter",
			symbolSize: 10,
			data: [
				[10.0, 8.04],
				[8.07, 6.95],
				[13.0, 7.58],
				[9.05, 8.81],
				[11.0, 8.33],
				[14.0, 7.66],
				[13.4, 6.81],
				[10.0, 6.33],
				[14.0, 8.96],
				[12.5, 6.82],
			],
		},
	],
}

/**
 * 基础散点图配置生成函数
 */
const basicScatterChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseScatterOptions);
	return config;
}

/**
 * 多系列散点图配置生成函数
 */
const multiSeriesScatterChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseScatterOptions);
	config.title.text = "多系列散点图";
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
			name: "系列1",
			type: "scatter",
			symbolSize: 10,
			data: [
				[10.0, 8.04],
				[8.07, 6.95],
				[13.0, 7.58],
				[9.05, 8.81],
				[11.0, 8.33],
			],
		},
		{
			name: "系列2",
			type: "scatter",
			symbolSize: 10,
			data: [
				[8.0, 5.25],
				[12.0, 8.15],
				[11.0, 7.11],
				[7.0, 4.26],
				[9.0, 5.73],
			],
		},
	];
	return config;
}

/**
 * 气泡图配置生成函数（带不同大小的散点）
 */
const bubbleChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseScatterOptions);
	config.title.text = "气泡图";
	config.series = [
		{
			type: "scatter",
			symbolSize: (value: any) => {
				// 根据数据值动态设置散点大小
				return value[2] * 2;
			},
			data: [
				[10.0, 8.04, 10],
				[8.07, 6.95, 15],
				[13.0, 7.58, 8],
				[9.05, 8.81, 20],
				[11.0, 8.33, 12],
				[14.0, 7.66, 18],
				[13.4, 6.81, 14],
				[10.0, 6.33, 9],
				[14.0, 8.96, 16],
				[12.5, 6.82, 11],
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowColor: 'rgba(59, 228, 254, 0.5)',
					shadowOffsetX: 0,
				}
			}
		},
	];
	return config;
}

/**
 * 基础散点图组件
 */
export const basicScatterChart: ConponentsAttribute = {
	id: "basic-scatter-chart",
	name: "基础散点图",
	type: "scatter-chart",
	options: basicScatterChartOptions(),
}

/**
 * 多系列散点图组件
 * 注意：必须是多系列才会显示图例
 */
const multiSeriesScatterChart: ConponentsAttribute = {
	id: "multi-series-scatter-chart",
	name: "多系列散点图",
	type: "scatter-chart",
	options: multiSeriesScatterChartOptions(),
}

/**
 * 气泡图组件
 */
const bubbleChart: ConponentsAttribute = {
	id: "bubble-chart",
	name: "气泡图",
	type: "scatter-chart",
	options: bubbleChartOptions(),
}

/**
 * 统一导出所有散点图组件
 */
export const allKindsOfScatterCharts: ConponentsAttribute[] = [
	basicScatterChart,
	multiSeriesScatterChart,
	bubbleChart,
]


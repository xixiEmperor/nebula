/**
 * 折线图配置文件
 * 包含各种折线图的配置模板和组件定义
 */

import type { ConponentsAttribute, ChartAttribute } from "@/types/components";
import _ from "lodash";

/**
 * 基础折线图配置模板
 * 作为所有折线图的基础配置
 */
const baseLineOptions: ChartAttribute = {
	title: {
		text: "基础折线图",
		left: "center",
		top: 15,
		textStyle: {
			color: "#ffffff",
			fontSize: 16,
		},
	},
	tooltip: {
		trigger: "axis",
		show: true,
	},
	xAxis: {
		type: "category",
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
			type: "line",
			data: [150, 230, 224, 218, 135, 147, 260],
		},
	],
}

/**
 * 基础折线图配置生成函数
 * @returns 基础折线图的配置对象
 */
const basicLineChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseLineOptions);
	return config;
}

/**
 * 平滑折线图配置生成函数
 * @returns 平滑折线图的配置对象
 */
const smoothLineChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseLineOptions);
	config.title.text = "平滑折线图";
	config.series = [
		{
			type: "line",
			data: [150, 230, 224, 218, 135, 147, 260],
			smooth: true, // 平滑曲线
		},
	];
	return config;
}

/**
 * 多系列折线图配置生成函数
 * 注意：必须是多系列才会显示图例
 * @returns 多系列折线图的配置对象
 */
const multiSeriesLineChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseLineOptions);
	config.title.text = "多系列折线图";
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
			type: "line",
			data: [150, 230, 224, 218, 135, 147, 260],
		},
		{
			name: "系列2",
			type: "line",
			data: [120, 180, 150, 190, 160, 170, 200],
		},
	];
	return config;
}

/**
 * 堆叠折线图配置生成函数
 * @returns 堆叠折线图的配置对象
 */
const stackedLineChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseLineOptions);
	config.title.text = "堆叠折线图";
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
			name: "Email",
			type: "line",
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: "Union Ads",
			type: "line",
			data: [220, 182, 191, 234, 290, 330, 310],
		},
		{
			name: "Video Ads",
			type: "line",
			data: [150, 232, 201, 154, 190, 330, 410],
		},
	];
	return config;
}

/**
 * 基础折线图组件
 */
export const basicLineChart: ConponentsAttribute = {
	id: "basic-line-chart",
	name: "基础折线图",
	type: "line-chart",
	options: basicLineChartOptions(),
}

/**
 * 平滑折线图组件
 */
const smoothLineChart: ConponentsAttribute = {
	id: "smooth-line-chart",
	name: "平滑折线图",
	type: "line-chart",
	options: smoothLineChartOptions(),
}

/**
 * 多系列折线图组件
 * 注意：必须是多系列才会显示图例
 */
const multiSeriesLineChart: ConponentsAttribute = {
	id: "multi-series-line-chart",
	name: "多系列折线图",
	type: "line-chart",
	options: multiSeriesLineChartOptions(),
}

/**
 * 堆叠折线图组件
 */
const stackedLineChart: ConponentsAttribute = {
	id: "stacked-line-chart",
	name: "堆叠折线图",
	type: "line-chart",
	options: stackedLineChartOptions(),
}

/**
 * 统一导出所有折线图组件
 */
export const allKindsOfLineCharts: ConponentsAttribute[] = [
	basicLineChart,
	smoothLineChart,
	multiSeriesLineChart,
	stackedLineChart,
]

import type { ConponentsAttribute, ChartAttribute } from "@/types/components";
import _ from "lodash";

/**
 * 基础仪表盘配置模板
 */
const baseGaugeOptions: ChartAttribute = {
	title: {
		text: "基础仪表盘",
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
			type: "gauge",
			min: 0,
			max: 100,
			data: [
				{ value: 75, name: '完成率' }
			],
		},
	],
}

/**
 * 基础仪表盘配置生成函数
 */
const basicGaugeChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseGaugeOptions);
	return config;
}

/**
 * 速度仪表盘配置生成函数
 */
const speedGaugeChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseGaugeOptions);
	config.title.text = "速度仪表盘";
	config.series = [
		{
			type: "gauge",
			min: 0,
			max: 200,
			data: [
				{ value: 88, name: '速度 km/h' }
			],
		},
	];
	return config;
}

/**
 * 温度仪表盘配置生成函数
 */
const temperatureGaugeChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseGaugeOptions);
	config.title.text = "温度仪表盘";
	config.series = [
		{
			type: "gauge",
			min: -50,
			max: 50,
			data: [
				{ value: 25, name: '温度 °C' }
			],
		},
	];
	return config;
}

/**
 * 基础仪表盘组件
 */
export const basicGaugeChart: ConponentsAttribute = {
	id: "basic-gauge-chart",
	name: "基础仪表盘",
	type: "gauge-chart",
	options: basicGaugeChartOptions(),
}

/**
 * 速度仪表盘组件
 */
const speedGaugeChart: ConponentsAttribute = {
	id: "speed-gauge-chart",
	name: "速度仪表盘",
	type: "gauge-chart",
	options: speedGaugeChartOptions(),
}

/**
 * 温度仪表盘组件
 */
const temperatureGaugeChart: ConponentsAttribute = {
	id: "temperature-gauge-chart",
	name: "温度仪表盘",
	type: "gauge-chart",
	options: temperatureGaugeChartOptions(),
}

/**
 * 统一导出所有仪表盘组件
 */
export const allKindsOfGaugeCharts: ConponentsAttribute[] = [
	basicGaugeChart,
	speedGaugeChart,
	temperatureGaugeChart,
]


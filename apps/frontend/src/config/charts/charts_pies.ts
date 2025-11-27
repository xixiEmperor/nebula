import type { ConponentsAttribute, ChartAttribute } from "@/types/charts-components";
import _ from "lodash";

/**
 * 基础饼图配置模板
 */
const basePieOptions: ChartAttribute = {
	title: {
		text: "基础饼图",
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
			type: "pie",
			radius: "50%",
			data: [
				{ name: '分类A', value: 335 },
				{ name: '分类B', value: 310 },
				{ name: '分类C', value: 234 },
				{ name: '分类D', value: 135 },
				{ name: '分类E', value: 548 },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		},
	],
}

/**
 * 基础饼图配置生成函数
 */
const basicPieChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(basePieOptions);
	return config;
}

/**
 * 环形饼图配置生成函数
 */
const doughnutPieChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(basePieOptions);
	config.title.text = "环形饼图";
	config.series[0].radius = ['40%', '70%']; // 内外半径
	return config;
}

/**
 * 南丁格尔图（玫瑰图）配置生成函数
 */
const roseChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(basePieOptions);
	config.title.text = "南丁格尔图";
	config.series[0].roseType = 'area';
	config.series[0].radius = ['20%', '70%'];
	return config;
}

/**
 * 带图例的饼图配置生成函数
 * 注意：饼图的图例会自动根据数据生成
 */
const pieChartWithLegendOptions = (): ChartAttribute => {
	const config = _.cloneDeep(basePieOptions);
	config.title.text = "带图例的饼图";
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
 * 基础饼图组件
 */
export const basicPieChart: ConponentsAttribute = {
	id: "basic-pie-chart",
	name: "基础饼图",
	type: "pie-chart",
	options: basicPieChartOptions(),
}

/**
 * 环形饼图组件
 */
const doughnutPieChart: ConponentsAttribute = {
	id: "doughnut-pie-chart",
	name: "环形饼图",
	type: "pie-chart",
	options: doughnutPieChartOptions(),
}

/**
 * 南丁格尔图组件
 */
const roseChart: ConponentsAttribute = {
	id: "rose-chart",
	name: "南丁格尔图",
	type: "pie-chart",
	options: roseChartOptions(),
}

/**
 * 带图例的饼图组件
 */
const pieChartWithLegend: ConponentsAttribute = {
	id: "pie-chart-with-legend",
	name: "带图例的饼图",
	type: "pie-chart",
	options: pieChartWithLegendOptions(),
}

/**
 * 统一导出所有饼图组件
 */
export const allKindsOfPieCharts: ConponentsAttribute[] = [
	basicPieChart,
	doughnutPieChart,
	roseChart,
	pieChartWithLegend,
]
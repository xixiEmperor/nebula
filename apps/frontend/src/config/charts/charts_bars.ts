/**
 * 柱状图配置文件
 * 包含各种柱状图的配置模板和组件定义
 */

import type { ConponentsAttribute, ChartAttribute } from "@/types/charts-components";
import _ from "lodash";

/**
 * 基础柱状图配置模板
 * 作为所有柱状图的基础配置
 */
const baseOptions: ChartAttribute = {
	title: {
		text: "基础柱状图",
		left: "center",
		top: 15,
		textStyle: {
			color: "#ffffff",
			fontSize: 16,
		},
	},
	xAxis: {
		type: "category",
		data: ['A', 'B', 'C'],
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
			type: "bar",
			data: [10, 20, 30],
		},
	],
}

/**
 * 基础柱状图配置生成函数
 * @returns 基础柱状图的配置对象
 */
const basicBarChartOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseOptions)
	config.title.top = 15
	return config
}

/**
 * 带图例的柱状图配置生成函数
 * 注意：必须是多系列才会显示图例
 * @returns 带图例的柱状图配置对象
 */
const basicBarChartWithLegendOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseOptions)
	config.title.text = "带图例的柱状图"
	config.title.subtext = "世界人口"
	config.legend = {
		orient: "horizontal",
		left: "center",
		show: true,
		top: "bottom",
	}
	config.xAxis = {
		...config.xAxis,
		data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
		boundaryGap: [0, 0.01]
	}
	config.series = [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
	return config
}

/**
 * 带tooltip的柱状图配置生成函数
 * @returns 带tooltip的柱状图配置对象
 */
const basicBarChartWithTooltipOptions = (): ChartAttribute => {
	const config = _.cloneDeep(baseOptions)
	config.title.text = "带tooltip的柱状图"
	config.tooltip = {
		trigger: "item",
	}
	return config
}

/**
 * 基础柱状图组件
 */
export const basicBarChart: ConponentsAttribute = {
	id: "basic-bar-chart",
	name: "基础柱状图",
	type: "bar-chart",
	options: basicBarChartOptions(),
}

/**
 * 带图例的柱状图组件
 * 注意：必须是多系列才会显示图例
 */
const basicBarChartWithLegend: ConponentsAttribute = {
	id: "basic-bar-chart-with-legend",
	name: "带图例的柱状图",
	type: "bar-chart",
	options: basicBarChartWithLegendOptions(),
}

/**
 * 带tooltip的柱状图组件
 */
const basicBarChartWithTooltip: ConponentsAttribute = {
	id: "basic-bar-chart-with-tooltip",
	name: "带tooltip的柱状图",
	type: "bar-chart",
	options: basicBarChartWithTooltipOptions(),
}

/**
 * 统一导出所有柱状图组件
 */
export const allKindsOfBarCharts : ConponentsAttribute[] = [
	basicBarChart,
	basicBarChartWithLegend,
	basicBarChartWithTooltip,
]
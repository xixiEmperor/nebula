import type { RJSFSchema, UiSchema } from '@rjsf/utils';

const textStyleSchema: RJSFSchema = {
  type: 'object',
  title: '文本样式',
  properties: {
    color: { type: 'string', title: '颜色', format: 'color' },
    fontSize: { type: 'number', title: '字体大小' },
  },
};

const titleSchema: RJSFSchema = {
  type: 'object',
  title: '标题配置',
  properties: {
    text: { type: 'string', title: '标题文本' },
    subtext: { type: 'string', title: '副标题' },
    left: { type: 'string', title: '水平位置', enum: ['left', 'center', 'right'] },
    top: { type: 'string', title: '垂直位置' }, // Can be string or number, keeping simple as string/number handled by schema often needs 'oneOf' or loose type.
    textStyle: textStyleSchema,
  },
};

const legendSchema: RJSFSchema = {
  type: 'object',
  title: '图例配置',
  properties: {
    show: { type: 'boolean', title: '显示图例' },
    orient: { type: 'string', title: '布局朝向', enum: ['horizontal', 'vertical'] },
    left: { type: 'string', title: '水平位置', enum: ['left', 'center', 'right'] },
    top: { type: 'string', title: '垂直位置', enum: ['top', 'middle', 'bottom'] },
    textStyle: textStyleSchema,
  },
};

const tooltipSchema: RJSFSchema = {
  type: 'object',
  title: '提示框配置',
  properties: {
    show: { type: 'boolean', title: '显示提示框' },
    trigger: { type: 'string', title: '触发类型', enum: ['item', 'axis', 'none'] },
  },
};

const axisLineSchema: RJSFSchema = {
  type: 'object',
  title: '轴线配置',
  properties: {
    lineStyle: {
      type: 'object',
      properties: {
        color: { type: 'string', title: '颜色', format: 'color' },
        width: { type: 'number', title: '宽度' },
        type: { type: 'string', title: '类型', enum: ['solid', 'dashed', 'dotted'] },
      },
    },
  },
};

const axisLabelSchema: RJSFSchema = {
  type: 'object',
  title: '轴标签配置',
  properties: {
    color: { type: 'string', title: '颜色', format: 'color' },
    fontSize: { type: 'number', title: '字体大小' },
    rotate: { type: 'number', title: '旋转角度' },
  },
};

const axisSchema: RJSFSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', title: '类型', enum: ['value', 'category', 'time', 'log'] },
    name: { type: 'string', title: '名称' },
    show: { type: 'boolean', title: '是否显示' },
    axisLine: axisLineSchema,
    axisLabel: axisLabelSchema,
    // data is usually for category axis
    data: {
      type: 'array',
      title: '类目数据',
      items: { type: 'string' },
    },
  },
};

const seriesItemSchema: RJSFSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: '系列名称' },
    type: { type: 'string', title: '类型', enum: ['line', 'bar', 'pie'] },
    smooth: { type: 'boolean', title: '平滑曲线' }, // specific to line
    radius: { // specific to pie
      oneOf: [
        { type: 'string', title: '半径(百分比)' },
        { type: 'number', title: '半径(数值)' },
        { type: 'array', items: { type: 'string' }, title: '半径(环形)' }
      ]
    },
    // We generally don't want to edit large datasets in a form, but small config is ok.
    // Assuming data modification happens elsewhere or this is just for styling.
  },
};

export const commonChartSchema: { schema: RJSFSchema; uiSchema: UiSchema } = {
  schema: {
    type: 'object',
    properties: {
      title: titleSchema,
      legend: legendSchema,
      tooltip: tooltipSchema,
      // grid: ...
      xAxis: { ...axisSchema, title: 'X轴配置' },
      yAxis: { ...axisSchema, title: 'Y轴配置' },
      // series is complex, maybe just basic styling for now?
    },
  },
  uiSchema: {
    'ui:order': ['title', 'legend', 'tooltip', 'xAxis', 'yAxis', '*'],
    title: {
      textStyle: { color: { 'ui:widget': 'color' } },
    },
    legend: {
      textStyle: { color: { 'ui:widget': 'color' } },
    },
    xAxis: {
      axisLine: { lineStyle: { color: { 'ui:widget': 'color' } } },
      axisLabel: { color: { 'ui:widget': 'color' } },
    },
    yAxis: {
      axisLine: { lineStyle: { color: { 'ui:widget': 'color' } } },
      axisLabel: { color: { 'ui:widget': 'color' } },
    },
  },
};

export const getChartSchema = (type: string) => {
  // Currently returning a generic chart schema for all chart types
  // You can specialize based on type ('line-chart', 'bar-chart', 'pie-chart')
  const schema = JSON.parse(JSON.stringify(commonChartSchema.schema));
  const uiSchema = JSON.parse(JSON.stringify(commonChartSchema.uiSchema));

  if (type === 'pie-chart') {
    delete schema.properties.xAxis;
    delete schema.properties.yAxis;
    delete uiSchema.xAxis;
    delete uiSchema.yAxis;
  }

  return { schema, uiSchema };
};


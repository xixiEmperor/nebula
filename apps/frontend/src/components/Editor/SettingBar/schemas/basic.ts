import type { RJSFSchema, UiSchema } from '@rjsf/utils';

export const basicTextSchema: { schema: RJSFSchema; uiSchema: UiSchema } = {
  schema: {
    type: 'object',
    properties: {
      content: { type: 'string', title: '文本内容' },
      fontSize: { type: 'number', title: '字体大小' },
      color: { type: 'string', title: '字体颜色', format: 'color' },
      fontWeight: { type: 'number', title: '字体粗细', enum: [400, 500, 700] },
      textAlign: { type: 'string', title: '对齐方式', enum: ['left', 'center', 'right'] },
      fontFamily: { type: 'string', title: '字体' },
    },
  },
  uiSchema: {
    content: { 'ui:widget': 'textarea' },
    color: { 'ui:widget': 'color' },
  },
};

export const basicTitleSchema: { schema: RJSFSchema; uiSchema: UiSchema } = {
  schema: {
    type: 'object',
    properties: {
      content: { type: 'string', title: '标题内容' },
      level: { type: 'number', title: '标题级别', enum: [1, 2, 3, 4, 5, 6] },
      fontSize: { type: 'number', title: '字体大小' },
      color: { type: 'string', title: '字体颜色', format: 'color' },
      fontWeight: { type: 'number', title: '字体粗细' },
      textAlign: { type: 'string', title: '对齐方式', enum: ['left', 'center', 'right'] },
    },
  },
  uiSchema: {
    color: { 'ui:widget': 'color' },
  },
};

export const basicImageSchema: { schema: RJSFSchema; uiSchema: UiSchema } = {
  schema: {
    type: 'object',
    properties: {
      src: { type: 'string', title: '图片地址' },
      alt: { type: 'string', title: '替代文本' },
      width: { type: 'string', title: '宽度' },
      height: { type: 'string', title: '高度' },
      borderRadius: { type: 'number', title: '圆角' },
      objectFit: {
        type: 'string',
        title: '填充方式',
        enum: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      },
    },
  },
  uiSchema: {},
};

export const basicTimeSchema: { schema: RJSFSchema; uiSchema: UiSchema } = {
  schema: {
    type: 'object',
    properties: {
      format: { type: 'string', title: '时间格式' },
      timezone: { type: 'string', title: '时区' },
      fontSize: { type: 'number', title: '字体大小' },
      color: { type: 'string', title: '字体颜色', format: 'color' },
    },
  },
  uiSchema: {
    color: { 'ui:widget': 'color' },
  },
};

export const basicMarqueeSchema: { schema: RJSFSchema; uiSchema: UiSchema } = {
  schema: {
    type: 'object',
    properties: {
      content: { type: 'string', title: '滚动内容' },
      speed: { type: 'number', title: '滚动速度' },
      direction: { type: 'string', title: '滚动方向', enum: ['left', 'right', 'up', 'down'] },
      fontSize: { type: 'number', title: '字体大小' },
      color: { type: 'string', title: '字体颜色', format: 'color' },
    },
  },
  uiSchema: {
    content: { 'ui:widget': 'textarea' },
    color: { 'ui:widget': 'color' },
  },
};

export const basicContainerSchema: { schema: RJSFSchema; uiSchema: UiSchema } = {
  schema: {
    type: 'object',
    properties: {
      backgroundColor: { type: 'string', title: '背景颜色', format: 'color' },
      borderColor: { type: 'string', title: '边框颜色', format: 'color' },
      borderWidth: { type: 'number', title: '边框宽度' },
      borderRadius: { type: 'number', title: '圆角' },
      padding: { type: 'number', title: '内边距' },
    },
  },
  uiSchema: {
    backgroundColor: { 'ui:widget': 'color' },
    borderColor: { 'ui:widget': 'color' },
  },
};

export const getBasicSchema = (type: string) => {
  switch (type) {
    case 'basic.text':
      return basicTextSchema;
    case 'basic.title':
      return basicTitleSchema;
    case 'basic.image':
      return basicImageSchema;
    case 'basic.time':
      return basicTimeSchema;
    case 'basic.marquee':
      return basicMarqueeSchema;
    case 'basic.container':
      return basicContainerSchema;
    default:
      return { schema: {}, uiSchema: {} };
  }
};


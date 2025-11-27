import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import { getBasicSchema } from './basic';
import { getChartSchema } from './charts';

export const getComponentSchema = (type: string): { schema: RJSFSchema; uiSchema: UiSchema } => {
  if (type.startsWith('basic.')) {
    return getBasicSchema(type);
  }
  if (type.endsWith('-chart')) {
    return getChartSchema(type);
  }
  
  // Default fallback
  return {
    schema: { type: 'object', properties: {} },
    uiSchema: {},
  };
};


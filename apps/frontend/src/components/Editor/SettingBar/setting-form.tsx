import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { useState, useMemo, useEffect } from 'react';
import { getComponentSchema } from './schemas';
import { basicComponentsByType } from '@/config/basic_components';
import { allKindsOfLineCharts } from '@/config/charts/charts_lines';
import { allKindsOfBarCharts } from '@/config/charts/charts_bars';
import { allKindsOfPieCharts } from '@/config/charts/charts_pies';
import { Select } from 'antd';

// Combine all components for the demo selector
const allComponents = [
  ...Object.values(basicComponentsByType),
  ...allKindsOfLineCharts,
  ...allKindsOfBarCharts,
  ...allKindsOfPieCharts,
];

export default function SettingForm() {
  // Default to the first component (e.g. basic.text)
  const [selectedId, setSelectedId] = useState(allComponents[0]?.id);
  const [formData, setFormData] = useState(allComponents[0]?.options);

  const currentComponent = useMemo(() => 
    allComponents.find(c => c.id === selectedId) || allComponents[0]
  , [selectedId]);

  // Reset form data when component type changes to match the new component's defaults
  useEffect(() => {
    if (currentComponent) {
      setFormData(currentComponent.options);
    }
  }, [currentComponent]);

  const { schema, uiSchema } = useMemo(() => {
    if (!currentComponent) return { schema: {}, uiSchema: {} };
    return getComponentSchema(currentComponent.type);
  }, [currentComponent]);

  const handleChange = (e: any) => {
    setFormData(e.formData);
    console.log('Form Data Changed:', e.formData);
  };

  return (
    <div className="p-4 w-full h-full overflow-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">选择组件 (Demo)</label>
        <Select
          style={{ width: '100%' }}
          value={selectedId}
          onChange={(value) => setSelectedId(value)}
          options={allComponents.map(c => ({ label: c.name, value: c.id }))}
        />
      </div>

      <div className="setting-form-container">
        {currentComponent && (
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            validator={validator}
            onChange={handleChange}
            onSubmit={(e) => console.log('Submitted:', e.formData)}
            onError={(e) => console.log('Errors:', e)}
            className="ant-form-vertical" // Try to leverage basic ant styles if applicable
          />
        )}
      </div>
    </div>
  );
}

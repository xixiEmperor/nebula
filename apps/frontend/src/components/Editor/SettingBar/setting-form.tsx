import Form from '@rjsf/core';
import type { RJSFSchema, UiSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8';
import './setting-form.css';

export default function SettingForm() {
  const schema: RJSFSchema = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: '标题'
      },
      description: {
        type: 'string',
        title: '描述'
      },
    },
    required: ['title'],
  };

  const uiSchema: UiSchema = {
    "ui:order": ["title", "description"],
    "ui:classNames": "setting-form",
    title: {
      "ui:autofocus": true,
      "ui:placeholder": "请输入标题",
      "ui:help": "这是组件的标题，必填项",
      "ui:classNames": "title-field"
    },
    description: {
      "ui:widget": "textarea",
      "ui:placeholder": "请输入描述信息",
      "ui:help": "这是组件的描述信息，选填项",
      "ui:options": {
        rows: 4
      },
      "ui:classNames": "description-field"
    },
    "ui:submitButtonOptions": {
      "submitText": "确认修改",
      "props": {
        "className": "w-[100px] bg-red-500 text-white"
      }
    }
  };

  const formData = {
    title: '测试标题',
    description: '测试描述',
  };

  return (
    <Form 
    // TODO: 此处需要填入的schema是具体选定的组件对应的schema
      schema={schema} 
      uiSchema={uiSchema}
      formData={formData}
      validator={validator} 
      onSubmit={(formData) => {
        console.log(formData);
      }}
    />
  );
}
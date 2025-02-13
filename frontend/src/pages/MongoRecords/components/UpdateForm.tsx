import { ProFormText, StepsForm } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export interface FormValueType extends Partial<any> {
  name?: string;
  level?: string;
  position?: string;
  _id?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<FormValueType>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <StepsForm
    stepsProps={{
      size: 'small',
    }}
    stepsFormRender={(dom, submitter) => {
      return (
        <Modal
          width={640}
          bodyStyle={{ padding: '32px 40px 48px' }}
          destroyOnClose
          title="Edit"
          open={props.updateModalVisible}
          footer={submitter}
          onCancel={() => props.onCancel()}
        >
          {dom}
        </Modal>
      );
    }}
    onFinish={props.onSubmit}
  >
    <StepsForm.StepForm
      initialValues={{
        _id: props.values._id,
        name: props.values.name,
        level: props.values.level,
        position: props.values.position,
      }}
    >
      <ProFormText name="_id" hidden />
      <ProFormText
        width="md"
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Required!' }]}
      />
      <ProFormText
        width="md"
        name="level"
        label="Level"
        rules={[{ required: true, message: 'Required!' }]}
      />
      <ProFormText
        width="md"
        name="position"
        label="Position"
        rules={[{ required: true, message: 'Required!' }]}
      />
    </StepsForm.StepForm>

    {/* <ProFormRadio.Group
        name="type"
        width="md"
        label="规则类型"
        options={[
          {
            value: '0',
            label: '强',
          },
          {
            value: '1',
            label: '弱',
          },
        ]}
      /> */}
  </StepsForm>
);

export default UpdateForm;

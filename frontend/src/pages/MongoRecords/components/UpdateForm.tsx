import { ModalForm, ProFormText } from '@ant-design/pro-components';
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
  <ModalForm
    title="Edit"
    width={420}
    modalProps={{
      destroyOnClose: true,
      onCancel: () => props.onCancel(),
    }}
    initialValues={props.values}
    onFinish={props.onSubmit}
    open={props.updateModalVisible}
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
      name="position"
      label="Position"
      rules={[{ required: true, message: 'Required!' }]}
    />
    <ProFormText
      width="md"
      name="level"
      label="Level"
      rules={[{ required: true, message: 'Required!' }]}
    />
    {/* <ProFormRadio.Group
        name="level"
        width="md"
        label="Level"
        options={[
          {
            value: 'INTERN',
            label: 'Intern',
          },
          {
            value: 'JUNIOR',
            label: 'Junior',
          },
          {
            value: 'SENIOR',
            label: 'Senior',
          },
        ]}
      /> */}
  </ModalForm>
);

export default UpdateForm;

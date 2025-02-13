import { queryUserList } from '@/services/demo/UserController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Divider, message } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

const MongoRecords: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const actionRef = useRef<any>();
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'required',
          },
        ],
      },
    },
    {
      title: 'Level',
      dataIndex: 'level',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'required',
          },
        ],
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'required',
          },
        ],
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      valueType: 'action',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              console.log({ record });

              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Edit
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleDeleteRecord(record)}>Delete</a>
        </>
      ),
    },
  ];

  const handleAddRecord = async (newRecord: any) => {
    try {
      await axios.put('http://localhost:5050/api/records', newRecord);

      message.success('Record added successfully!');
    } catch (error) {
      console.error('Error adding record:', error);
      message.error('Failed to add record');
    }
  };

  const handleUpdateRecord = async (fields: FormValueType) => {
    try {
      await axios.patch(`http://localhost:5050/api/records/${fields._id}`, {
        name: fields.name || '',
        level: fields.level || '',
        position: fields.position || '',
      });
      message.success('Record updated successfully!');
    } catch (error) {
      console.error('Error updating record:', error);
      message.error('Failed to update record');
    }
  };

  const handleDeleteRecord = async (fields: FormValueType) => {
    try {
      await axios.delete(`http://localhost:5050/api/records/${fields._id}`);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      message.success('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting record:', error);
      message.error('Failed to delete record');
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Mongo data',
      }}
    >
      <ProTable<any>
        headerTitle="CRUD operations"
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            Add
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          try {
            const res = await queryUserList({
              ...params,
              // FIXME: remove @ts-ignore
              // @ts-ignore
              sorter,
              filter,
            });

            return {
              data: res || [],
              success: true,
            };
          } catch (error) {
            console.error(error);
            return {
              data: [],
              success: false,
            };
          }
        }}
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.UserInfo, API.UserInfo>
          onSubmit={async (value) => {
            await handleAddRecord(value);
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            await handleUpdateRecord(value);
            handleUpdateModalVisible(false);
            setStepFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default MongoRecords;

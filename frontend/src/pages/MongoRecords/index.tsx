import { queryUserList } from '@/services/demo/UserController';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, message, Modal } from 'antd';
import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

const MongoRecords: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const actionRef = useRef<ActionType>();

  const handleAddRecord = useCallback(async (newRecord: MongoAPI.UserInfo) => {
    try {
      await axios.post('http://localhost:5050/api/records', newRecord);

      message.success('Record added successfully!');
    } catch (error) {
      console.error('Error adding record:', error);
      message.error('Failed to add record');
    }
  }, []);

  const handleUpdateRecord = useCallback(async (fields: FormValueType) => {
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
  }, []);

  const handleDeleteRecord = useCallback(
    async (id: MongoAPI.UserInfo['_id']) => {
      Modal.confirm({
        title: 'Are you sure you want to delete this record?',
        content: 'This action cannot be undone.',
        okText: 'Yes, Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await axios.delete(`http://localhost:5050/api/records/${id}`);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            message.success('Record deleted successfully!');
          } catch (error) {
            console.error('Error deleting record:', error);
            message.error('Failed to delete record');
          }
        },
      });
    },
    [],
  );

  const columns: ProColumns<MongoAPI.UserInfo, 'text'>[] = [
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
      width: 120,
      align: 'right',
      dataIndex: 'action',
      search: false,
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Edit
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleDeleteRecord(record?._id)}>Delete</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Mongo data',
      }}
    >
      <ProTable<MongoAPI.UserInfo>
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
        <ProTable<MongoAPI.UserInfo, MongoAPI.UserInfo>
          onSubmit={async (value) => {
            await handleAddRecord(value);
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          rowKey="id"
          type="form"
          columns={columns.filter((col) => col.title !== 'Action')}
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

import React, { Fragment } from 'react';
import { ListSelectJob } from '../../../routes/admin/building/detail/room/item_select/index';
import moment from 'moment';
import { Popconfirm, Tooltip } from 'antd';
import { checkIdentityNumber } from '../../utils';

export const ColumnCustomerDeposit = ({ t, handleEdit, handleDelete, isLoading, formatDate, permissions }) => {
  return [
    // name
    {
      name: 'name',
      title: t('columns.admin.roomInfo.Name'),
      tableItem: {
        fixed: 'left',
        width: 200,
      },
      formItem: {
        col: 6,
        placeholder: t('columns.admin.roomInfo.Name'),
        rules: [{ type: 'required' }],
      },
    },
    // birthDay
    {
      name: 'birthDay',
      title: t('columns.admin.roomInfo.Birth Day'),
      tableItem: {
        fixed: 'left',
        width: 150,
        render: (text) => moment(text).format(formatDate),
      },
      formItem: {
        col: 6,
        placeholder: t('columns.admin.roomInfo.Birth Day'),
        rules: [{ type: 'required' }],
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
      },
    },
    // identityNumber
    {
      name: 'identityNumber',
      title: t('columns.admin.roomInfo.Identity Number'),
      tableItem: {
        fixed: 'left',
        width: 150,
      },
      formItem: {
        col: 6,
        placeholder: t('columns.admin.roomInfo.Identity Number'),
        rules: checkIdentityNumber(),
      },
    },
    // dateOfId
    {
      name: 'dateOfId',
      title: t('columns.admin.customer.Date Range'),
      formItem: {
        col: 6,
        placeholder: t('columns.admin.customer.Date Range'),
        rules: [{ type: 'required' }],
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
      },
    },
    // placeOfId
    {
      name: 'placeOfId',
      title: t('columns.admin.customer.Issued By'),
      formItem: {
        col: 6,
        placeholder: t('columns.admin.customer.Issued By'),
        rules: [{ type: 'required' }],
      },
    },
    // Gender
    {
      name: 'gender',
      title: t('columns.admin.customer.Gender'),
      formItem: {
        col: 6,
        placeholder: t('columns.admin.customer.Gender'),
        type: 'select',
        // className: "border-gray-400 border rounded-xl ",
        rules: [{ type: 'required' }],
        list: [
          { value: 'Nam', label: 'Nam' },
          { value: 'Nu', label: 'N???' },
        ],
      },
    },
    // address
    {
      name: 'address',
      title: t('columns.admin.roomInfo.Address'),
      formItem: {
        col: 6,
        placeholder: t('columns.admin.roomInfo.Address'),
        rules: [{ type: 'required' }],
      },
    },
    // job select
    {
      name: 'jobSelect',
      title: t('columns.admin.roomInfo.Job'),
      formItem: {
        col: 6,
        placeholder: t('columns.admin.roomInfo.Room Type'),
        type: 'select',
        // className: "border-gray-400 border rounded-xl ",
        rules: [{ type: 'required' }],
        list: ListSelectJob(t),
      },
    },
    // job
    {
      name: 'job',
      title: t('columns.admin.customer.Other Job'),
      formItem: {
        col: 6,
        condition: (values, form) => form.getFieldValue('jobSelect') === 'OTHER',
        placeholder: t('columns.admin.customer.Other Job'),
        // rules:[{type:"required"}],
      },
    },
    // workingAddress
    {
      name: 'workingAddress',
      title: t('columns.admin.roomInfo.Working Address'),
      formItem: {
        col: 6,
        placeholder: t('columns.admin.roomInfo.Working Address'),
        // rules:[{type:"required"}],
      },
    },
    // phoneNumber
    {
      name: 'phoneNumber',
      title: t('columns.admin.roomInfo.Phone Number'),
      tableItem: {
        fixed: 'left',
        width: 150,
      },
      formItem: {
        col: 6,
        placeholder: t('columns.admin.roomInfo.Phone Number'),
        rules: [
          { type: 'required' },
          { type: 'min', value: 9 },
          { type: 'max', value: 15 },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (!value || /^\+?\d+[-\s]?[0-9]+[-\s]?[0-9]+$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t('columns.auth.register.Phone number Rule'));
              },
            }),
          },
        ],
      },
    },
    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 120,
        fixed: 'right',
        align: 'center  ',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {permissions?.SUA_QUAN_LY_KHACH_COC_PHONG && (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed text-xs mr-2"
                      onClick={async () => {
                        handleEdit(record);
                      }}
                    >
                      <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                    </button>
                  </Tooltip>
                )}
                {permissions?.XOA_QUAN_LY_KHACH_COC_PHONG && (
                  <Tooltip title={t('routes.admin.Layout.Delete')}>
                    <Popconfirm
                      placement="left"
                      title={t('components.datatable.areYouSureWant')}
                      icon={
                        <i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />
                      }
                      onConfirm={() => {
                        handleDelete(record);
                      }}
                      okText={t('components.datatable.ok')}
                      cancelText={t('components.datatable.cancel')}
                    >
                      <button className="embed text-xs mr-2 mt-[5px]">
                        <span className="uhome-trash m-0 p-0 text-red-500 text-2xl"></span>
                      </button>
                    </Popconfirm>

                    {/*
                  <button
                    className="embed text-xs p-1"
                    onClick={() => Message.request(
                      t("components.message.Confirm Delete"),
                      t("components.message.Are you sure want to delete", {
                        object: t("kh??ch")
                      }),
                      false,
                      () => {
                        handleDelete(record);
                      }
                    )}
                  >
                    <span className="uhome-trash p-0 m-0 text-red-500 text-2xl"></span>
                  </button> */}
                  </Tooltip>
                )}
              </div>
            </Fragment>
          );
        },
      },
    },
  ];
};

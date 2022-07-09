import React, { Fragment } from 'react';
import { Popconfirm, Tooltip } from 'antd';

const Column = ({ t, permissions, handleEditRole, handleDelete, menuPermission, showDetail, setShowDetail }) => {
  return [
    // isDefault
    {
      name: 'isDefault',
      formItem: {
        condition: (values, form) => false,
      },
    },
    {
      title: t('routes.admin.role-management.Role Name'),
      name: 'name',
      tableItem: {
        fixed: 'left',
        width: 200,
        sorter: true,
      },
      formItem: {
        rules: [{ type: 'required' }],
        condition: (values, form) => !form.getFieldValue('isDefault'),
        readOnly: !showDetail,
      },
    },
    // name readonly
    {
      title: t('routes.admin.role-management.Role Name'),
      name: 'name',
      formItem: {
        condition: (values, form) => form.getFieldValue('isDefault'),
        readOnly: !showDetail,
      },
    },
    {
      title: t('routes.admin.role-management.Permision'),
      name: 'permissionList',
      formItem: {
        type: 'tree_select',
        list: permissions,
        showFather: true,
        mode: 'multiple',
        className: 'selectRole',
        col: 12,
        rules: [{ type: 'required' }],
        readOnly: !showDetail,
      },
    },
    {
      title: t('routes.admin.role-management.Describe'),
      name: 'description',
      tableItem: {
        sorter: true,
        width: 250,
      },
      formItem: {
        type: 'textarea',
        col: 12,
        rules: [{ type: 'required' }],
        readOnly: !showDetail,
      },
    },
    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 120,
        fixed: 'right',
        // className:"flex justify-center",
        align: 'center ',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {!record.isDefault && !!menuPermission?.SUA_THIET_LAP_VAI_TRO ? (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed text-xs mr-2"
                      onClick={async () => {
                        setShowDetail(true);
                        handleEditRole(record);
                      }}
                    >
                      <i className="las la-edit m-0 p-0 text-3xl text-blue-500"></i>
                    </button>
                  </Tooltip>
                ) : null}
                {record.isDefault ? (
                  <Tooltip title={t('routes.admin.Layout.Detail')}>
                    <button
                      className="embed text-3xl mr-10"
                      onClick={async () => {
                        setShowDetail(false);
                        handleEditRole(record);
                      }}
                    >
                      <i className="la la-comment-o m-0 p-0 text-3xl text-blue-500 "></i>
                    </button>
                  </Tooltip>
                ) : null}
                {!record.isDefault && !!menuPermission?.XOA_THIET_LAP_VAI_TRO ? (
                  <Tooltip title={t('routes.admin.Layout.Delete')}>
                    <Popconfirm
                      placement="left"
                      title={t('components.datatable.areYouSureWant')}
                      icon={
                        <i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />
                      }
                      onConfirm={() => handleDelete(record.id)}
                      okText={t('components.datatable.ok')}
                      cancelText={t('components.datatable.cancel')}
                    >
                      <button className="embed text-xs mr-2 mt-[2px]">
                        {/* <RemoveIcon/> */}
                        <span className="uhome-trash m-0 p-0 text-red-500 text-2xl"></span>
                      </button>
                    </Popconfirm>
                  </Tooltip>
                ) : null}
              </div>
              {/* </div> */}
            </Fragment>
          );
        },
      },
    },
  ];
};
export default Column;

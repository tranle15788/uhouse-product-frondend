import React, { Fragment } from 'react';
import { Tooltip } from 'antd';

const Column = ({ t, handleEdit, handleDelete, permissions }) => {
  return [
    // tên tòa nhà
    {
      name: 'buildingName',
      title: t('columns.admin.buildingInfo.Building Name'),
      tableItem: {
        fixed: 'left',
        width: 150,
        sorter: true,
      },
    },

    // Address
    {
      name: 'userAddress',
      title: t('columns.admin.buildingInfo.Address'),
      tableItem: {
        placeholder: t('columns.admin.buildingInfo.Address'),
        sorter: true,
        width: 300,
      },
    },

    // userName
    {
      name: 'userName',
      title: t('columns.admin.profile.Fullname'),
      tableItem: {
        width: 150,
        sorter: true,
      },
      formItem: {
        // col: 6,
        // rules: [{ type: "required" }],
        rules: [
          // { type: "max", value: 40 }
          {
            type: 'required',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ/,\s]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('components.form.ruleName'));
              },
            }),
          },
        ],
      },
    },

    // userPhoneNumber
    {
      name: 'userPhoneNumber',
      title: t('columns.auth.register.Phone Number'),
      tableItem: {
        sorter: true,
        width: 135,
      },
    },
    // userIdentityCard
    {
      name: 'userIdentityCard',
      title: t('columns.auth.register.Identity Number'),
      tableItem: {
        sorter: true,
        width: 180,
      },
    },

    // roles
    {
      name: 'roles',
      title: t('columns.auth.register.Roles'),
      tableItem: {
        sorter: true,
        width: 300,
        render: (value) => <span>{value.map((ele) => ele.roleName).join(',')}</span>,
      },
    },

    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 100,
        fixed: 'right',
        align: 'center  ',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {permissions?.XOA_QUAN_LY_NHAN_VIEN_TOA_NHA && (
                  <Tooltip title={t('routes.admin.Layout.Delete')}>
                    <button onClick={() => handleDelete(record)} className="embed text-xs mr-2 mt-[3px]">
                      <span className="uhome-trash m-0 p-0 text-red-500 text-2xl"></span>
                    </button>
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
export default Column;

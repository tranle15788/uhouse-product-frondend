import React, { Fragment } from 'react';
import { Popconfirm, Tooltip } from 'antd';
import { formatCurrency } from 'utils';

export const ColumnExpensesTable = ({ t, formatDate, handleEdit, handleDelete, permissions }) => {
  return [
    // Expenses
    {
      name: 'name',
      title: t('columns.building_list.Cost'),
      tableItem: {
        fixed: 'left',
        width: 100,
      },
    },
    // description
    {
      name: 'description',
      title: t('columns.building_list.Description'),
      tableItem: {
        width: 300,
      },
    },
    // price
    {
      name: 'unitPrice',
      title: t('columns.building_list.Price'),
      tableItem: {
        width: 150,
        render: (text) => {
          return formatCurrency(text, '');
        },
      },
    },
    // unit
    {
      name: 'calculationUnit',
      title: t('columns.building_list.Unit'),
      tableItem: {
        width: 100,
      },
    },

    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 120,
        fixed: 'right',
        align: 'center',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {permissions?.SUA_QUAN_LY_CHI_PHI_TOA_NHA && (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed text-xs mr-2"
                      onClick={async () => {
                        record.unitPrice = Math.floor(record.unitPrice).toString();
                        handleEdit(record);
                      }}
                    >
                      <i className="las la-edit p-0 m-0 text-3xl text-blue-500"></i>
                    </button>
                  </Tooltip>
                )}
                {permissions?.XOA_QUAN_LY_CHI_PHI_TOA_NHA && (
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
                      <button className="embed text-xs mr-2 mt-[3px]">
                        {/* <RemoveIcon/> */}
                        <span className="uhome-trash m-0 p-0 text-red-500 text-2xl"></span>
                      </button>
                    </Popconfirm>
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
export const ColumnExpenses = ({ t, formatDate, handleEdit, handleDelete, permissions, setValue }) => {
  return [
    // Expenses
    {
      name: 'name',
      title: (
        <p>
          Chi phí <span className="text-red-600">*</span>:
        </p>
      ),
      formItem: {
        placeholder: t('columns.building_list.Cost'),
        rules: [{ type: 'required' }],
      },
    },
    // description
    {
      name: 'description',
      title: <p>Mô tả :</p>,
      formItem: {
        placeholder: t('columns.building_list.Description'),
        type: 'textarea',
      },
    },
    // price
    {
      name: 'unitPrice',
      title: (
        <p>
          Đơn giá <span className="text-red-600">*</span>:
        </p>
      ),
      formItem: {
        placeholder: t('columns.building_list.Price'),
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },

        rules: [
          { type: 'required' },
          //   { type: "custom",
          //   validator: () => ({
          //     validator(_, value) {
          //       if (!value || /^\d*(\.\d+)?$/.test(value)) {
          //         return Promise.resolve();
          //       }
          //       return Promise.reject(t("Chỉ nhập số"));
          //     }
          //   })
          // }
        ],
      },
    },
    // unit
    {
      name: 'calculationUnit',
      title: (
        <p>
          Đơn vị tính <span className="text-red-600">*</span>:
        </p>
      ),
      formItem: {
        placeholder: t('columns.building_list.Unit'),
        rules: [{ type: 'required' }],
      },
    },

    // radio
    {
      name: 'statusPayment',
      title: t('Hạn thanh toán:*'),
      formItem: {
        rules: [{ type: 'required' }],
        type: 'radio',
        className: 'pl-px',
        list: [
          {
            value: 'PER_CAPITA',
            label: <span className="ml-2 mr-8">Thanh toán trước</span>,
            // disabled: show,
          },
          {
            value: 'TOTAL',
            label: <span className="ml-2">Thanh toán sau</span>,
          },
        ],
      },
    },
  ];
};
export const ColumnSelectxpenses = ({ t, formatDate, expensesList, setEditExpenseForm, setValue }) => {
  return [
    // Expenses
    {
      name: 'name',
      title: (
        <p>
          Chi phí <span className="text-red-600">*</span>:
        </p>
      ),
      formItem: {
        placeholder: t('columns.building_list.Cost'),
        type: 'select',
        rules: [{ type: 'required' }],
        list: expensesList,
        onSelect: (value) => {
          const object = expensesList.find((ele) => ele.id === value);
          const object1 = {
            ...object,
            id: undefined,
            calculationUnit: object.calculationUnit,
            unitPrice: Math.floor(object.unitPrice).toString(),
          };
          setEditExpenseForm(object1);
        },
      },
    },
    // description
    {
      name: 'description',
      title: <p>Mô tả :</p>,
      formItem: {
        placeholder: t('columns.building_list.Description'),
        type: 'textarea',
      },
    },
    // price
    {
      name: 'unitPrice',
      title: (
        <p>
          Đơn giá <span className="text-red-600">*</span>:
        </p>
      ),
      formItem: {
        placeholder: t('columns.building_list.Price'),
        rules: [{ type: 'required' }],
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },
    // unit
    {
      name: 'calculationUnit',
      title: (
        <p>
          Đơn vị tính <span className="text-red-600">*</span>:
        </p>
      ),
      // formItem: {
      //   placeholder: t('columns.building_list.Unit'),
      // },
      formItem: {
        type: 'select',
        readOnly: true,
        col: 12,
        placeholder: t('Chọn đơn vị tính'),
        condition: (values, form) => form.getFieldsValue('name'),
        list: [
          {
            value: 'm³',
            label: 'm³',
          },
          {
            value: 'nguoi',
            label: 'Người',
          },
        ],
        onSelect: (value) => {
          setValue(value);
        },
      },
    },

    // radio
    {
      name: 'calculationType',
      title: (
        <p>
          Hạn thanh toán <span className="text-red-600">*</span>:
        </p>
      ),
      formItem: {
        type: 'radio',
        className: 'pl-px',
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'PER_CAPITA',
            label: <span className="ml-2 mr-8">Thanh toán trước</span>,
            // disabled: show,
          },
          {
            value: 'TOTAL',
            label: <span className="ml-2">Thanh toán sau</span>,
          },
        ],
      },
    },
  ];
};

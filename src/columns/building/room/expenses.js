import React, { Fragment, useEffect, useState } from 'react';
import { formatCurrency } from 'utils';
import { Popconfirm, Tooltip } from 'antd';

export const roomExpensesFormTable = ({ t, handleEdit, handleDelete, permissions }) => {

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
        width: 100,
        render: (text) => {
          return formatCurrency(text, '');
        },
      },
    },
    // unit
    {
      name: 'unit',
      title: t('Đơn vị tính'),
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
        align: 'center  ',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {permissions?.SUA_QUAN_LY_CHI_PHI_PHONG && (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed text-xs mr-2"
                      onClick={async () => {
                        record.unitPrice = Math.floor(record.unitPrice).toString();
                        handleEdit(record);
                      }}
                    >
                      <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                    </button>
                  </Tooltip>
                )}

                {permissions?.XOA_QUAN_LY_CHI_PHI_PHONG && (
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
                      <button className="embed text-xs mr-2 mt-[4px]">
                        <span className="uhome-trash m-0 p-0 text-red-500 text-2xl"></span>
                      </button>
                    </Popconfirm>

                    {/* <button
                        className="embed text-xs p-1"
                        onClick={()=>Message.request(
                          t("components.message.Confirm Delete"),
                          t("components.message.Are you sure want to delete", {
                            object: t("columns.admin.building.cost")
                          }),
                          false,
                          ()=> {
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

export const roomExpensesForm = ({ t, handleEdit, handleDelete, permissions }) => {

  return [
    // Expenses
    {
      name: 'name',
      title: (<p>Chi phí <span className='text-red-600'>*</span>:</p>),
      tableItem: {
        fixed: 'left',
        width: 100,
      },
      formItem: {
        placeholder: t('columns.building_list.Cost'),
        rules: [{ type: 'required' }],
      },
    },
    // description
    {
      name: 'description',
      title: t('columns.building_list.Description'),
      tableItem: {
        width: 300,
      },
      formItem: {
        placeholder: t('columns.building_list.Description'),
        type: 'textarea',
      },
    },
    // price
    {
      name: 'unitPrice',
      title: (<p>Đơn giá <span className='text-red-600'>*</span>:</p>),
      tableItem: {
        width: 100,
        render: (text) => {
          return formatCurrency(text, '');
        },
      },
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
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (!value || /^\d*(\.\d+)?$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t('Chỉ nhập số'));
              },
            }),
          },
        ],
      },
    },
    // unit
    {
      name: 'unit',
      title: (<p>Đơn vị tính <span className='text-red-600'>*</span>:</p>),
      formItem: {
        col: 12,
        placeholder: t('Nhập đơn vị tính'),
        type: [{ type: 'required' }],
      },
    },
    // radio
    {
      name: 'statusPayment',
      title: (<p>Hạn thanh toán <span className='text-red-600'>*</span>:</p>),
      formItem: {
        type: 'radio',
        className: 'pl-px',
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'PAYMENTBF',
            label: (<span className='ml-2 mr-8'>Thanh toán trước</span>),
            // disabled: show,
          },
          {
            value: 'PAYMENTAT',
            label: (<span className='ml-2'>Thanh toán sau</span>),
          },
        ],
      },
    },
  ];
};


export const RoomExpensesSelectForm = ({ t, expensesList, setEditExpenseForm, setValue }) => {

  const [disabledUnit, setShowDisabledUnit] = useState(true);
  useEffect(() => {
console.log('fbrsfg',disabledUnit)
  }, [disabledUnit]);

  return [

    // Expenses
    {
      name: 'name',
      title: (<p>Chi phí <span className='text-red-600'>*</span>:</p>),
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
            unit: object.calculationUnit,
            unitPrice: Math.floor(object.unitPrice).toString(),
          };
          setEditExpenseForm(object1);
          // console.log('Nước',object1.name );
          object1.name === 'Nước' ? setShowDisabledUnit(false): setShowDisabledUnit(true);
        },
      },
    },
    // description
    {
      name: 'description',
      title: t('columns.building_list.Description'),
      formItem: {
        placeholder: t('columns.building_list.Description'),
        type: 'textarea',
      },
    },
    // price
    {
      name: 'unitPrice',
      title: (<p>Đơn giá <span className='text-red-600'>*</span>:</p>),
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
      name: 'unit',
      title: (<p>Đơn vị tính <span className='text-red-600'>*</span>:</p>),
      formItem: {
        type: 'select',
        readOnly: disabledUnit,
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
      name: 'statusPayment',
      title: (<p>Hạn thanh toán <span className='text-red-600'>*</span>:</p>),
      formItem: {
        type: 'radio',
        className: 'pl-px',
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'PAYMENTBF',
            label: (<span className='ml-2 mr-8'>Thanh toán trước</span>),
            // disabled: show,
          },
          {
            value: 'PAYMENTAT',
            label: (<span className='ml-2'>Thanh toán sau</span>),
          },
        ],
      },
    },
  ];
};

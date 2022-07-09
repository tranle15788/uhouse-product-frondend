import React, { Fragment } from 'react';
import { Tooltip, Switch, Popconfirm } from 'antd';
import { formatNumber } from 'utils';
import moment from 'moment';
import classNames from 'classnames';

const Column = ({ t, handleEdit, formatDate, handleDelete, handleSendMail }) => {
  return [
    // Building
    {
      name: 'room',
      title: t('columns.admin.building.Building'),
      tableItem: {
        render: (record) => record?.building?.name,
        align: 'center',
        width: 150,
        sorter: true,
        fixed: true,
      },
    },

    // Room Code
    {
      name: 'room',
      title: t('columns.admin.buildingInfo.Room Code'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (record) => record?.roomNumber,
      },
      // <Form.Item
      //   className="m-0"
      //   rules={[
      //     {
      //       required: true,
      //       message: `Không được để trống`,
      //     },
      //   ]}
      // >
      //   <Input className="h-10 rounded-xl bg-white border border-solid border-gray-400 py-2 px-4 ant-input w-full" />
      // </Form.Item>
    },

    //  Notice code
    {
      name: 'code',
      title: t('columns.admin.receipt.notice.Notice code'),
      tableItem: {
        align: 'center',
        width: 200,
        sorter: true,
      },
    },

    // Payment term
    {
      name: 'deadline',
      title: t('columns.admin.receipt.notice.Payment term'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => moment(text).format(formatDate),
      },
    },

    // Payment status
    {
      name: 'paymentStatus',
      title: t('columns.admin.receipt.notice.Payment status'),
      tableItem: {
        align: 'center',
        width: 140,
        sorter: true,
        render: (record) => {
          switch (record) {
            case 'PARTIAL_PAYMENT':
              return <span className="text-yellow-700">Thanh toán một phần</span>;
            case 'UNPAID':
              return <span className="text-red-700">Chưa thanh toán</span>;
            case 'PAID':
              return <span className="text-green-700">Đã thanh toán</span>;
            default:
              break;
          }
        },
      },
    },

    //  Rent cost
    {
      name: 'rentalContract',
      title: t('columns.admin.receipt.notice.Rent cost'),
      tableItem: {
        align: 'center',
        width: 120,
        sorter: true,
        render: (record) => formatNumber(record?.price),
      },
    },

    // Total cost
    {
      name: 'totalExpense',
      title: t('columns.admin.receipt.notice.Total cost'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // Old debt
    {
      name: 'oldDebtAmount',
      title: t('columns.admin.receipt.notice.Old debt'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // Discount
    {
      name: 'amountDiscount',
      title: t('columns.admin.receipt.notice.Discount'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // Total receivable
    {
      name: 'totalAmount',
      title: t('columns.admin.receipt.notice.Total receivable'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // Current actual amount
    {
      name: 'amountReceived',
      title: t('columns.admin.receipt.notice.Current actual amount'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // Actual day
    {
      name: 'date',
      title: t('columns.admin.receipt.notice.Actual day'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => moment(text).format(formatDate),
      },
    },

    // New debt
    {
      name: 'newDebtAmount',
      title: t('columns.admin.receipt.notice.New debt'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // "Tenant's first and last name
    {
      name: 'rentalContract',
      title: t('columns.admin.receipt.notice.Tenant is first and last name'),
      tableItem: {
        align: 'center',
        width: 120,
        sorter: true,
        render: (record) => record?.rentalContractPeople[0].name,
        // render: (record) => {
        //   let text = record?.map((ele) => ele.rentalContractPeople.name).join(", ");
        //   return <span>{text}</span>
        // }
      },
    },

    // Notice status
    // {
    //   name: "status",
    //   title: t("columns.admin.receipt.notice.Notice status"),
    //   tableItem: {
    //     align: "center",
    //     width: 170,
    //     sorter: true,
    //     render: (record) => {
    //       switch (record) {
    //         case "ACTIVE":
    //           return "Đang hoạt động"
    //         case "CANCEL":
    //           return "Hủy hoạt động"
    //         default:
    //           break;
    //       }
    //     }
    //   },
    // },

    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 150,
        fixed: 'right',
        align: 'center  ',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {record.isSended ? (
                  <button className="embed text-xs mr-2 mt-[3px] opacity-40">
                    <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                  </button>
                ) : (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    {/* button edit */}
                    <button
                      onClick={async () => {
                        handleEdit(record, true);
                      }}
                      className="embed text-xs mr-2 mt-[3px]"
                    >
                      <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                    </button>
                  </Tooltip>
                )}
                {record.isSended ? (
                  <Switch
                    disabled={true}
                    checked={record.status === 'ACTIVE'}
                    className={classNames('mt-4 mr-2 opacity-40', {
                      'bg-blue-500': record.status === 'ACTIVE',
                      'bg-gray-400': record.status !== 'ACTIVE',
                    })}
                    checkedChildren={<i className="las la-lg la-check" />}
                    unCheckedChildren={<i className="las la-lg la-times" />}
                  />
                ) : (
                  <Popconfirm
                    placement="left"
                    title={t('Bạn có chắc chắn muốn hủy hoạt động?')}
                    icon={<i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />}
                    onConfirm={() => {}}
                    okText={t('components.datatable.ok')}
                    cancelText={t('components.datatable.cancel')}
                  >
                    <Switch
                      checked={record.status === 'ACTIVE'}
                      className={classNames('mt-4 mr-2', {
                        'bg-blue-500': record.status === 'ACTIVE',
                        'bg-gray-400': record.status !== 'ACTIVE',
                      })}
                      checkedChildren={<i className="las la-lg la-check" />}
                      unCheckedChildren={<i className="las la-lg la-times" />}
                    />
                  </Popconfirm>
                )}

                {record.isSended ? (
                  <button className="embed text-xs mr-2 mt-[3px] opacity-40" style={{ transform: 'rotate(-45deg)' }}>
                    <i className="las la-paper-plane m-0 p-0 text-green-500 text-3xl" />
                  </button>
                ) : (
                  <Tooltip title={t('columns.admin.receipt.notice.Send')}>
                    <button
                      onClick={async () => handleSendMail(record)}
                      className="embed text-xs mr-2 mt-[3px]"
                      style={{ transform: 'rotate(-45deg)' }}
                    >
                      <i className="las la-paper-plane m-0 p-0 text-green-500 text-3xl mb-2" />
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

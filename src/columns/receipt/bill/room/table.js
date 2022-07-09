import React, { Fragment, useState, useEffect } from 'react';
import { Tooltip, Switch, Popconfirm } from 'antd';
import { useNavigate } from 'react-router';
import { routerLinks, formatNumber } from 'utils';
import moment from 'moment';
import classNames from 'classnames';

const Column = ({ t, handleDelete, handleShowFetchEditForm, handleSendMail }) => {
  const navigate = useNavigate();
  const [checked] = useState(true);
  useEffect(() => {}, [checked]);
  return [
    // Building
    {
      name: 'buildingName',
      title: t('Tòa nhà'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        fixed: true,
        onCell: (record) => ({
          onClick: async () => {
            navigate(`${routerLinks('bill')}?type=room`, { state: record.code });
          },
        }),
        render: (text, record) => record?.housingExpense?.room?.building?.name,
      },
    },

    // Room Code
    {
      name: 'roomNumber',
      title: t('columns.admin.buildingInfo.Room Code'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text, record) => record?.housingExpense?.room?.roomNumber,
      },
    },

    //  noticeCode
    {
      name: 'housingExpenseCode',
      title: t('Mã giấy báo'),
      tableItem: {
        align: 'center',
        width: 200,
        sorter: true,
        render: (text, record) => record?.housingExpense?.code,
      },
    },

    // billCode
    {
      name: 'code',
      // title: t("columns.admin.financialManagement.Tenant is first and last name"),
      title: t('Mã phiếu thu'),
      tableItem: {
        align: 'center',
        width: 200,
        sorter: true,
        render: (text, record) => record?.code,
      },
    },

    //  tenantFirstLastName
    {
      name: 'rentalContractPeople',
      title: t('Người thuê'),
      // title: t("columns.admin.financialManagement.Rent cost"),
      tableItem: {
        align: 'center',
        width: 170,
        sorter: true,
        render: (text, record) => record?.housingExpense?.rentalContract?.rentalContractPeople[0]?.name,
      },
    },

    // Payment term
    {
      name: 'deadline',
      title: t('Hạn thanh toán'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text, record) => moment(record?.housingExpense?.deadline).format('DD-MM-YYYY'),
      },
    },

    // Total cost
    {
      name: 'totalAmount',
      title: t('Tổng thu'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text, record) =>
          record?.housingExpense?.totalAmount && formatNumber(record?.housingExpense?.totalAmount),
      },
    },

    // receivedAmount
    {
      name: 'amountReceived',
      title: t('Đã thu'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text, record) => text && formatNumber(text),
      },
    },

    // recievedDate
    {
      name: 'paymentDate',
      title: t('Ngày thực thu'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text, record) => moment(record?.paymentDate).format('DD-MM-YYYY'),
      },
    },

    // newDebt
    {
      name: 'newDebtAmount',
      title: t('Nợ mới'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // Payment status
    // {
    //   name: "status",
    //   title: t("Trạng thái phiếu thu"),
    //   tableItem: {
    //     align: "center",
    //     width: 140,
    //     sorter: true,
    //     render: (text,record) => {
    //       if(text==="ACTIVATE") return"Đang hoạt động";
    //       else return "Hủy hoạt động";
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
                {/* <Tooltip title={t("routes.admin.Layout.Edit")}>
                  <button onClick={() => handleShowFetchEditForm({building:"test",roomNumber:"test12",statusBill:"Đang hoạt động"},true)}
                    className="embed text-xs mr-2 mt-[3px]" >
                    <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                  </button>
                </Tooltip> */}
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
                      checked={record.status === 'ACTIVATE'}
                      className={classNames('mt-3 mr-2', {
                        'bg-blue-500': record.status === 'ACTIVATE',
                        'bg-gray-400': record.status !== 'ACTIVATE',
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
                    {/* button send */}
                    <button
                      onClick={async () => handleSendMail(record)}
                      className="embed text-xs mr-2 mt-[3px] "
                      style={{ transform: 'rotate(-45deg)' }}
                    >
                      <i className="las la-paper-plane m-0 p-0 text-green-500 text-3xl" />
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

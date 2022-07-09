import React, { Fragment } from 'react';
import { Tooltip, Switch, Popconfirm } from 'antd';
import { useNavigate } from 'react-router';
import { routerLinks, formatNumber } from 'utils';

import moment from 'moment';
import { useAuth } from 'global';
import classNames from 'classnames';
const Column = ({ t, handleShowFetchEditForm, handleSendMail }) => {
  const navigate = useNavigate();
  const { formatDate } = useAuth();
  return [
    // Building
    {
      name: 'housingExpense',
      title: t('Tòa nhà'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        fixed: true,
        render: (text, record) => record?.housingExpense?.room?.building?.name,
        onCell: (record) => ({
          onClick: async () => {
            navigate(`${routerLinks('bill')}?type=deposit`, { state: record.code });
          },
        }),
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
      tableItem: {
        align: 'center',
        width: 180,
        sorter: true,
        render: (text, record) => record?.housingExpense?.rentalContract?.rentalContractPeople[0]?.name,
      },
    },

    // Payment term
    {
      name: 'depositAmountReceived',
      title: t('Số tiền cọc đã thu'),
      tableItem: {
        align: 'center',
        width: 200,
        sorter: true,
        render: (text) => text && formatNumber(text),
      },
    },

    // ngày thưc thu
    {
      name: 'paymentDate',
      title: t('Ngày thực thu'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
        render: (text, record) => moment(record?.paymentDate).format(formatDate),
      },
    },

    // nợ mới
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

    // status phiếu thu
    // {
    //   name: "status",
    //   title: t("Trạng thái phiếu thu"),
    //   tableItem: {
    //     align: "center",
    //     width: 150,
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
                <Popconfirm
                  placement="left"
                  title={t('components.datatable.areYouSureWant')}
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

                <Tooltip title={t('columns.admin.receipt.notice.Send')}>
                  {/* button send */}
                  <button
                    onClick={() => handleSendMail(record)}
                    className="embed text-xs mr-2 mt-[3px]"
                    style={{ transform: 'rotate(-45deg)' }}
                  >
                    <i className="las la-paper-plane m-0 p-0 text-green-500 text-3xl" />
                  </button>
                </Tooltip>
              </div>
            </Fragment>
          );
        },
      },
    },
  ];
};
export default Column;

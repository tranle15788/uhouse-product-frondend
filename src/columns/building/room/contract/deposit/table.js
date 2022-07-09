import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import mappingDeposit from 'routes/admin/building/detail/contract/mappingFunction/deposit';

import moment from 'moment';
import { useAuth } from 'global';
import { useNavigate } from 'react-router';
import { depositContract } from 'services/contract';
import { formatNumber } from 'utils';
const Column = ({ t, handleEdit, handleDelete }) => {
  const { formatDate } = useAuth();
  const navigate = useNavigate();

  return [
    // paymentTerm================================================
    {
      name: 'depositContractCode',
      title: t('Mã hợp đồng'),
      tableItem: {
        width: 185,
        fixed: true,
        sorter: true,
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => {
            navigate(`contract?type=deposit&code=${record.depositContractCode}`, {
              state: { previewType: 'rentedContract' },
            });
          },
        }),
      },
    },
    // mã phòng
    {
      name: 'roomId',
      title: t('Mã phòng'),
      tableItem: {
        width: 100,
        sorter: true,
        render: (text, record) => record?.room?.roomNumber,
      },
    },

    // ngày tạo
    {
      name: 'createdAt',
      title: t('Ngày tạo'),
      tableItem: {
        //
        width: 105,
        sorter: true,
        render: (text) => moment(text).format(formatDate),
      },
    },
    // Họ và tên người cọc
    {
      name: 'depositContractPeople',
      title: t('Họ và tên người cọc'),
      tableItem: {
        width: 180,
        sorter: true,
        render: (value) => value?.[0].name,
      },
    },
    // CMND/CCCD/Passport
    {
      name: 'depositContractPeople',
      title: t('CMND/CCCD/Passport'),
      tableItem: {
        render: (value) => value?.[0].identityCard,
        width: 190,
        sorter: true,
      },
    },
    // Số tiền cọc
    {
      name: 'depositNumber',
      title: t(' Số tiền cọc(VND)'),
      tableItem: {
        width: 150,
        sorter: true,
        render: (text) => formatNumber(text),
      },
    },
    // trạng thái hợp đồng
    {
      name: 'status',
      title: t('Trạng thái hợp đồng'),
      tableItem: {
        render: (value) => {
          switch (value) {
            case 'CREATE_NEW':
              return 'Mới tạo';
            case 'SIGNED_BY_GUESS':
              return 'Khách thuê đã ký';
            case 'SIGNED_BY_OWNER':
              return 'Chủ nhà đã ký';
            case 'COMPLETED':
              return 'Đã hoàn thành';
            case 'REVOKE_DEPOSIT':
              return 'Bỏ cọc';
            case 'CANCEL_DEPOSIT':
              return 'Hủy cọc';
            default:
              break;
          }
        },
        width: 170,
        sorter: true,
      },
    },
    // Ngày ký hợp đồng
    {
      name: 'depositContractPeople',
      title: t(' Ngày ký hợp đồng'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (text, value) => {
          if (value.status === 'SIGNED_BY_GUESS') {
            const a = value?.depositContractPeople[0]?.signIn;
            return a.toString();
          }
        },
      },
    },
    // Hạn hợp đồng
    {
      name: 'endDate',
      title: t('Hạn hợp đồng'),
      tableItem: {
        width: 130,
        sorter: true,
        render: (text) => text && moment(text).format(formatDate),
      },
    },
    // statusPayment
    {
      name: 'statusPayment',
      title: t('Trạng thái phiếu thu'),
      tableItem: {
        render: (value) => {
          if (value === 'PAYMENT') {
            return 'Đã thanh toán';
          } else {
            return 'Chờ thanh toán';
          }
        },
        width: 170,
        sorter: true,
      },
    },
    // Ngày thanh toán
    // {
    //   name: "datePayment",
    //   title: t("Ngày thanh toán"),
    //   tableItem: {
    //     width: 150,
    //     sorter: true,
    //     render: (text) => text && moment(text).format(formatDate),
    //   },
    // },
    // isRemember
    {
      name: 'saveWithSignature',
      title: '',
      formItem: {
        type: 'checkbox',
        label: t('Ký tên'),
      },
    },
    // Hợp đồng cho thuê
    // {
    //   name: "abc",
    //   title: t("Hợp đồng cho thuê"),
    //   tableItem: {
    //     sorter: true,
    //     width: 150,
    //   },
    // },
    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 120,
        fixed: 'right',
        align: 'center',
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {record?.status === 'SIGNED_BY_OWNER' ||
                record?.status === 'SIGNED_BY_GUESS' ||
                record?.status === 'REVOKE_DEPOSIT' ||
                record?.status === 'CANCEL_DEPOSIT' ? (
                  <button className="embed border-0 text-xs rounded-lg mr-2 opacity-40">
                    <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                  </button>
                ) : (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed border-0 text-xs rounded-lg mr-2"
                      onClick={async () => {
                        const { data } = await depositContract.getDepositContractByCode(record.depositContractCode);
                        const record_temp = mappingDeposit.serverToWeb(data);
                        handleEdit({ ...record_temp, id: data?.id });
                      }}
                    >
                      <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                    </button>
                  </Tooltip>
                )}
                <Tooltip title={t('routes.admin.Layout.Download')}>
                  <button className="embed text-xs mr-2 mt-[5px]">
                    <span className="uhome-download m-0 p-0 text-blue-700 text-2xl mr-2" />
                  </button>
                  {/* </Popconfirm> */}
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

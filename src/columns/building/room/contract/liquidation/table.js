import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { useAuth } from 'global';
import { LiquidatedContract } from 'services/contract/index';
import { useNavigate } from 'react-router';
import { formatNumber } from 'utils';
const Column = ({ t, editLiquidationContractForm, mapping }) => {
  const { formatDate } = useAuth();
  const navigate = useNavigate();
  return [
    //= ==========================Table liquidation =====================================
    // // mã hợp đồng thanh lý
    {
      name: 'code',
      title: t('Mã hợp đồng thanh lý'),
      tableItem: {
        width: 190,
        sorter: true,
        fixed: true,
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: () => {
            navigate(`contract?type=liquidated&code=${record.code}`, { state: { previewType: 'liquidatedContract' } });
          },
        }),
      },
    },
    // //mã hợp đồng thuê
    {
      name: 'rentalContract',
      title: t('Mã hợp đồng thuê'),
      tableItem: {
        width: 180,
        sorter: true,
        render: (value) => value?.code,
      },
    },
    // // mã phòng
    {
      name: 'rentalContract',
      title: t('Mã phòng'),
      tableItem: {
        width: 100,
        sorter: true,
        render: (value) => value?.room?.roomNumber,
      },
    },
    // // Họ và tên bên thuê
    {
      name: 'liquidatedContractPeople',
      title: t('Họ và tên bên thuê'),
      tableItem: {
        placeholder: t('Họ và tên:'),
        width: 180,
        sorter: true,
        render: (value) => value?.[1]?.name ?? '',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
      },
    },
    // // CMND/CCCD/Passport
    {
      name: 'liquidatedContractPeople',
      title: t('CMND/CCCD/Passport'),
      tableItem: {
        render: (value) => value?.[1]?.identityCard ?? '',
        width: 190,
        sorter: true,
      },
    },
    // // Tiền nhận cọc
    {
      name: 'rentalContract',
      title: t('Tiền nhận cọc(VND)'),
      tableItem: {
        width: 170,
        sorter: true,
        render: (value) => (value?.deposit ? formatNumber(value?.deposit) : ''),
      },
    },

    // // tiền trả cọc
    {
      name: 'totalRefund',
      title: t('Tiền trả cọc(VND)'),
      tableItem: {
        width: 155,
        sorter: true,
        render: (text) => formatNumber(text),
      },
    },
    // mã hợp đồng cọc
    {
      name: 'depositContract',
      title: t('Mã hợp đồng cọc'),
      tableItem: {
        width: 185,
        sorter: true,
        render: (value) => value?.depositContractCode,
      },
    },
    // Trạng thái thanh lý
    {
      name: 'status',
      title: t('Trạng thái thanh lý'),
      tableItem: {
        width: 160,
        sorter: true,
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
            case 'LIQUIDATED':
              return 'Đã thanh lý';
            case 'CANCEL_LIQUIDATED':
              return 'Hủy thanh lý';
            default:
              break;
          }
        },
      },
    },
    // ngày ký hợp đồng
    {
      name: 'signByTenantDate',
      title: t('Ngày ký thanh lý'),
      tableItem: {
        width: 150,
        sorter: true,
        render: (text, value) => {
          if (value?.status === 'CREATE_NEW' || value?.status === 'SIGNED_BY_OWNER') {
            return '';
          } else return text && moment(text && text).format(formatDate);
        },
      },
    },
    // ngày thanh lý
    {
      name: 'liquidateFromDate',
      title: t('Ngày thanh lý'),
      tableItem: {
        width: 130,
        sorter: true,
        render: (text) => text && moment(text).format(formatDate),
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
                {record?.status === 'SIGNED_BY_OWNER' ||
                record?.status === 'SIGNED_BY_GUESS' ||
                record?.status === 'LIQUIDATED' ||
                record?.status === 'CANCEL_LIQUIDATED' ? (
                  <button className="embed border-0 text-xs rounded-lg mr-2 opacity-50 ">
                    <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                  </button>
                ) : (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed border-0 text-xs rounded-lg mr-2"
                      onClick={async () => {
                        const { data } = await LiquidatedContract.getDetailLiquidatedContract(record.code);
                        editLiquidationContractForm(mapping(data, formatDate));
                      }}
                    >
                      <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                    </button>
                  </Tooltip>
                )}
                <Tooltip title={t('routes.admin.Layout.Download')}>
                  {/* <Popconfirm
                            placement="left"
                           title={t("components.datatable.areYouSureWant")}
                            icon={
                           <i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />
                           }
                            onConfirm={() => {
                            // handleDelete(record);
                          }}
                             okText={t("components.datatable.ok")}
                            cancelText={t("components.datatable.cancel")}
                            > */}
                  <button className="embed text-xs mr-2 mt-[5px]">
                    {/* <span className="uhome-trash m-0 p-0 text-red-500 text-2xl"></span> */}
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

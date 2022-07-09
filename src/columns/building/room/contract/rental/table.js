import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { useAuth } from 'global';
import { useNavigate } from 'react-router';
import { formatNumber } from 'utils';
const Column = ({ t, appUserId, handleEdit, handleDelete }) => {
  const { formatDate } = useAuth();
  const navigate = useNavigate();
  return [
    //= ==========================Table=====================================

    // paymentTerm
    {
      name: 'code',
      title: t('Mã hợp đồng'),
      tableItem: {
        width: 185,
        sorter: true,
        readOnly: true,
        fixed: true,
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => {
            navigate(`contract?type=rental&code=${record.code}`, { state: { previewType: 'rentedContract' } });
          },
        }),
      },
      formItem: {
        col: 4,
        placeholder: t('Mã hợp đồng'),
        rules: [{ type: 'required' }],
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
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
      },
    },
    // Họ và tên người cọc
    {
      name: 'rentalContractPeople',
      title: t('Họ và tên bên thuê'),
      tableItem: {
        placeholder: t('Họ và tên:'),
        width: 180,
        sorter: true,
        render: (value) => value?.[0]?.name,
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
      },
    },
    // CMND/CCCD/Passport
    {
      name: 'rentalContractPeople',
      title: t('CMND/CCCD/Passport'),
      tableItem: {
        render: (value) => value?.[0]?.indentityCard,
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        width: 190,
        sorter: true,
      },
    },
    // Số tiền cọc
    {
      name: 'price',
      title: t('Giá thuê(VND)'),
      tableItem: {
        width: 135,
        sorter: true,
        render: (text) => formatNumber(text),
      },
    },
    // Thời hạn thuê
    {
      name: 'rentalTerm',
      title: t('Thời hạn thuê (tháng)'),
      tableItem: {
        align: 'center',
        width: 130,
        sorter: true,
      },
    },

    // Trạng thái
    {
      name: 'status',
      title: t('Trạng thái'),
      tableItem: {
        width: 140,
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
              return 'Đã thanh lý';
            case 'EXPIRED':
              return 'Hết hạn';
            case 'CANCEL_RENT':
              return 'Hủy thuê';
            default:
              break;
          }
        },
      },
    },

    // Ngày ký hợp đồng
    {
      name: 'signByTenantDate',
      title: t(' Ngày ký hợp đồng'),
      tableItem: {
        width: 155,
        sorter: true,
        render: (text) => text && moment(text).format(formatDate),
      },
    },
    // Hạn hợp đồng
    {
      name: 'toDate',
      title: t('Hạn hợp đồng'),
      tableItem: {
        width: 130,
        sorter: true,
        render: (text) => text && moment(text).format(formatDate),
      },
    },
    // Ngày thanh toán
    // {
    //   name: "datePayment",
    //   title: t("Ngày thanh toán"),
    //   tableItem: {
    //     width: 150,
    //     sorter: true,
    //     onCell: () => ({ style: { paddingTop: "0.25rem", paddingBottom: 0 } }),
    //     render: (text) => text && moment(text).format(formatDate),
    //   },
    // },

    // Hợp đồng cho thuê

    {
      name: 'depositContract',
      title: t('Hợp đồng liên quan'),
      tableItem: {
        sorter: true,
        width: 185,
        render: (value) => {
          return value && value?.depositContractCode;
        },
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0, color: 'blue', textDecoration: 'underline' },
          onClick: async () => {
            navigate(`contract?type=deposit&code=${record.depositContract.depositContractCode}`, {});
          },
        }),
      },
    },
    //= ===============================================================

    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 120,
        fixed: 'right',
        align: 'center',
        // onCell: () => ({ style: { paddingTop: "0.25rem", paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {record?.status === 'SIGNED_BY_OWNER' ||
                record?.status === 'SIGNED_BY_GUESS' ||
                record?.status === 'CANCEL_RENT' ? (
                  <button className="embed border-0 text-xs rounded-lg mr-2 opacity-40">
                    <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                  </button>
                ) : (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed border-0 text-xs rounded-lg mr-2"
                      onClick={() => {
                        const record_temp = {
                          ...record,
                          rentalContractPeople: record.rentalContractPeople[0].name,
                          'CMND/CCCD/Passport': record.rentalContractPeople[0].identityCard,
                        };
                        handleEdit(record_temp);
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
                    icon={<i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />}
                    onConfirm={
                      () => { handleDelete(record); }
                    }
                    okText={t("components.datatable.ok")}
                    cancelText={t("components.datatable.cancel")} > */}
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

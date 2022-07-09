import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { useAuth } from 'global';
import { useNavigate } from 'react-router';
import { appandixContract } from 'services/contract';
import { formatNumber } from 'utils';
const Column = ({ t, URLnavi, handleEdit, handleDelete, mapping }) => {
  const { formatDate } = useAuth();
  const navigate = useNavigate();
  return [
    //= ==========================Table appendixContract =====================================
    // mã hợp đồng phụ lục
    {
      name: 'code',
      title: t('Mã phụ lục'),
      tableItem: {
        width: 200,
        sorter: true,
        fixed: true,
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: () => {
            navigate(`contract?type=appendix&code=${record.code}`, { state: { previewType: 'appendixContract' } });
          },
        }),
      },
    },
    // loại phụ lục
    {
      name: 'type',
      title: t('Loại phụ lục'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (text, value) => {
          if (value?.type === 'EXTENTION') {
            return 'Gia hạn';
          } else {
            return 'Nội thất';
          }
        },
      },
    },
    // mã hợp đồng thuê
    {
      name: 'rentalContract',
      title: t('Mã hợp đồng thuê'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (value) => value?.code,
      },
    },
    // mã phòng
    {
      name: 'rentalContract',
      title: t('Mã phòng'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (value) => value?.room?.roomNumber,
      },
    },
    // Họ và tên bên thuê
    {
      name: 'tenantName',
      title: t('Họ và tên bên thuê'),
      tableItem: {
        placeholder: t('Họ và tên:'),
        width: 200,
        sorter: true,
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
      },
    },
    // CMND/CCCD/Passport
    {
      name: 'tenantIc',
      title: t('CMND/CCCD/Passport'),
      tableItem: {
        width: 200,
        sorter: true,
      },
    },
    // giá thuê
    {
      name: 'rentalContract',
      title: t('Giá thuê'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (value) => (value?.price ? formatNumber(value?.price) : ''),
      },
    },
    // hạn hợp đồng thuê
    {
      name: 'toDate',
      title: t('Hạn hợp đồng thuê'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (text) => text && moment(text).format(formatDate),
      },
    },
    // Trạng thái thanh lý : (khác đã ký, chủ nhà đã ký, mới tạo)
    {
      name: 'status',
      title: t('Trạng thái phụ lục'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (text, value) => {
          switch (value.status) {
            case 'CREATE_NEW':
              return 'Mới tạo';
            case 'SIGNED_BY_GUESS':
              return 'Khách thuê đã ký';
            case 'SIGNED_BY_OWNER':
              return 'Chủ nhà đã ký';
            case 'COMPLETED':
              return 'Đã hoàn thành';
            case 'CANCEL_EXTENTION':
              return 'Hủy gia hạn';
            default:
              break;
          }
        },
      },
    },
    // ngày ký phụ lục
    {
      name: 'signByTenantDate',
      title: t('Ngày ký phụ lục'),
      tableItem: {
        width: 200,
        sorter: true,
        render: (text, value) => {
          if (value?.status === 'CREATE_NEW' || value?.status === 'SIGNED_BY_OWNER') {
            return '';
          } else return text && moment(text).format(formatDate);
        },
      },
    },
    // ngày phụ lục có hiệu lực
    {
      name: 'effectiveDate',
      title: t('Ngày phụ lục có hiệu lực'),
      tableItem: {
        width: 200,
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
                record?.status === 'COMPLETED' ? (
                  <button className="embed border-0 text-xs rounded-lg mr-2 opacity-50">
                    <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                  </button>
                ) : (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed border-0 text-xs rounded-lg mr-2"
                      onClick={async () => {
                        const { data } = await appandixContract.getDetailContract(record.code);
                        handleEdit(mapping(data));
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
                                handleDelete(record);
                              }}
                              okText={t("components.datatable.ok")}
                              cancelText={t("components.datatable.cancel")}
                      > */}
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

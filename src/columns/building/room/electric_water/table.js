import React, { Fragment } from 'react';
import { formatNumber } from 'utils';
import { Popconfirm, Tooltip } from 'antd';
import moment from 'moment';
import { useAuth } from 'global';

export const ColumnElectricAwater = ({ t, handleEdit, handleDelete, mapping, showCreateForm, roomId }) => {
  const { formatDate } = useAuth();

  return [
    // tháng/năm
    {
      name: 'date',
      title: t('Tháng/Năm'),
      tableItem: {
        width: 150,
        sorter: true,
        align: 'center',
        render: (text) => text && moment(text).format('MM-YYYY'),
        fixed: true,
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: () => showCreateForm(record.id),
        }),
      },
    },
    {
      name: 'billClosingDate',
      title: t('Ngày chốt chỉ số'),
      tableItem: {
        width: 200,
        sorter: true,
        align: 'center',
        render: (text) => text && moment(text).format(formatDate),
      },
    },
    // số điện sử dụng
    {
      name: 'electricityWaterDetail',
      title: t('Số điện sử dụng(kW)'),
      tableItem: {
        width: 200,
        sorter: true,
        align: 'center',
        render: (value) => (value?.[0]?.indexUsed && value?.[0]?.indexUsed ? formatNumber(value?.[0]?.indexUsed) : ''),
      },
    },
    // số tiền
    {
      name: 'electricityWaterDetail',
      title: t('Số tiền(VND)'),
      tableItem: {
        width: 200,
        sorter: true,
        align: 'center',
        render: (value) => (value?.[0]?.amount && value?.[0]?.amount ? formatNumber(value?.[0]?.amount) : ''),
      },
    },
    // số nước sử dụng
    {
      name: 'electricityWaterDetail',
      title: t('Số nước sử dụng(m3)'),
      tableItem: {
        width: 200,
        sorter: true,
        align: 'center',
        render: (value) => (value?.[1]?.indexUsed && value?.[1]?.indexUsed ? formatNumber(value?.[1]?.indexUsed) : ''),
      },
    },
    // số tiền
    {
      name: 'electricityWaterDetail',
      title: t('Số tiền(VND)'),
      tableItem: {
        width: 200,
        sorter: true,
        align: 'center',
        render: (value) => (value?.[1]?.amount && value?.[1]?.amount ? formatNumber(value?.[1]?.amount) : ''),
      },
    },
    // tổng tiền
    {
      name: 'totalAmount',
      title: t('Tổng tiền(VND)'),
      tableItem: {
        align: 'center',
        width: 200,
        sorter: true,
        render: (text) => formatNumber(text),
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
                {/* <Tooltip title={t("routes.admin.Layout.Edit")}>
                   <button
                     className="embed text-xs mr-2"
                     onClick={async() => {
                      const value = await Electricawater.getDetailById(record.id)
                      let res = await Electricawater.getListElectricityWater(roomId);
                      handleEdit(mapping(value.data,res.data.cost));
                     }}
                   >
                     <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
                   </button>
                 </Tooltip> */}
                <Tooltip title={t('routes.admin.Layout.Delete')}>
                  <Popconfirm
                    placement="left"
                    title={t('components.datatable.areYouSureWant')}
                    icon={<i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />}
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
                </Tooltip>
              </div>
            </Fragment>
          );
        },
      },
    },
  ];
};

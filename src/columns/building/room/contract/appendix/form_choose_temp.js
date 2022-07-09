import React, { Fragment } from 'react';
import { LiquidatedContract } from 'services/contract';
import { Tooltip } from 'antd';

const Column = ({ t, listRoomNumber, handleEdit, setRentalCodeAvailable }) => {
  return [
    // name buidling
    {
      name: 'nameBuilding',
      title: t('Tên toà nhà'),
      formItem: {
        readOnly: true,
        rules: [{ type: 'required' }],
      },
    },
    // roomId
    {
      name: 'roomNumber',
      title: t('Mã phòng'),
      formItem: {
        type: 'select',
        rules: [{ type: 'required' }],
        list: listRoomNumber,
        onSelect: async (value, option) => {
          const data = await LiquidatedContract.getRentalCode(value, 'EXTENTION');
          setRentalCodeAvailable(data?.code);
        },
      },
    },
    // rentalContractCode
    {
      name: 'rentalContractCode',
      title: t('Mã hợp đồng thuê'),
      formItem: {
        readOnly: true,
        col: 12,
        rules: [{ type: 'required' }],
      },
    },
    // radio
    {
      name: 'appendixType',
      title: t('Loại phụ lục'),
      formItem: {
        type: 'select',
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'extend',
            label: 'Phụ lục gia hạn',
            style: { margin: '1rem' },
          },
          {
            value: 'furniture',
            label: 'Phụ lục nội thất',
          },
        ],
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
                <Tooltip title={t('routes.admin.Layout.Edit')}>
                  <button
                    className="embed border-0 text-xs rounded-lg mr-2"
                    onClick={() => {
                      handleEdit(record);
                    }}
                  >
                    <span className="uhome-edit-solid p-0 m-0 text-blue-500 text-4xl"></span>
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

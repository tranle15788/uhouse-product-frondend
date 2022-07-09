const Column = ({ t }) => {
  return [
    // Building
    {
      name: 'building',
      title: t('columns.admin.building.Building'),
      formItem: {
        readOnly: true,
      },
    },

    // roomNumber
    {
      name: 'roomNumber',
      title: t('columns.admin.buildingInfo.Room Code'),
      formItem: {
        readOnly: true,
      },
    },

    // Notice Status
    {
      name: 'status',
      title: t('Trạng thái giấy báo *:'),
      formItem: {
        type: 'select',
        col: 12,
        placeholder: t('Chọn trạng thái giấy báo'),
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'ACTIVE',
            label: 'Đang hoạt động',
          },
          {
            value: 'CANCEL',
            label: 'Hủy hoạt động',
          },
        ],
      },
    },
  ];
};
export default Column;

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

    {
      name: 'status',
      title: t('Trạng thái phiếu thu *:'),
      formItem: {
        type: 'title',
      },
    },
    // ContractCode
    {
      name: 'statusBill',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center whitespace-nowrap',
        placeholder: t('Trạng thái phiếu thu'),
        defaultChecked: !0,
        rules: [{ type: 'required' }],
        type: 'switch',
        beforepart: t('Huỷ hoạt động'),
        afterpart: t('Đang hoạt động'),
        className: 'bg-blue-500 mt-5 mr-2 ml-2',
      },
    },
  ];
};
export default Column;

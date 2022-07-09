export const Column = ({ t, buildingList, roomNumberList, set_roomNumberList, billCode, set_billCode }) => {
  return [
    // building
    {
      name: 'building',
      title: t('Tòa nhà *:'),
      formItem: {
        col: 12,
        placeholder: t('Tòa nhà'),
        rules: [{ type: 'required' }],
        readOnly: true,
      },
    },
    // roomNumber
    {
      name: 'roomNumber',
      title: t('Mã phòng *:'),
      formItem: {
        col: 12,
        placeholder: t('Mã phòng'),
        rules: [{ type: 'required' }],
        readOnly: true,
        // condition:(value,form)=>!!form.getFieldValue().building,
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
        className: 'bg-blue-500 mt-5 ml-2 mr-2 ',
      },
    },
  ];
};
export default Column;

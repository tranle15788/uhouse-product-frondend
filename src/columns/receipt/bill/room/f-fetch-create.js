import { billService } from 'services/receipt';

export const Column = ({ t, roomNumberList, set_roomNumberList, billCode, set_billCode }) => {
  return [
    // building
    {
      name: 'building',
      title: t('Tòa nhà *:'),
      formItem: {
        col: 12,
        placeholder: t('Tòa nhà'),
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
        type: 'select',
        list: roomNumberList,
        onSelect: async (value, option) => {
          const { data } = await billService.getRoomNotice(option.value);
          data && set_billCode(data);
        },
      },
    },

    {
      name: 'noticeCode',
      title: t('Mã giấy báo *:'),
      formItem: {
        placeholder: t('Mã giấy báo'),
        readOnly: true,
        col: 12,
      },
    },
  ];
};
export default Column;

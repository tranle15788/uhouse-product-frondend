import { LiquidatedContract } from 'services/contract';

export const Column = ({
  t,
  listRoomNumber,
  setRentalCodeAvailable,
  listRentalCodeAvailable,
  set_listRentalCodeAvailable,
}) => {
  return [
    // buildingName
    {
      name: 'buildingName',
      title: t('Tòa nhà'),
      formItem: {
        readOnly: true,
        col: 12,
        rules: [{ type: 'required' }],
      },
    },
    // roomNumber
    {
      name: 'roomNumber',
      title: t('Mã phòng'),
      formItem: {
        col: 12,
        placeholder: t('Mã phòng'),
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRoomNumber,
        onSelect: async (value, option) => {
          const data = await LiquidatedContract.getRentalCode(value);
          set_listRentalCodeAvailable(data.map((item) => ({ value: item.code, label: item.code })));
          // setRentalCodeAvailable(data?.code);
        },
      },
    },
    // rentalContractCode
    {
      name: 'rentalContractCode',
      title: t('Mã hợp đồng thuê'),
      formItem: {
        condition: (values, form) => form.getFieldValue('roomNumber'),
        type: 'select',
        list: listRentalCodeAvailable,
        col: 12,
        rules: [{ type: 'required' }],
        onSelect: (value) => {
          setRentalCodeAvailable(value);
        },
      },
    },
  ];
};
export default Column;

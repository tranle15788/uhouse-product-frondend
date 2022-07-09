const Column = ({ t, noticeList, set_roomNumberList, roomNumberList, set_noticeCode }) => {
  return [
    // Building
    {
      name: 'building',
      title: t('Tòa nhà *:'),
      formItem: {
        col: 12,
        placeholder: t('Chọn tòa nhà'),
        rules: [{ type: 'required' }],
        readOnly: true,
        // type: 'select',
        // list: noticeList,
        // onSelect: (value, option) => {
        //   let data = [];
        //   switch (value.toString()) {
        //     case "1":
        //       data = [{ value: 1, label: "Mã phòng 1" }, { value: 2, label: "Mã phòng 2" }];
        //       break;
        //     case "2":
        //       data = [{ value: 3, label: "Mã phòng 3" }, { value: 4, label: "Mã phòng 4" }]
        //       break;
        //     default:
        //       break;
        //   }
        //   set_roomNumberList(data);
        // }
      },
    },

    // roomNumber
    {
      name: 'roomNumber',
      title: t('Mã phòng *:'),
      formItem: {
        col: 12,
        placeholder: t('Chọn mã phòng'),
        rules: [{ type: 'required' }],
        type: 'select',
        list: roomNumberList,
        // onSelect: (value, option) => {
        //   let data = "";
        //   switch (value.toString()) {
        //     case "1":
        //       data = "1";
        //       break;
        //     case "2":
        //       data = "2";
        //       break;
        //     case "3":
        //       data = "3";
        //       break;
        //     case "4":
        //       data = "4";
        //       break;
        //     default:
        //       break;
        //   }
        //   set_noticeCode(data);
        // },
        onSelect: async (value, option) => {
          // console.log("first", option)
          // const data = await noticeService.getRoomNotice(option.value)
          // data && set_noticeCode(data);
        },
      },
    },
  ];
};
export default Column;

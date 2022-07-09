const Column = ({
  t,
  expensesList,
  setEditExpenseFormElectric,
  setEditExpenseFormWater,
  setValueLastIndex,
  setElectricUsed,
  setWaterUsed,
}) => {
  return [
    // tháng
    {
      name: 'date',
      title: t('Tháng'),
      formItem: {
        className: 'border-gray-400 border rounded-xl w-full flex',
        type: 'date',
        col: 6,
        picker: 'month',
        rules: [{ type: 'required' }],
      },
    },

    // ngày chốt chỉ số
    {
      name: 'billClosingDate',
      title: t('Ngày chốt chỉ số'),
      formItem: {
        className: 'border-gray-400 border rounded-xl w-full',
        type: 'date',
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    // title
    {
      name: 'title',
      title: t('CHỈ SỐ ĐIỆN:'),
      formItem: {
        col: 6,
        type: 'title',
        className: 'font-bold',
        defaultValue: '0571',
      },
    },
    // chỉ số đầu
    {
      name: 'firstIndexElectric',
      title: t(''),
      formItem: {
        placeholder: t('Nhập chỉ số đầu'),
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-1 whitespace-nowrap',
        // rules:[{type:"required"}],
        nostyle: 'true',
        readOnly: true,
        beforepart: t('Chỉ số đầu:'),
        afterpart: t('kW'),
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },
    // chi so cuoi
    {
      name: 'lastIndexElectric',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-1 whitespace-nowrap',
        rules: [{ type: 'required' }],
        beforepart: t('Chỉ số cuối:*'),
        afterpart: t('kW'),
        placeholder: t('Nhập chỉ số cuối'),
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
        onChange: (value, form) => {
          const firstIndex = form.getFieldValue('firstIndexElectric');
          const lastIndex = form.getFieldValue('lastIndexElectric');
          const totalUsed = lastIndex - firstIndex;
          if (totalUsed > 0) {
            setElectricUsed(totalUsed);
            if (totalUsed > 0 && form?.getFieldValue('priceElectric') > 0 && form?.getFieldValue('amountWater') > 0) {
              const priceE = form?.getFieldValue('priceElectric');
              const PriceW = form?.getFieldValue('amountWater');
              const amounttotal = Number(totalUsed * priceE) + Number(PriceW);
              return form.setFieldsValue({
                indexUsedElectric: totalUsed,
                amountElectric: Number(totalUsed * priceE),
                totalAmount: Number(amounttotal),
              });
            }
            return form.setFieldsValue({ indexUsedElectric: totalUsed });
          } else return form.setFieldsValue({ indexUsedElectric: 0, amountElectric: 0, totalAmount: 0 });
        },
      },
    },

    // sử dụng
    {
      name: 'indexUsedElectric',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-5 whitespace-nowrap',
        placeholder: t(' '),
        nostyle: 'true',
        beforepart: t('Sử dụng:'),
        afterpart: t('kW'),
        readOnly: true,
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },
    // loại chi phí
    {
      name: 'typeElectric',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-5 whitespace-nowrap',
        type: 'select',
        nostyle: 'true',
        rules: [{ type: 'required' }],
        beforepart: t('Loại chi phí:*'),
        list: expensesList,
        onSelect: async (value) => {
          const object = expensesList.find((ele) => ele.id === value);
          setEditExpenseFormElectric(object);
        },
      },
    },
    // roomCode id
    {
      name: 'roomCodeIdElectric',
      title: t(''),
      formItem: {
        type: 'hidden',
      },
    },
    // đơn giá
    {
      name: 'priceElectric',
      title: t('đơn giá'),
      formItem: {
        col: 6,
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
        type: 'hidden',
      },
    },
    // số tiền
    {
      name: 'amountElectric',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-7 whitespace-nowrap',
        // rules:[{type:"required"}],
        nostyle: 'true',
        readOnly: true,
        beforepart: t('Số tiền: '),
        afterpart: t(' Đồng'),
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },

    // chỉ số nước
    {
      name: 'title',
      title: t('CHỈ SỐ NƯỚC:'),
      formItem: {
        type: 'title',
        className: 'font-bold',
      },
    },
    // chỉ số đầu
    {
      name: 'firstIndexWater',
      title: t(''),
      formItem: {
        placeholder: t('Nhập chỉ số đầu'),
        classnamewrapoutermost: 'classnamewrapoutermost grid-cols-11 flex items-center mt-2 mx-1 whitespace-nowrap',
        // rules:[{type:"required"}],
        nostyle: 'true',
        readOnly: true,
        beforepart: t('Chỉ số đầu:'),
        afterpart: t('m3'),
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },
    // chỉ số cuối
    {
      name: 'lastIndexWater',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whitespace-nowrap',
        rules: [{ type: 'required' }],
        // nostyle:"true",
        placeholder: t('Nhập chỉ số cuối'),
        beforepart: t('Chỉ số cuối:*'),
        afterpart: t('m3'),
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
        onChange: (value, form) => {
          const firstIndex = form.getFieldValue('firstIndexWater');
          const lastIndex = form.getFieldValue('lastIndexWater');
          const total = lastIndex - firstIndex;
          if (total > 0) {
            setWaterUsed(total);
            if (total > 0 && form?.getFieldValue('priceWater') > 0 && form?.getFieldValue('amountElectric') > 0) {
              const priceW = form?.getFieldValue('priceWater');
              const PriceE = form?.getFieldValue('amountElectric');
              const amounttotal = Number(total * priceW) + Number(PriceE);
              return form.setFieldsValue({
                indexUsedWater: total,
                amountWater: Number(total * priceW),
                totalAmount: Number(amounttotal),
              });
            }
            return form.setFieldsValue({ indexUsedWater: total });
          } else return form.setFieldsValue({ indexUsedWater: 0, amountWater: 0, totalAmount: 0 });
        },
      },
    },
    // sử dụng
    {
      name: 'indexUsedWater',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-5 whitespace-nowrap mx-auto',
        placeholder: t(' '),
        nostyle: 'true',
        beforepart: t('Sử dụng: '),
        afterpart: t('m3'),
        readOnly: true,
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },
    // loại chi phí
    {
      name: 'typeWater',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-5 whitespace-nowrap',
        type: 'select',
        nostyle: 'true',
        rules: [{ type: 'required' }],
        beforepart: t('Loại chi phí:*'),
        list: expensesList,
        onSelect: (value) => {
          const object = expensesList.find((ele) => ele.id === value);
          setEditExpenseFormWater(object);
        },
      },
    },
    // roomCode id
    {
      name: 'roomCodeIdWater',
      title: t('id'),
      formItem: {
        type: 'hidden',
      },
    },
    // đơn giá
    {
      name: 'priceWater',
      title: t(''),
      formItem: {
        type: 'hidden',
      },
    },
    // số tiền
    {
      name: 'amountWater',
      title: t(''),
      formItem: {
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-7 whitespace-nowrap',
        //  rules:[{type:"required"}],
        placeholder: t(' '),
        nostyle: 'true',
        readOnly: true,
        beforepart: t('Số tiền: '),
        afterpart: t(' Đồng'),
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },
    // tổng tiền
    {
      name: 'totalAmount',
      title: t(''),
      formItem: {
        placeholder: ' ',
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 mx-5 whitespace-nowrap',
        nostyle: 'true',
        beforepart: t('Tổng tiền:'),
        afterpart: t('Đồng'),
        readOnly: true,
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
          placeholder: '0',
          autoUnmask: true,
        },
      },
    },

    // title ========
    {
      name: 'title',
      title: t(' GHI CHÚ:'),
      formItem: {
        type: 'title',
        className: 'font-bold',
      },
    },
    // note
    {
      name: 'note',
      title: t(''),
      formItem: {
        type: 'textarea',
        col: 12,
        placeholder: t('Thêm ghi chú'),
      },
    },
  ];
};
export default Column;

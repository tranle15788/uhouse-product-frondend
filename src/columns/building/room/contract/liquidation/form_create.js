import { formatNumber } from 'utils';

const Column = ({ t }) => {
  return [
    //  // title
    // {
    //   name: "title",
    //   title: t("CỘNG HÒA XA HỘI CHỦ NGHĨA VIỆT NAM"),
    //   formItem: {
    //     type: "title",
    //     className: "font-bold",
    //   },
    // },
    //  // title
    // {
    //   name: "title",
    //   title: t("Độc Lập - Tự Do - Hạnh Phúc"),
    //   formItem: {
    //     type: "title",
    //     className: "font-bold",
    //   },
    // },
    //  // title
    // {
    //   name: "title",
    //   title: t("BIÊN BẢN THANH LÝ HỢP ĐỒNG THUÊ NHÀ"),
    //   formItem: {
    //     type: "title",
    //     className: "font-bold",
    //   },
    // },
    // code
    {
      name: 'code',
      title: 'Mã hợp đồng',
      formItem: {
        col: 4,
        readOnly: true,
      },
    },
    // signDate
    {
      name: 'signDate',
      title: t('Hôm nay ngày :'),
      formItem: {
        col: 6,
        type: 'date',
        className: 'border-gray-400 border rounded-xl',
        rules: [{ type: 'required' }],
      },
    },
    // signAddress
    {
      name: 'signAddress',
      title: t('Tại địa chỉ:'),
      formItem: {
        col: 12,
        rules: [{ type: 'required' }],
      },
    },
    // title
    {
      name: 'title',
      title: t('Bên cho thuê (Bên A):'),
      formItem: {
        type: 'title',
        readOnly: true,
        className: 'font-bold',
      },
    },
    // aLessorName
    {
      name: ['lessor', 'name'],
      title: t('Họ và tên'),
      formItem: {
        col: 6,
        readOnly: true,
        // rules: [{type:"required"}],
      },
    },
    // name: ["lessor","email"],
    {
      name: ['lessor', 'email'],
      title: t('Email'),
      formItem: {
        placeholder: t('email'),
        col: 6,
        readOnly: true,
        // rule: checkIdentityNumber(),
        // rules: [{ type: "required" }],
      },
    },
    // aLessorIdentityCardNumber
    {
      name: ['lessor', 'identityCard'],
      title: t('Số CMND/CCCD/Passport'),
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        readOnly: true,
        // rule: checkIdentityNumber(),
        // rules: [{ type: "required" }],
      },
    },

    //  aLessorIcDate
    {
      name: ['lessor', 'icDate'],
      title: t('Ngày cấp'),
      formItem: {
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // aLessorIcplace
    {
      name: ['lessor', 'icPlace'],
      title: t('Nơi cấp:'),
      formItem: {
        readOnly: true,
        col: 4,
        // rules: [{ type: "required" }],
      },
    },
    // ["lessor","address"],
    {
      name: ['lessor', 'address'],
      title: t('Nơi ĐKTT:'),
      formItem: {
        // readOnly:true,
        col: 8,
        // rules: [{ type: "required" },],
      },
    },
    // aLessorPhoneNumber
    {
      name: ['lessor', 'phoneNumber'],
      title: t('Số điện thoại'),
      formItem: {
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // title
    {
      name: 'title',
      title: t('Bên thuê (Bên B):'),
      formItem: {
        type: 'title',
        className: 'font-bold',
      },
    },
    // depositorName
    {
      name: ['tenant', 'name'],
      title: t('Họ và tên'),

      formItem: {
        readOnly: true,
        col: 6,
        // rules: [{type:"required"}],
      },
    },
    // name: ["tenant","email"],
    {
      name: ['tenant', 'email'],
      title: t('Email'),
      formItem: {
        // placeholder: t("email"),
        col: 6,
        readOnly: true,
        // rule: checkIdentityNumber(),
        // rules: [{ type: "required" }],
      },
    },
    // depositorIdentityCardNumber
    {
      name: ['tenant', 'identityCard'],
      title: t('Số CMND/CCCD/Passport'),
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        readOnly: true,
        col: 4,
        // rule: checkIdentityNumber(),
        // rules: [{ type: "required" }],
      },
    },

    //  ["tenant","icDate"]
    {
      name: ['tenant', 'icDate'],
      title: t('Ngày cấp'),
      formItem: {
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // ["tenant","icPlace"],
    {
      name: ['tenant', 'icPlace'],
      title: t('Nơi cấp:'),
      formItem: {
        readOnly: true,
        col: 4,
        // rules: [{ type: "required" }],
      },
    },
    // ["tenant","icPlace"],
    {
      name: ['tenant', 'address'],
      title: t('Nơi ĐKTT:'),
      formItem: {
        // readOnly:true,
        col: 8,
        // rules: [{ type: "required" },],
      },
    },
    // name: ["tenant","phoneNumber"],
    {
      name: ['tenant', 'phoneNumber'],
      title: t('Số điện thoại'),
      formItem: {
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // title
    {
      name: 'title',
      title: t('Căn cứ hợp đồng thuê phòng có hiệu lực ngày'),
      formItem: {
        type: 'title',
        className: 'font-bold',
      },
    },
    // rentalContractCode
    {
      name: 'rentalContractCode',
      title: t(''),
      formItem: {
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap',
        rules: [{ type: 'required' }],
        nostyle: 'true',
        readOnly: true,
        beforepart: t('Căn cứ hợp đồng thuê phòng'),
      },
    },
    // effectiveDate
    {
      name: 'effectiveDate',
      title: t(''),
      formItem: {
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap -ml-2  ',
        rules: [{ type: 'required' }],
        nostyle: 'true',
        readOnly: true,
        beforepart: t('có hiệu lực ngày'),
        // afterpart:t(", có hiệu lực ngày"),
      },
    },
    // liquidateFromDate
    {
      name: 'liquidateFromDate',
      title: t(''),
      formItem: {
        col: 7,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap',
        type: 'date',
        className: 'w-24 border-gray-400 border rounded-xl',
        disabledDate: (currentDate) => {
          const date = new Date();
          return !(new Date(currentDate) >= date.setDate(date.getDate() - 1));
        },
        rules: [{ type: 'required' }],
        nostyle: 'true',
        // readOnly:true,
        beforepart: t('Hai bên cùng đồng ý thanh lý hợp đồng thuê kể từ ngày'),
      },
    },
    // title
    {
      name: 'title',
      title: t('Kể từ ngày hợp đồng thanh lý được hai bên ký kết thì hợp đồng thuê nhà không còn giá trị nữa'),
      formItem: {
        type: 'title',
      },
    },
    // rentalContractCode
    {
      name: 'rentalContractCode',
      title: t(''),
      formItem: {
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap',
        nostyle: 'true',
        readOnly: true,
        beforepart: t('Căn cứ theo hợp đồng thuê mã'),
      },
    },
    // amountMoney
    {
      name: 'deposit',
      title: t(''),
      formItem: {
        // layout:{wrapperCol: { span: 2},labelCol:{ span: 10 }},
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap -ml-2',
        nostyle: 'true',
        readOnly: true,
        beforepart: t('bên A đã nhận số tiền cọc'),
        // mask: {
        //   alias: "numeric",groupSeparator: ".",autoGroup: true,digits: 2,digitsOptional: true,radixPoint: ",",placeholder: "0",autoUnmask: true
        // },
        // afterpart:t("đồng"),
      },
    },
    // title
    {
      name: 'title',
      title: t('đồng'),
      formItem: {
        col: 12,
        type: 'title',
      },
    },
    // title
    {
      name: 'title',
      title: t('Các khoản khấu trừ:'),
      formItem: {
        col: 2,
        type: 'title',
        className: 'font-bold',
      },
    },
    // deductionCost
    {
      name: 'deductionCost',
      title: t(''),
      formItem: {
        rules: [{ type: 'required' }],
        name: 'depreciation',
        type: 'addable',
        orderNumber: true,
        nostyle: 'true',
        text_add: t('Thêm khoản khấu trừ'),
        titleList: [t('Nội dung'), t('Số tiền') /* t("đơn vị tính") */],
        fieldsName: [
          { name: 'description', placeholder: t('Nội dung') },
          { name: 'price', placeholder: t('Số tiền') },
        ],
        total: {
          name: 'totalDepreciation',
          placeholder: t('Tổng chi phí'),
          columnname: 'price',
          checkboxname: 'totalCheckbox',
          addsumfunction: (value, form) => {
            if (isNaN(value)) value = 0;
            const total_temp =
              Number(
                form
                  .getFieldsValue('deposit')
                  .deposit.toString()
                  .replace(/[^0-9,]+/g, ''),
              ) - Number(value.toString().replace(/[^0-9,]+/g, ''));
            form.setFieldsValue({ totalRefund: formatNumber(total_temp, '.') });
          },
          autocompute: true,
        },
        className: 'font-normal mb-2 border border-gray-400 w-full',
      },
    },

    // totalRefund
    {
      name: 'totalRefund',
      title: t(''),
      formItem: {
        rules: [{ type: 'required' }],
        readOnly: true,
        col: 12,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2',
        nostyle: 'true',
        beforepart: t('Sau khi thống nhất bên A sẽ thanh toán lại cho bên B số tiền cọc là'),
        afterpart: t('đồng'),
      },
    },

    // saveWithSignature
    {
      name: 'saveWithSignature',
      title: '',
      formItem: {
        type: 'checkbox',
        label: t('Ký tên'),
      },
    },
  ];
};
export default Column;

import moment from 'moment';

const Column = ({ t }) => {
  return [
    // Số bản phụ lục hợp đồng
    {
      name: 'sequence',
      title: t('Phụ lục số'),
      formItem: {
        readOnly: true,
        col: 4,
        rules: [{ type: 'required' }],
        condition: (values, form) => form.getFieldValue('soPhuLucHopDong'),
      },
    },

    // mã phòng
    {
      name: 'roomNumber',
      title: t('Mã phòng'),
      formItem: {
        readOnly: true,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    // nameBuilding
    {
      name: ['building', 'name'],
      title: t('Tên toà nhà'),
      formItem: {
        readOnly: true,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    // signingDate
    {
      name: 'createdDate',
      title: t('Hôm nay, ngày'),
      formItem: {
        type: 'date',
        col: 4,
        className: 'border-gray-400  border rounded-xl',
        rules: [{ type: 'required' }],
      },
    },
    // name: ["building","address"],
    {
      name: ['building', 'address'],
      title: t('Tại địa chỉ'),
      formItem: {
        readOnly: true,
        col: 4,
      },
    },
    // paymentTerm
    {
      name: 'code',
      title: t('Mã hợp đồng gia hạn'),

      formItem: {
        col: 4,
        readOnly: true,
        placeholder: t('Mã hợp đồng'),
        rules: [{ type: 'required' }],
      },
    },

    // =======================Bên thuê==================================
    // BÊN THUÊ A
    {
      name: 'title',
      title: t('BÊN CHO THUÊ (Gọi tắt là bên A):'),
      formItem: {
        type: 'title',
        className: 'font-bold',
      },
    },
    // ["lessor","name"]
    {
      name: ['lessor', 'name'],
      title: t('Họ và tên'),
      formItem: {
        col: 6,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // aLessorPhoneNumber
    {
      name: ['lessor', 'phoneNumber'],
      title: t('Số điện thoại'),
      formItem: {
        col: 6,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // asideIdentityCardNumber
    {
      name: ['lessor', 'identityCard'],
      title: t('Số CMND/CCCD/Passport'),
      readOnly: true,
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        readOnly: true,
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
      title: t('Nơi cấp'),
      formItem: {
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // name: ["building","name"],
    {
      name: ['building', 'name'],
      title: t('Hiện là quản lý toà nhà'),
      formItem: {
        placeholder: t('Nhập tên toà nhà'),
        readOnly: true,
        // rules: [{ type: "required" }],
        col: 6,
      },
    },
    // mail to lessor
    {
      name: ['lessor', 'email'],
      title: t('Email'),
      formItem: {
        placeholder: t('Nhập email'),
        col: 6,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // BÊN THUÊ B================================
    {
      name: 'title',
      title: t('BÊN THUÊ (Gọi tắt là bên B):'),
      formItem: {
        type: 'title',
        className: 'font-bold',
      },
    },
    // bTenantName
    {
      name: ['tenant', 'name'],
      title: t('Họ và tên'),
      formItem: {
        col: 6,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // phoneNumber
    {
      name: ['tenant', 'phoneNumber'],
      title: t('Số điện thoại'),
      formItem: {
        col: 6,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // bsideIdentityCardNumber
    {
      name: ['tenant', 'identityCard'],
      title: t('Số CMND/CCCD/Passport'),
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // date
    {
      name: ['tenant', 'icDate'],
      title: t('Ngày cấp'),
      formItem: {
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // bTenantIcplace
    {
      name: ['tenant', 'icPlace'],
      title: t('Nơi cấp'),
      formItem: {
        col: 4,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // mail
    {
      name: ['tenant', 'email'],
      title: t('Email'),
      formItem: {
        placeholder: t('Nhập email'),
        col: 6,
        readOnly: true,
        // rules: [{ type: "required" }],
      },
    },
    // Phụ lục hợp đồng số
    {
      name: '',
      title: '',
      formItem: {
        type: 'hidden',
        col: 6,
      },
    },
    //= ===============================================================
    // Phụ lục hợp đồng số
    // title
    {
      name: 'title',
      title: t('Sau khi xem xét, thỏa thuận hai bên đã đi đến thống nhất'),
      formItem: {
        type: 'title',
        className: 'font-bold',
        col: 6,
      },
    },
    // Phụ lục hợp đồng số
    {
      name: 'sequence',
      title: 'Ký phụ lục hợp đồng số',
      formItem: {
        col: 6,
        readOnly: true,
      },
    },
    // số hợp đồng cho thuê
    {
      name: 'rentalCode',
      title: t('Hợp đồng gia hạn được tạo từ hợp đồng thuê mã số:'),
      formItem: {
        placeholder: t('mã số hợp đồng thuê'),
        readOnly: true,
        rules: [{ type: 'required' }],
        col: 6,
      },
    },
    // ngày ký hợp đồng cho thuê
    // {
    //   name: "ngayKiHopDongThue",
    //   title: t("Ngày ký hợp đồng cho thuê"),
    //   formItem: {
    //     readOnly: true,
    //     type: "text",
    //     col: 6,
    //   }
    // },

    // name: ["building","address"],
    {
      name: ['building', 'address'],
      title: t('Bên B hiện đang thuê phòng địa chỉ'),
      formItem: {
        readOnly: true,
        rules: [{ type: 'required' }],
        col: 6,
      },
    },
    // Thời hạn GIA HẠN thuê phòng là (ngày)
    {
      name: 'rentalTerm',
      title: t('Số ngày gia hạn thuê:'),
      formItem: {
        placeholder: t('Số ngày'),
        col: 6,
        type: 'text',
        rules: [{ type: 'required' }],
        onChange: (date, form) => {
          if (form?.getFieldValue('fromDate')) {
            const formDate = new Date(form.getFieldValue('fromDate'));
            const returnDate = new Date();
            returnDate.setDate(formDate.getDate() + parseInt(form.getFieldValue('rentalTerm')));
            form.setFieldsValue({ toDate: moment(returnDate) });
          }
        },
      },
    },
    // Bắt đầu từ
    {
      name: 'fromDate',
      title: t('Bắt đầu từ ngày'),
      formItem: {
        type: 'date',
        col: 6,
        rules: [{ type: 'required' }],
        className: 'border-gray-400 border rounded-xl w-full',
        onChange: (date, form) => {
          if (form?.getFieldValue('rentalTerm')) {
            const formDate = new Date(form.getFieldValue('fromDate'));
            const returnDate = new Date(form.getFieldValue('fromDate'));
            returnDate.setDate(formDate.getDate() + parseInt(form.getFieldValue('rentalTerm')) - 1);
            form.setFieldsValue({ toDate: moment(returnDate) });
          }
        },
        disabledDate: (currentDate, form) => {
          return (
            form.getFieldValue().rentalContractToDate &&
            !(new Date(currentDate) >= new Date(form.getFieldValue().rentalContractToDate))
          );
        },
        // disableDa
      },
    },
    // Đến ngày
    {
      name: 'toDate',
      title: t('Đến ngày'),
      formItem: {
        col: 6,
        type: 'date',
        disabled: () => true,
        condition: (values, form) => form.getFieldValue('fromDate') && form.getFieldValue('rentalTerm'),
      },
    },
    // titile
    {
      name: 'title',
      title: t('Thời hạn này có thể được gia hạn thêm tùy theo sự thỏa thuận của hai bên trước ngày kết thúc 30 ngày.'),
      formItem: {
        type: 'title',
        // col: 6,
      },
    },
    // titile
    {
      name: 'title',
      title: t('Ghi chú'),
      formItem: {
        type: 'title',
        className: 'font-bold py-4 ',
        // col: 6,
      },
    },
    // Ghi chu
    {
      name: 'note',
      title: '',
      formItem: {
        type: 'textarea',
        col: 12,
      },
    },
    //= ========================
    // ĐIỀU KHOẢN CHUNG
    {
      name: 'title',
      title: t('ĐIỀU KHOẢN CHUNG'),
      formItem: {
        type: 'title',
        className: 'font-bold',
      },
    },
    {
      name: 'numberOfContracts',
      title: t('Số bản Phụ lục hợp đồng được lập thành'),
      formItem: {
        placeholder: t('Số bản'),
        type: 'required',
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    // số bản mỗi bên giữ
    {
      name: 'eachSideNumber',
      title: t('Số bản mỗi bên giữ'),
      formItem: {
        placeholder: t('Số bản'),
        type: 'required',
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    // rentalTerm
    {
      name: 'effectiveDate',
      title: t('Có giá trị kể từ ngày'),
      formItem: {
        className: 'border-gray-400 border rounded-xl w-full',
        type: 'date',
        col: 6,
        rules: [{ type: 'required' }],
      },
    },

    // ki ten
    {
      name: 'saveWithSignature',
      title: '',
      formItem: {
        type: 'checkbox',
        label: t('Ký tên'),
      },
    },
    // số căn hộ
    {
      name: 'rentalContractToDate',
      title: t(''),
      formItem: {
        type: 'hidden',
        col: 6,
        readOnly: true,
      },
    },
  ];
};
export default Column;

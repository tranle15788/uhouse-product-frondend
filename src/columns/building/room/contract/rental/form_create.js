import { checkIdentityNumber } from 'columns/utils';
import moment from 'moment';
import React from 'react';
const Column = ({ t, URLnavi, handleEdit, handleDelete }) => {
  return [
    // signingDate
    {
      name: 'buildingName',
      title: t('Tên toà nhà'),
      formItem: {
        readOnly: true,
        col: 4,
      },
    },

    // paymentTerm
    {
      name: 'code',
      title: t('Mã hợp đồng:'),
      formItem: {
        readOnly: true,
        col: 4,
        placeholder: t('Mã hợp đồng'),
      },
    },

    // effectiveDate
    {
      name: 'effectiveDate',
      title: <p>Ngày có hiệu lực &ensp;:</p>,
      formItem: {
        type: 'date',
        className: 'border-gray-400 date-1 border rounded-xl',
        col: 4,
        rules: [{ type: 'required' }],
      },
    },

    // signingDate
    {
      name: 'createdDate',
      title: <p>Hôm nay, ngày &ensp;:</p>,
      formItem: {
        type: 'date',
        col: 4,
        className: 'border-gray-400  border rounded-xl',
        rules: [{ type: 'required' }],
      },
    },

    // address
    {
      name: 'address',
      title: t('Tại địa chỉ'),
      formItem: {
        readOnly: true,
        col: 8,
      },
    },

    {
      name: 'title',
      title: t('Chúng tôi gồm:'),
      formItem: {
        type: 'title',
        className: 'text-black mb-3',
      },
    },
    // =======================Bên thuê==================================
    // BÊN THUÊ A
    {
      name: 'title',
      title: t('BÊN CHO THUÊ (Gọi tắt là bên A):'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },
    // asideName
    {
      name: ['lessor', 'name'],
      title: <p>Họ và tên &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập họ và tên'),
        col: 4,
        rules: [
          { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('components.form.only text'));
              },
            }),
          },
        ],
      },
    },
    // aLessorPhoneNumber
    {
      name: ['lessor', 'phoneNumber'],
      title: <p>Số điện thoại &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập số điện thoại'),
        col: 4,
        rules: [
          { type: 'required' },
          { type: 'min', value: 10 },
          { type: 'max', value: 15 },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (!value || /^\+?\d+[-\s]?[0-9]+[-\s]?[0-9]+$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t('columns.auth.register.Phone number Rule'));
              },
            }),
          },
        ],
      },
    },

    // mail to lessor
    {
      name: ['lessor', 'email'],
      title: <p>Email &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập email'),
        col: 4,
        rules: [
          { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                const regexmail =
                  /^(([^<>()[\]\\.,;:$%^&*\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!value || regexmail.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t('components.form.ruleEmail'));
              },
            }),
          },
        ],
      },
    },
    // asideIdentityCardNumber
    {
      name: ['lessor', 'indentityCard'],
      title: <p>Số CMND/CCCD/Passport &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        rule: checkIdentityNumber(),
        rules: [{ type: 'required' }],
      },
    },
    //  aLessorIcDate
    {
      name: ['lessor', 'icDate'],
      title: <p>Ngày cấp &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập ngày cấp'),
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        rules: [{ type: 'required' }],
      },
    },
    // aLessorIcplace
    {
      name: ['lessor', 'icPlace'],
      title: <p>Nơi cấp &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập nơi cấp'),
        col: 4,
        rules: [
          { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s,/]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('columns.auth.register.Address Rule'));
              },
            }),
          },
        ],
      },
    },
    // manager building
    {
      name: 'buildingName',
      title: t('Hiện là quản lý toà nhà:'),
      formItem: {
        placeholder: t('Nhập tên toà nhà'),
        col: 4,
      },
    },

    // permanentResidence
    {
      name: ['lessor', 'permanentResidence'],
      title: t('Nơi ĐKTT:'),
      formItem: {
        placeholder: t('Nhập nơi ĐKTT'),
        rules: [
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s,.'/]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('columns.auth.register.Address Rule'));
              },
            }),
          },
        ],
        col: 8,
      },
    },
    // lessorAppUserId
    {
      name: ['lessor', 'appUserId'],
      title: t(''),
      formItem: {
        type: 'hidden',
        col: 6,
        readOnly: true,
      },
    },
    // BÊN THUÊ B================================
    {
      name: 'title',
      title: t('BÊN THUÊ (Gọi tắt là bên B):'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },
    // bTenantName
    {
      name: ['tenant', 'name'],
      title: <p>Họ và tên &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập họ và tên'),
        col: 4,
        rules: [
          { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('components.form.only text'));
              },
            }),
          },
        ],
      },
    },
    // phoneNumber
    {
      name: ['tenant', 'phoneNumber'],
      title: <p>Số điện thoại &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập số điện thoại'),
        col: 4,
        rules: [
          { type: 'required' },
          { type: 'min', value: 10 },
          { type: 'max', value: 15 },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (!value || /^\+?\d+[-\s]?[0-9]+[-\s]?[0-9]+$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t('columns.auth.register.Phone number Rule'));
              },
            }),
          },
        ],
      },
    },

    // mail to a
    {
      name: ['tenant', 'email'],
      title: <p>Email &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập email'),
        col: 4,
        rules: [
          { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                const regexmail =
                  /^(([^<>()[\]\\.,;:$%^&*\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!value || regexmail.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t('components.form.ruleEmail'));
              },
            }),
          },
        ],
      },
    },
    // bsideIdentityCardNumber
    {
      name: ['tenant', 'indentityCard'],
      title: <p>Số CMND/CCCD/Passport &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        rules: checkIdentityNumber(),
      },
    },
    // date
    {
      name: ['tenant', 'icDate'],
      title: <p>Ngày cấp &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập ngày cấp'),
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        rules: [{ type: 'required' }],
      },
    },
    // bTenantIcplace
    {
      name: ['tenant', 'icPlace'],
      title: <p>Nơi cấp &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập nơi cấp'),
        col: 4,
        rules: [{ type: 'required' }],
      },
    },

    // permanentResidence
    {
      name: ['tenant', 'permanentResidence'],
      title: t('Nơi ĐKTT:'),
      formItem: {
        placeholder: t('Nhập nơi ĐKTT'),
        rules: [
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s,.'/]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('columns.auth.register.Address Rule'));
              },
            }),
          },
        ],
        col: 12,
      },
    },

    // tenantAppUserId
    {
      name: ['lessor', 'appUserId'],
      title: t(''),
      formItem: {
        type: 'hidden',
        col: 6,
        readOnly: true,
      },
    },
    //= ===============================================================
    // description
    {
      name: 'title',
      title: t(' Sau khi thoả thuận thì Bên A và Bên B đồng ý ký hợp đồng thuê nhà với nội dung như sau: :'),
      formItem: {
        type: 'title',
        className: 'text-black mb-3',
      },
    },
    // tern
    {
      name: 'title',
      title: t('ĐIỀU 1 : TÀI SẢN CHO THUÊ'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },
    // số căn hộ
    {
      name: 'roomNumber',
      title: t('1.1 Số căn hộ'),
      formItem: {
        type: 'required',
        col: 4,
        readOnly: true,
      },
    },

    {
      name: 'acreage',
      title: t('1.2 Diện tích (m2)'),
      formItem: {
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
        col: 4,
        readOnly: true,
      },
    },
    // price rent
    {
      name: 'price',
      title: <p>1.3 Giá thuê (số tiền/tháng) &ensp;</p>,
      formItem: {
        // type:"mixInput",
        // beforepart:t("Giá thuê"),
        // afterpart:t("/tháng"),
        col: 4,
        placeholder: t('Giá thuê'),
        rules: [{ type: 'required' }],
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
    // rentalTerm
    {
      name: 'rentalTerm',
      title: <p>1.4 Thời hạn thuê (tháng) &ensp;</p>,
      formItem: {
        placeholder: 'Thời hạn thuê (tháng)',
        // type: 'required',
        col: 4,
        rules: [{ type: 'required' }],
        onChange: (date, form) => {
          if (form.getFieldValue('fromDate')) {
            const fromDate = new Date(form.getFieldValue('fromDate'));
            const returnDate = new Date(form.getFieldValue('fromDate'));
            returnDate.setMonth(fromDate.getMonth() + parseInt(form.getFieldValue('rentalTerm')));
            form.setFieldsValue({ toDate: moment(returnDate) });
          }
        },
      },
    },

    // rentExpirationDay

    // from date
    {
      name: 'fromDate',
      title: <p>1.5 Bắt đầu từ ngày &ensp;</p>,
      formItem: {
        rules: [{ type: 'required' }],
        className: 'border-gray-400 border rounded-xl w-full',
        type: 'date',
        col: 4,
        onChange: (date, form) => {
          if (form.getFieldValue('fromDate')) {
            const fromDate = new Date(form.getFieldValue('fromDate'));
            const date = new Date(form.getFieldValue('fromDate'));
            date.setMonth(fromDate.getMonth() + parseInt(form.getFieldValue('rentalTerm')));
            form.setFieldsValue({ toDate: moment(date) });
          }
        },
      },
    },
    // to date
    {
      name: 'toDate',
      title: t('Đến ngày'),
      formItem: {
        type: 'date',
        col: 4,
        readOnly: true,
        disabled: () => true,
        condition: (value, form) => form.getFieldValue('fromDate') && form.getFieldValue('rentalTerm'),
      },
    },

    // numberOfTenants
    {
      name: 'numberOfTenants',
      title: <p>1.6 Số người ở &ensp;</p>,
      formItem: {
        placeholder: t('Số người ở'),
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    // title
    {
      name: 'title',
      title: t('1.7 Người thuê cùng'),
      formItem: {
        type: 'title',
        className: 'font-normal text-black mb-3',
      },
    },
    // roommate
    {
      name: 'roommateInfo',
      title: t(''),
      formItem: {
        rules: [{ type: 'required' }],
        name: 'roommate',
        type: 'addable',
        orderNumber: true,
        maxLength: (form) => parseInt(form.getFieldValue('numberOfTenants')) - 1,
        // nostyle:"true",
        text_add: t('Thêm người thuê cùng'),
        titleList: [t('Họ và tên'), t('Ngày sinh'), t('Số điện thoại'), t('CMND/CCCD'), t('HKTT'), t('Nghề nghiệp')],
        fieldsName: [
          { name: 'name', placeholder: t('Họ và tên') },
          { name: 'icDate', type: 'date', placeholder: t('Ngày sinh') },
          { name: 'phoneNumber', placeholder: t('Số điện thoại') },
          { name: 'indentityCard', placeholder: t('CMND/CCCD') },
          { name: 'permanentResidence', placeholder: t('HKTT') },
          { name: 'career', placeholder: t('Nghề nghiệp') },
        ],
        className: 'font-normal mb-2 border border-gray-400 ',
      },
    },
    // title
    {
      name: 'title',
      title: t('1.8 Thông tin xe.'),
      formItem: {
        type: 'title',
        className: 'font-normal text-black mb-3',
      },
    },
    // vehicleInfo
    {
      name: 'vehicleInfo',
      title: t(''),
      formItem: {
        rules: [{ type: 'required' }],
        name: 'vehicle',
        type: 'addable',
        orderNumber: true,
        nostyle: 'true',
        text_add: t('Thêm xe'),
        titleList: [t('Loại xe'), t('Biển số xe')],
        fieldsName: [
          { name: 'name', placeholder: t('Xe') },
          { name: 'licensePlate', placeholder: t('Biển số xe') },
        ],
        className: 'font-normal mb-2 border border-gray-400 w-full',
      },
    },
    // deposit
    {
      name: 'deposit',
      title: <p>1.9 Số tiền đặt cọc &ensp;</p>,
      formItem: {
        placeholder: t('Số tiền'),
        col: 6,
        rules: [{ type: 'required' }],
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

    // depositAmountReceived depositAmountReceived
    {
      name: 'depositAmountReceived',
      title: t('1.10 Số tiền cọc đã nhận'),
      formItem: {
        placeholder: t('Số tiền'),
        col: 6,
        readOnly: true,
        // rules: [{ type: "required"}],
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

    {
      name: 'addedDeposit',
      title: <p>1.11 Số tiền cọc nhận thêm &ensp;</p>,
      formItem: {
        placeholder: t('Số tiền'),
        col: 6,
        rules: [{ type: 'required' }],
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

    // electricityIndicator
    {
      name: 'electricityIndicator',
      title: t('1.12 Chỉ số điện đầu vào (kW).'),
      formItem: {
        placeholder: t('Nhập chỉ số điện'),
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
      },
    },

    // waterIndicator
    {
      title: t('1.13 Chỉ số nước đầu vào (/người/tháng).'),
      formItem: {
        type: 'title',
        className: 'font-normal text-black mb-3',
      },
    },
    {
      name: 'waterIndicator',
      title: t(''),
      formItem: {
        col: 12,
        type: 'radio',
        className: 'pl-px',
        list: [
          {
            value: '1',
            label: 'Tiền nước (/người/tháng)',
            style: { margin: '1rem' },
          },
          {
            value: '2',
            label: 'Chỉ số nước đầu vào (/m3)',
          },
        ],
      },
    },

    // waterIndicator
    {
      name: 'waterIndicator',
      title: t(''),
      formItem: {
        rule: [{ type: 'required' }],
        placeholder: t(' '),
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
      },
    },

    // tern
    {
      name: 'title',
      title: t('ĐIỀU 2 : CÁC LOẠI PHÍ'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },

    // costlist
    {
      name: 'cost',
      title: t('danh sách chi phí'),
      formItem: {
        // rule: [{ type: "required" }],
        name: 'cost',
        type: 'addable',
        text_add: t('Thêm chi phí'),
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
        fieldsName: [
          { name: 'name', placeholder: 'Tên chi phí' },
          { name: 'unitPrice', placeholder: 'Mệnh giá' },
          { name: 'unit', placeholder: 'Đơn vị tính' },
        ],

        className: 'font-normal mb-2 border border-gray-400 w-full',
      },
    },

    // id căn hộ
    {
      name: 'roomId',
      formItem: {
        type: 'hidden',
        col: 6,
        readOnly: true,
      },
    },
    // Dieu 4
    {
      name: 'title',
      title: t('ĐIỀU 3: QUYỀN VÀ NGHĨA VỤ CỦA BÊN THUÊ'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },
    // payFromDay
    {
      name: 'payFromDay',
      title: t(''),
      formItem: {
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap pay-rent',
        rules: [{ type: 'required' }],
        nostyle: 'true',
        initialValues: '01',
        beforepart: <p className="text-black">Trả tiền thuê đúng thời hạn từ ngày</p>,
      },
    },
    // payToDay
    {
      name: 'payToDay',
      title: t(''),
      formItem: {
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap pay-rent',
        rules: [{ type: 'required' }],
        nostyle: 'true',
        initialValues: '03',
        beforepart: <p className="text-black">đến ngày</p>,
        afterpart: <p className="text-black">hàng tháng.</p>,
      },
    },
    // punishFromDay
    {
      name: 'punishFromDay',
      title: t(''),
      formItem: {
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap pay-rent',
        rules: [{ type: 'required' }],
        nostyle: 'true',
        initialValues: '04',
        beforepart: <p className="text-black">Kể từ ngày</p>,
        afterpart: <p className="text-black">hàng tháng trở đi sẽ bị phạt</p>,
      },
    },
    // amountPunishPerDay
    {
      name: 'amountPunishPerDay',
      title: t(''),
      formItem: {
        col: 6,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap pay-rent',
        // rules:[{type:"required"}],
        nostyle: 'true',
        // mask: {
        //   alias: "numeric", groupSeparator: ".", autoGroup: true, digits: 2, digitsOptional: true, radixPoint: ",", placeholder: "0", autoUnmask: true
        // },
        initialValues: '100000',
        // beforepart:t("hàng tháng trở đi sẽ bị phạt"),
        afterpart: t('vnđ/ngày nhưng không'),
      },
    },
    // limitLateDay
    {
      name: 'limitLateDay',
      title: t(''),
      formItem: {
        col: 4,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap pay-rent',
        rules: [{ type: 'required' }],
        nostyle: 'true',
        initialValues: '05',
        beforepart: t('được quá'),
        afterpart: t('ngày.'),
      },
    },
    // terminateContractFromDay
    {
      name: 'terminateContractFromDay',
      title: t(''),
      formItem: {
        col: 8,
        classnamewrapoutermost: 'classnamewrapoutermost flex items-center mt-2 whiteSpace-noWrap pay-rent',
        rules: [{ type: 'required' }],
        nostyle: 'true',
        initialValues: '09',
        beforepart: t('Kể từ ngày'),
        afterpart: t('bên A có quyền đơn phương'),
      },
    },
    // title
    {
      name: 'title',
      title: t('chấm dứt hợp đồng thuê phòng và không hoàn trả toàn bộ tiền đặt cọc.'),
      formItem: {
        type: 'title',
        className: 'font-normal',
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

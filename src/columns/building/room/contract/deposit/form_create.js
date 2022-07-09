import React from 'react';
import { checkIdentityNumber, checkFullName, checkAddress, checkEmail } from 'columns/utils';
import moment from 'moment';
const Column = ({ t, setValueIdentity, TimeoutID }) => {
  return [
    // depositContractCode
    {
      name: 'depositContractCode',
      title: t('Căn cứ vào hợp đồng có mã:'),
      formItem: {
        readOnly: true,
      },
    },
    // createdAt
    {
      name: 'createdAt',
      title: t('Hôm nay, ngày'),
      formItem: {
        type: 'date',
        col: 6,
        className: 'border-gray-400  border rounded-xl',
      },
    },
    // address
    {
      name: 'address',
      title: t('Tại địa chỉ'),
      formItem: {
        col: 6,
      },
    },

    // description
    {
      name: 'title',
      title: t('Chúng tôi gồm:'),
      formItem: {
        type: 'title',
        className: 'mb-2',
      },
    },
    // =========================================================
    // description
    {
      name: 'title',
      title: t('BÊN A - CHỦ NHÀ - NHẬN CỌC:'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },

    // aLessorName
    {
      name: 'aLessorName',
      title: <p>Họ và tên &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập họ tên'),
        col: 4,
        rules: [{ type: 'required' }, checkFullName()],
      },
    },
    // aLessorDateOfBirthday

    {
      name: 'aLessorDateOfBirthday',
      title: <p>Sinh ngày &ensp;:</p>,
      formItem: {
        rules: [{ type: 'required' }],
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        disabledDate: (currentDate) => {
          return !(new Date(currentDate) <= new Date());
        },
      },
    },

    // aLessorPhoneNumber
    {
      name: 'aLessorPhoneNumber',
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
    // aLessorIdentityCardNumber
    {
      name: 'aLessorIdentityCardNumber',
      title: <p>Số CMND/CCCD/Passport &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        rules: checkIdentityNumber(),
      },
    },

    //  aLessorIcDate
    {
      name: 'aLessorIcDate',
      title: <p>Ngày cấp &ensp;:</p>,
      formItem: {
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        rules: [{ type: 'required' }],
        disabledDate: (currentDate) => {
          return !(new Date(currentDate) <= new Date());
        },
      },
    },
    // aLessorIcplace
    {
      name: 'aLessorIcPlace',
      title: <p>Nơi cấp &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập nơi cấp'),
        col: 4,
        rules: [{ type: 'required' }, checkAddress(t)],
      },
    },

    // aLessorEmail
    {
      name: 'aLessorEmail',
      title: <p>Email của bên A &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập mail của bên A'),
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

    // aLessorAccountBank
    {
      name: 'aLessorAccountBank',
      title: t('Tài khoản ngân hàng :'),
      formItem: {
        placeholder: t('Nhập số tài khoản ngân hàng'),
        col: 4,
        rules: [
          // { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (!value || /^\d*(\.\d+)?$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(t('Chỉ nhập số'));
              },
            }),
          },
        ],
      },
    },
    // nameBanking
    {
      name: 'nameBanking',
      title: t('Tên ngân hàng :'),
      formItem: {
        col: 4,
      },
    },

    // BÊN THUÊ B =================================================================
    // description
    {
      name: 'title',
      title: t('BÊN B - NGƯỜI THUÊ - ĐẶT CỌC'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },
    // depositContractPeople
    {
      name: 'depositContractPeople',
      title: <p>Họ và tên &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập họ và tên'),
        col: 4,
        rules: [{ type: 'required' }, checkFullName()],
      },
    },
    // depositorDateOfBirthday
    {
      name: 'depositorDateOfBirthday',
      title: <p>Sinh ngày &ensp;:</p>,
      formItem: {
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        rules: [{ type: 'required' }],
        disabledDate: (currentDate) => {
          return !(new Date(currentDate) <= new Date());
        },
      },
    },
    // depositorPhoneNumber
    {
      name: 'depositorPhoneNumber',
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
    // depositorIdentityCard
    {
      name: 'depositorIdentityCard',
      title: <p>Số CMND/CCCD/Passport &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        rules: [{ type: 'required' }, checkIdentityNumber()],
        onChange: (value, form) => {
          const data = form.getFieldValue('depositorIdentityCard');
          if (data.length > 9) {
            clearTimeout(TimeoutID.current);
            TimeoutID.current = setTimeout(() => {
              return setValueIdentity(data);
            }, 500);
          }
        },
      },
    },
    //  depositorIcDate
    {
      name: 'depositorIcDate',
      title: <p>Ngày cấp &ensp;:</p>,
      formItem: {
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        rules: [{ type: 'required' }],
        disabledDate: (currentDate) => {
          return !(new Date(currentDate) <= new Date());
        },
      },
    },
    // depositorIcPlace
    {
      name: 'depositorIcPlace',
      title: <p>Nơi cấp &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập nơi cấp'),
        col: 4,
        rules: [{ type: 'required' }, checkAddress(t)],
      },
    },

    // depositorEmail
    {
      name: 'depositorEmail',
      title: <p>Email của bên B &ensp;:</p>,
      formItem: {
        placeholder: t('Nhập mail bên thuê'),
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
    // =================================================================
    {
      name: 'checkBoxShowC',
      title: '',
      formItem: {
        type: 'checkbox',
        className: 'font-bold text-black',
        label: t('Có Bên C - môi giới - người làm chứng'),
      },
    },

    //  description
    {
      name: 'title',
      title: t('BÊN C - MÔI GIỚI - NGƯỜI LÀM CHỨNG'),
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },
    // housingBrokerName
    {
      name: 'housingBrokerName',
      title: <p>Họ và tên &ensp;:</p>,
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        placeholder: t('Nhập họ và tên'),
        col: 4,
        rules: [{ type: 'required' }, checkFullName()],
      },
    },
    // housingBrokerDateOfBirthday
    {
      name: 'housingBrokerDateOfBirthday',
      title: <p>Sinh ngày &ensp;:</p>,
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        rules: [{ type: 'required' }],
        disabledDate: (currentDate) => {
          return !(new Date(currentDate) <= new Date());
        },
      },
    },
    // aLessorPhoneNumber
    {
      name: 'housingBrokerPhoneNumber',
      title: <p>Số điện thoại &ensp;:</p>,
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        placeholder: t('Nhập số điện thoại'),
        col: 4,
        //  rules: checkPhoneNumber(t),
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
    // housingBrokerIdentityCard
    {
      name: 'housingBrokerIdentityCard',
      title: <p>Số CMND/CCCD/Passport &ensp;:</p>,
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        placeholder: t('Nhập số CMND/CCCD/Passport'),
        col: 4,
        rules: [{ type: 'required' }, checkIdentityNumber()],
      },
    },

    //  housingBrokerIcDate
    {
      name: 'housingBrokerIcDate',
      title: <p>Ngày cấp &ensp;:</p>,
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        col: 4,
        type: 'date',
        className: 'border-gray-400 border rounded-xl w-full',
        rules: [{ type: 'required' }],
        disabledDate: (currentDate) => {
          return !(new Date(currentDate) <= new Date());
        },
      },
    },
    // aLessorIcplace
    {
      name: 'housingBrokerIcPlace',
      title: <p>Nơi cấp &ensp;:</p>,
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        placeholder: t('Nhập nơi cấp'),
        col: 4,
        rules: [{ type: 'required' }, checkAddress(t)],
      },
    },
    // housingBrokerEmail
    {
      name: 'housingBrokerEmail',
      title: <p>Email của bên C &ensp;:</p>,
      formItem: {
        condition: (values, form) => form.getFieldValue('checkBoxShowC'),
        placeholder: t('Nhập email'),
        col: 4,
        rules: [{ type: 'required' }, checkEmail(t)],
      },
    },
    /// ================================================================
    // description
    {
      name: 'title',
      title: t('Hai bên cùng nhau ký kết hợp đồng thuê nhà với các điều kiện đi kèm như sau :'),
      formItem: {
        type: 'title',
        className: 'mb-3',
      },
    },
    // //description
    {
      name: 'title',
      title: t('ĐIỀU 1 : TÀI SẢN CHO THUÊ'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },
    // roomDtoId
    {
      name: 'roomDtoId',
      title: t('1.1 Số căn hộ'),
      formItem: {
        col: 4,
        readOnly: true,
      },
    },
    // acreage
    {
      name: 'acreage',
      title: t('1.2 Diện tích'),
      formItem: {
        placeholder: t('Nhập diện tích'),
        col: 4,
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
    // price
    {
      name: 'price',
      title: <p>1.3 Giá thuê (số tiền/tháng) &ensp;</p>,
      formItem: {
        col: 4,
        placeholder: t('Số tiền'),
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
        rules: [
          { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (!value || value > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('GIá tiền thuê nhà phải lớn hơn 0!'));
              },
            }),
          },
        ],
      },
    },
    // rentalTerm
    {
      name: 'rentalTerm',
      title: <p>1.4 Thời hạn thuê (tháng) &ensp;</p>,
      formItem: {
        col: 4,
        placeholder: t('Số tháng'),
        rules: [{ type: 'required' }],
        onChange: (date, form) => {
          if (form?.getFieldValue('fromDate')) {
            const formDate = new Date(form.getFieldValue('fromDate'));
            const returnDate = new Date(form.getFieldValue('fromDate'));
            returnDate.setMonth(formDate.getMonth() + parseInt(form.getFieldValue('rentalTerm')));
            form.setFieldsValue({ endDate: moment(returnDate) });
          }
        },
      },
    },

    {
      name: 'fromDate',
      title: <p>1.5 Bắt đầu từ ngày &ensp;</p>,
      formItem: {
        type: 'date',
        col: 4,
        rules: [{ type: 'required' }],
        className: 'border-gray-400 border rounded-xl w-full',
        onChange: (date, form) => {
          if (form?.getFieldValue('rentalTerm')) {
            const formDate = new Date(form.getFieldValue('fromDate'));
            const returnDate = new Date(form.getFieldValue('fromDate'));
            returnDate.setMonth(formDate.getMonth() + parseInt(form.getFieldValue('rentalTerm')));
            form.setFieldsValue({ endDate: moment(returnDate) });
          }
        },
        disabledDate: (currentDate) => {
          const date = new Date();
          return !(new Date(currentDate) >= date.setDate(date.getDate() - 1));
        },
      },
    },
    //
    {
      name: 'endDate',
      title: t('1.6 Đến ngày'),
      formItem: {
        col: 4,
        type: 'date',
        disabled: () => true,
        condition: (values, form) => form.getFieldValue('fromDate') && form.getFieldValue('rentalTerm'),
      },
    },
    // numberOfTenants
    {
      name: 'tenant',
      title: <p>1.7 Số người &ensp;</p>,
      formItem: {
        rules: [{ type: 'required' }],
        placeholder: t('Số người'),
        col: 4,
      },
    },
    // futune
    {
      name: 'future',
      title: (
        <p className="text-black mb-3">
          1.8 Trang bị nội thất <i>(Xem phụ lục đính kèm)</i>
        </p>
      ),
      formItem: {
        type: 'title',
      },
    },
    // futune
    {
      name: 'numberOfTenants',
      title: (
        <p className="text-black mb-3">
          1.9 Quy định toà nhà <i>(Xem phụ lục đính kèm)</i>
        </p>
      ),
      formItem: {
        type: 'title',
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
      name: 'costList',
      title: t('danh sách chi phí'),
      formItem: {
        name: 'costList',
        type: 'addable',
        text_add: t('Thêm chi phí'),
        fieldsName: [
          { name: 'name', placeholder: 'Tên chi phí' },
          { name: 'unitPrice', placeholder: 'Mệnh giá' },
          { name: 'unit', placeholder: 'Đơn vị tính' },
        ],
        className: 'font-normal mb-2 border border-gray-400 w-full',
      },
    },

    // dieu 3 ========
    {
      name: 'title',
      title: t('ĐIỀU 3 : TIỀN CỌC VÀ THỜI HẠN NHẬN PHÒNG'),
      formItem: {
        type: 'title',
        className: 'font-bold text-black mb-3',
      },
    },

    // title

    {
      name: ['roomDto', 'roomNumber'],
      title: t(''),
      formItem: {
        type: 'hidden',
      },
    },
    {
      name: ['roomDto', 'roomNumber'],
      title: '',
      formItem: {
        type: 'text-only',
        text: (form) => (
          <p className="text-black">
            3.1 Bên B đã cọc cho bên A số tiền để thuê căn hộ có mã{' '}
            <span className="font-medium text-black">Phòng {form.getFieldValue(['roomDto', 'roomNumber'])}</span> tại
            mục 1.1 <strong>ĐIỀU 1</strong>
          </p>
        ),
      },
    },
    // depositNumber

    {
      name: 'depositNumber',
      title: t('Bằng số'),
      formItem: {
        col: 4,
        placeholder: t('Số tiền bằng số'),
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

    // depositNumberString
    {
      name: 'depositNumberString',
      title: <p>Bằng chữ &ensp;</p>,
      formItem: {
        col: 8,
        placeholder: t('Số tiền bằng chữ'),
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
                return Promise.reject(t('Số tiền bằng chữ không hợp lệ chỉ được bao gồm chữ cái'));
              },
            }),
          },
        ],
      },
    },
    // depositDay
    {
      name: 'depositDay',
      title: t(''),
      formItem: {
        col: 12,
        type: 'number',
        classnamewrapoutermost: 'classnamewrapoutermost flex mt-2 items-baseline text-black input-day',
        nostyle: 'true',
        beforepart: <p className="text-black mr-2">3.2 Bên A cam kết sẽ giữ căn hộ cho Bên B trong</p>,
        placeholder: t('Nhập số ngày*'),
        afterpart: <p className="text-black ml-2">ngày kể từ ngày bên B ký.</p>,
        rules: [
          { type: 'required' },
          {
            type: 'custom',
            validator: () => ({
              validator(_, value) {
                if (!value || value > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(t('Vui lòng nhập số lớn hơn 0'));
              },
            }),
          },
        ],
      },
    },

    // depositDay
    {
      name: 'depositDay',
      title: t(''),
      formItem: {
        placeholder: t(' '),
        readOnly: true,
        col: 12,
        classnamewrapoutermost: 'flex items-baseline border-0 bg-white text-black',
        beforepart: (
          <p className="text-black mr-2">3.3 Nếu bên B không tiến hành các thủ tục để hai bên ký hợp đồng trong vòng</p>
        ),
        afterpart: <p className="text-black ml-2 text-black">ngày thì bên B phải chịu mất cọc.</p>,
      },
    },

    // titl
    {
      name: 'title',
      title: t(
        '3.4 Nếu bên B thay đổi ý định và không thực hiện ký kết hợp đồng thuê với bên A đúng thời hạn thì bên B phải chịu đền bù gấp đôi số tiền cọc',
      ),
      formItem: {
        type: 'title',
        className: 'italic text-black mb-3',
      },
    },

    // title ========
    {
      name: 'title',
      title: t('ĐIỀU 4 : GHI CHÚ KHÁC'),
      formItem: {
        type: 'title',
        className: 'font-bold mb-3 text-black',
      },
    },

    // note
    {
      name: 'note',
      title: t(''),
      formItem: {
        type: 'textarea',
        col: 12,
        placeholder: t('Ghi chú'),
      },
    },
    // statusPayment
    {
      name: 'statusPayment',
      title: t('Trạng thái hợp đồng:'),
      formItem: {
        type: 'select',
        col: 12,
        placeholder: t('số ngày'),
        list: [
          {
            value: 'PAYMENT',
            label: 'Đã thanh toán',
          },
          {
            value: 'NO_PAYMENT',
            label: 'Chờ thanh toán',
          },
        ],
      },
    },

    // paymentTerm
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

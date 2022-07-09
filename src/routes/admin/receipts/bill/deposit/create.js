import { HookModal } from 'hooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Input } from 'antd';
import moment from 'moment';
import { Mask } from 'components/form/input/index';
import { convertFormValue, formatNumber } from 'utils';

const CreateForm = ({ Post }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const columns = [
    {
      name: 'date',
      label: 'Tháng',
      formItem: {
        rules: [{ type: 'required', message: 'Xin vui lòng nhập' }],
        placeholder: 'Tháng',
        type: 'date',
      },
    },
    {
      name: 'amountReceived',
      label: '',
      formItem: {
        rules: [{ required: true, message: 'Xin vui nhập số tiền cọc đã thu' }],
        placeholder: 'Nhập số tiền cọc đã thu',
      },
    },
    {
      name: 'newDebtAmount',
      label: '',
      formItem: {
        rules: [{ required: true }],
        placeholder: 'Nhập số tiền',
      },
    },

    {
      name: 'note',
      label: 'Ghi chú: ',
      formItem: {},
      rules: [{ required: true }],
      placeholder: 'Nhập ghi chú',
    },
  ];
  const formItemDiscount = {
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
  };

  const [showModal, ModalJSX, , data] = HookModal({
    title: (data) => t('Thông tin phiếu thu cọc'),
    isLoading,
    setIsLoading,
    idElement: 'CreateForm',
    checkHidden: true,
    firstChange: true,
    widthModal: 800,
    onOk: () => {
      // showWarning()
      submit();
      // return false;
    },
  });

  const showModalForm = (values, clear = true) => {
    values = convertFormValue(columns, values, form);
    form.resetFields();
    values && form.setFieldsValue({ ...values, date: moment(values.date) });
    showModal(values);
  };

  const submit = async () => {
    return form
      .validateFields()
      .then(async (values) => {
        values = convertFormValue(columns, values, form);
        const data_temp = {
          ...data,
          ...values,
          depositAmountReceived: values.amountReceived,
          date: new Date(values.date).toISOString(),
        };
        const data_res = Post(data_temp);
        return data_res;
      })
      .catch((error) => {
        console.log('error', error);
        return false;
      });
  };

  return [
    () =>
      ModalJSX((data) => {
        form.setFieldsValue({ [columns[2].name]: data.totalAmount });
        return (
          <div>
            <Form name="billForm" autoComplete="off" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
              <p className="font-bold text-center text-lg mb-2">{data?.buildingName}</p>
              <p className="text-center italic mb-3">{data?.buildingAddress}</p>
              <p className="font-bold text-center text-lg mb-3">PHIẾU THU TIỀN CỌC</p>
              <div className="text-center">
                {/* <span>Tháng *:</span> */}
                <Form.Item
                  className="inline-flex"
                  label={columns[0].formItem.label}
                  name={columns[0].name}
                  rules={columns[0].formItem.rules}
                >
                  <DatePicker
                    format={'YYYY-MM'}
                    placeholder={columns[0].placeholder}
                    picker="month"
                    className="h-10 rounded-xl bg-white border border-solid border-gray-400 py-2 pl-4 ant-input"
                  />
                </Form.Item>
              </div>
              <p className="text-center mb-5">Mã {data?.code} </p>
              <p className="mx-3  mb-5">
                <i>
                  <span className="font-medium">NOTE:</span> Phiếu thu này là một phần không thể tách rời của giấy báo
                  tiền phòng mã {data?.housingExpenseCode}
                </i>
              </p>
              <div className="rounded-2xl border border-black p-5 mx-3  mb-5">
                <p className="font-bold text-sm mb-3 ">THÔNG TIN PHÒNG</p>
                <div className="mx-24">
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>Mã phòng:</div>
                    <div className="col-span-2">{data?.roomNumber}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>Người thuê nhà:</div>
                    <div className="col-span-2">{data?.renterName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>Số người ở:</div>
                    <div className="col-span-2">{data?.numberOfTenants} người</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>Giá thuê:</div>
                    <div className="col-span-2 ">{data?.rentalPrice ? formatNumber(data?.rentalPrice) : 0} đồng</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>Số tiền đặt cọc:</div>
                    <div className="col-span-2 ">{data?.depositPrice ? formatNumber(data?.depositPrice) : 0} đồng</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>Số tiền cọc đã nhận:</div>
                    <div className="col-span-2 ">
                      {data?.depositAmountReceived ? formatNumber(data?.depositAmountReceived) : 0} đồng
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center mb-5 mx-2 ">
                <div>Số tiền cọc đã thu *:</div>
                <div className="col-span-2 flex items-center">
                  <Form.Item
                    name={columns[1].name}
                    label={columns[1].formItem.label}
                    rules={columns[1].formItem.rules}
                    className="mb-0 mr-2"
                  >
                    <Mask
                      placeholder={columns[1].placeholder}
                      onChange={(e) => {
                        const newDebt =
                          Number(data?.totalAmount.toString().replaceAll('.', '')) - Number(e.target.value);
                        form.setFieldsValue({ [columns[2].name]: newDebt });
                      }}
                      {...formItemDiscount}
                    />
                  </Form.Item>
                  đồng
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center mx-2 mb-5">
                <div>Nợ mới(số tiền nợ còn lại) *:</div>
                <div className="col-span-2  flex items-center">
                  <Form.Item
                    // disabled={disabled}
                    name={columns[2].name}
                    label={columns[2].formItem.label}
                    className="mb-0 mr-2"
                  >
                    <Mask placeholder={columns[2].placeholder} readOnly={true} {...formItemDiscount} />
                  </Form.Item>
                  đồng
                </div>
              </div>
              <Form.Item label={columns[3].formItem.label} name={columns[3].name} className="mb-1">
                <TextArea
                  placeholder={columns[3].placeholder}
                  rows={4}
                  className="w-full rounded-xl bg-white border border-solid border-gray-400 py-2 px-4 ant-input mx-2"
                />
              </Form.Item>
            </Form>
          </div>
        );
      }),
    showModalForm,
  ];
};

export default CreateForm;

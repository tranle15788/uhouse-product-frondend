import { HookModal } from 'hooks';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Input, Select } from 'antd';
import moment from 'moment';
import { convertFormValue, formatCurrency } from 'utils';
import { noticeService } from 'services/receipt';
import { Addable, Mask } from 'components/form/input/index';
import './index.less';

const CreateForm = ({ Post, Put }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const monthFormat = 'DD-MM-YYYY';
  const [data, set_data] = useState({});
  const [dataCost, set_dataCost] = useState();
  const [readOnlyPercent, set_readOnlyPercent] = useState(false);
  // const [showPercentage, setShowPercentage] = useState(false);
  const [showAmount, setShowAmount] = useState(true);
  const columns = [
    {
      name: 'date',
      label: 'Tháng',
      rules: [{ required: true, message: 'Xin vui lòng chọn tháng' }],
      placeholder: 'Tháng',
    },

    {
      name: 'percentageDiscount',
      label: '',
      placeholder: 'Nhập phần trăm',
    },
    {
      name: 'amountDiscount',
      label: '',
      placeholder: 'Nhập số tiền',
      rules: [{ required: true }],
    },
    {
      name: 'note',
      label: 'Ghi chú',
      formItem: {},
      placeholder: 'Nhập ghi chú',
    },

    // rentalPrice
    {
      name: 'rentalPrice',
      label: '',
      placeholder: 'Nhập số tiền',
      rules: [{ required: true }],
    },
  ];

  const formItem = {
    rules: [{ type: 'required' }],
    name: 'otherExpense',
    type: 'addable',
    col: 3,
    orderNumber: true,
    nostyle: 'true',
    text_add: t('Thêm dòng'),
    titleList: [t('Tên chi phí'), t('Số tiền')],
    fieldsName: [
      { name: 'name', placeholder: 'Tên chi phí' },
      { name: 'price', placeholder: 'Số tiền' },
    ],
    total: {
      readOnly: true,
      name: 'totalOtherExpense',
      placeholder: t('Tổng chi phí'),
      columnname: 'price',
      checkboxname: 'totalStatus',
      addsumfunction: (value, form) => {
        if (isNaN(value)) value = 0;
        sumTotalAmount();
      },
      autocompute: true,
      mask: {
        alias: 'numeric',
        groupSeparator: ',',
        digitsOptional: true,
        prefix: '',
        placeholder: '0',
      },
    },
    className: 'font-normal mb-2 border border-gray-400 w-full',
  };

  const formItemDiscount = {
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

  const formItemMask = {
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
  };

  const [showModal, ModalJSX] = HookModal({
    title: (data) => t('routes.admin.receipt.notice.Information on notice'),
    isLoading,
    setIsLoading,
    idElement: 'CreateNoticeForm',
    checkHidden: true,
    firstChange: true,
    widthModal: 1000,
    onOk: () => submit(),
  });

  useEffect(() => {
    !!dataCost && sumTotalAmount();
  }, [dataCost]);

  const showModalForm = async (values) => {
    if (values) {
      values = convertFormValue(columns, values, form);
      form.resetFields();
      form.setFieldsValue({
        ...values,
        date: moment(values.date),
      });
      getWaterElectricCost({ rentalContractId: values.rentalContractId, date: values.date });
      set_data({ ...values });
    } else {
      set_data({});
      form.resetFields();
    }
    showModal(values);
  };

  const handleChange = (value) => {
    value === 'amount' ? setShowAmount(true) : setShowAmount(false);
  };

  const getWaterElectricCost = async (params) => {
    const cost_temp = params.date && (await noticeService.getWaterElectric(params));
    cost_temp
      ? set_dataCost(
          cost_temp.map((ele) => {
            return {
              ...ele,
              amount: Math.floor(ele?.amount ? ele?.amount : 0),
              firstIndex: Math.floor(ele?.firstIndex ? ele?.firstIndex : 0),
              lastIndex: Math.floor(ele?.lastIndex ? ele?.lastIndex : 0),
            };
          }),
        )
      : set_dataCost([]);
  };

  const sumTotalAmount = (
    percentageDiscount = form.getFieldValue('percentageDiscount'),
    total_otherCost = form.getFieldValue('totalOtherExpense'),
  ) => {
    let amountDiscount;
    let total_dataCost = 0;
    let total_cost = 0;
    data?.costs && data?.costs.map((index) => (total_cost += Number(index.unitPrice ? index.unitPrice : 0)));
    dataCost?.forEach((ele) => {
      total_dataCost += Number(ele.amount ? ele.amount : 0) + data?.rentalPrice / 2 + total_cost / 2;
    });
    total_otherCost = total_otherCost || 0;
    if (readOnlyPercent) {
      amountDiscount = form.getFieldValue('amountDiscount');
    } else {
      amountDiscount = (
        (total_dataCost + Number(total_otherCost?.toString().replaceAll('.', ''))) *
        (Number(percentageDiscount?.toString().replaceAll('.', '')) / 100)
      ).toFixed();
    }
    const total = (
      Number(total_dataCost) +
      Number(total_otherCost?.toString().replaceAll('.', '')) +
      Number(data?.oldDebt) -
      Number(amountDiscount)
    ).toFixed();
    form.setFieldsValue({ totalAmount: total });
  };

  // phan tong chi phi -block
  // const sumAmountExpenses = (
  //   total_otherCost = form.getFieldValue('totalOtherExpense'),
  // ) => {
  //   let total_dataCost = 0;
  //   let total_cost = 0;
  //   data?.costs && data?.costs.map((index) => (total_cost += Number(index.unitPrice ? index.unitPrice : 0)));
  //   dataCost?.forEach((ele) => {
  //     total_dataCost += Number(ele.amount ? ele.amount : 0) + data?.rentalPrice / 2 + total_cost / 2;
  //   });
  //   total_otherCost = total_otherCost || 0;
  //   const totalExpenses = (
  //     Number(total_dataCost) +
  //     Number(total_otherCost?.toString().replaceAll('.', ''))
  //   ).toFixed();
  //   form.setFieldsValue({ totalAmountExpenses: totalExpenses });
  // };

  const submit = async () => {
    return form
      .validateFields()
      .then(async (values) => {
        values = convertFormValue(columns, values, form);
        const data_temp = {
          ...data,
          ...values,
          date: new Date(values.date).toISOString(),
          totalOtherExpense: values.totalOtherExpense ? values.totalOtherExpense.toString().replaceAll('.', '') : 0,
          otherExpense: values.otherExpense
            ? values.otherExpense.map((ele) => {
                return { ...ele, price: ele.price.toString().replaceAll('.', '') };
              })
            : [],
          roomId: data?.room?.id,
        };
        const data_res = data.id ? Put && Put(data_temp) : Post && Post(data_temp);
        return data_res;
      })
      .catch((error) => {
        console.log('error', error);
        return false;
      });
  };

  return [
    () =>
      ModalJSX((data) => (
        <div>
          <Form
            name="noticeForm"
            initialValues={{ remember: true }}
            autoComplete="off"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
          >
            <p className="font-bold text-center text-lg mb-2 uppercase">{data?.buildingName}</p>
            <p className="text-center italic text-lg mb-3">{data?.buildingAddress}</p>
            <p className="font-bold text-center text-lg mb-3">GIẤY BÁO TIỀN PHÒNG</p>
            <div className="text-center">
              <Form.Item
                className="inline-flex"
                label={columns[0].label}
                name={columns[0].name}
                rules={columns[0].rules}
              >
                <DatePicker
                  defaultValue={moment(data?.date)}
                  picker="date"
                  format={monthFormat}
                  onChange={(e) => {
                    // console.log("onChange", e)
                    getWaterElectricCost({ rentalContractId: data.rentalContractId, date: new Date(e) });
                  }}
                  className="h-10 rounded-xl bg-white border border-solid border-gray-400 py-2 pl-4 ant-input"
                />
              </Form.Item>
            </div>
            <p className="text-center mb-5">Mã {data?.code} </p>
            <div className="rounded-2xl border border-black p-5 mx-3  mb-5">
              <p className="font-bold text-sm mb-3 ">THÔNG TIN PHÒNG</p>
              <div className="mx-24">
                <div className="grid grid-cols-3 gap-4">
                  <div>Mã phòng:</div>
                  <div className="col-span-2">{data?.room?.roomNumber}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>Người thuê:</div>
                  <div className="col-span-2">{data?.tenant?.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>Số người ở:</div>
                  <div className="col-span-2">{data?.numberOfTenants}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>Giá thuê:</div>
                  <div className="col-span-2 ">{formatCurrency(data?.rentalPrice, '')} đồng</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>Số tiền đặt cọc:</div>
                  <div className="col-span-2 ">{data?.deposit ? formatCurrency(data?.deposit, '') : 0} đồng</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>Số tiền cọc đã nhận:</div>
                  <div className="col-span-2 ">{formatCurrency(data?.depositAmountReceived, '')} đồng</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-black p-5 mx-3 mb-5 h-auto">
              <p className="font-bold text-sm mb-3">CÁC CHI PHÍ</p>
              <div className="mx-24">
                <div className="grid grid-cols-3 gap-4">
                  <div className="">Tiền thuê:</div>
                  <div className="col-span-2">
                    {formatCurrency(data?.rentalPrice, '')} đồng
                    {/* extend */}
                    {/* <Form.Item
                    //  name="rentalPrice"
                    >
                      <Input
                        value={formatCurrency(data?.rentalPrice, '')}
                        className=" rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right mt-3"
                        readOnly={true}
                        // onChange={(e)=> {
                        //       let value = e.target.value;
                        //       form.setFieldsValue({rentalPrice:value});
                        // } }
                      />
                      đồng
                    </Form.Item> */}
                  </div>
                </div>
                {dataCost &&
                  dataCost.map((ele, index) => (
                    <div key={index} className="">
                      {ele.type === 'ELECTRICITY' && (
                        <div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="">Tiền điện:</div>
                            <div className="col-span-2">
                              {formatCurrency(ele.amount, '')} đồng
                              {/* extend */}
                              {/* <Form.Item className="mb-1">
                                <Input
                                  value={formatCurrency(ele.amount, '')}
                                  className="rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                                  readOnly={true}
                                />
                                đồng
                              </Form.Item> */}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="ml-5">_Chỉ số mới:</div>
                            <div className="col-span-2 ml-3">
                              {formatCurrency(ele.firstIndex, '')}
                              {/* extend */}
                              {/* <Form.Item className="mb-1">
                                <Input
                                  value={formatCurrency(ele.firstIndex, '')}
                                  className="rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                                  readOnly={true}
                                />
                              </Form.Item> */}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="ml-5">_Chỉ số cũ:</div>
                            <div className="col-span-2 ml-3">
                              {formatCurrency(ele.lastIndex, '')}
                              {/* extend */}
                              {/* <Form.Item className="mb-1">
                                <Input
                                  value={formatCurrency(ele.lastIndex, '')}
                                  className="rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                                  readOnly={true}
                                />
                              </Form.Item> */}
                            </div>
                          </div>
                        </div>
                      )}
                      {ele.type === 'WATER' && (
                        <div className="">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="">Tiền nước:</div>
                            <div className="col-span-2">
                              {formatCurrency(ele.amount, '')} đồng
                              {/* extend */}
                              {/* <Form.Item placeholder="Chi phí" className="mb-1">
                                <Input
                                  value={formatCurrency(ele.amount, '')}
                                  className="rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                                  readOnly={true}
                                />
                                đồng
                              </Form.Item> */}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="ml-5">_Chỉ số mới:</div>
                            <div className="col-span-2 ml-3">
                              {formatCurrency(ele.firstIndex, '')}
                              {/* extend */}
                              {/* <Form.Item placeholder="Chi phí" className="mb-1">
                                <Input
                                  value={formatCurrency(ele.firstIndex, '')}
                                  className="rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                                  readOnly={true}
                                  // onChange={(e)=>

                                  //  }
                                />
                              </Form.Item> */}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="ml-5">_Chỉ số cũ:</div>
                            <div className="col-span-2 ml-3">
                              {formatCurrency(ele.lastIndex, '')}
                              {/* extend */}
                              {/* <Form.Item placeholder="Chi phí" className="mb-1">
                                <Input
                                  value={formatCurrency(ele.lastIndex, '')}
                                  className="rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                                  readOnly={true}
                                />
                              </Form.Item> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                {data?.costs &&
                  data?.costs.map((ele, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div className="">{ele?.name}</div>
                      <div className="col-span-2">
                        {formatCurrency(ele.unitPrice, '')} đồng
                        {/* <Form.Item placeholder="Chi phí" className="mb-1">
                          <Input
                            value={formatCurrency(ele.unitPrice, '')}
                            className="rounded-xl bg-gray-200 border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                            readOnly={true}
                          />
                          đồng
                        </Form.Item> */}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="rounded-2xl border border-black p-5 mx-3 mb-5">
              <p className="font-bold text-sm mb-3 ">CÁC CHI PHÍ KHÁC</p>
              <Addable {...formItem} form={form} listName={formItem.name} />
            </div>
            <div className="mx-3">
              <div className="grid grid-cols-2 items-center mb-2">
                <div className="grid grid-cols-6 items-center">
                  <div className="mt-2 col-span-2">Nợ cũ:</div>
                  <div className="col-span-3">
                    <Form.Item placeholder="Chi phí" className="mb-1">
                      <Input
                        disabled={true}
                        value={formatCurrency(data?.oldDebt, '')}
                        className="rounded-xl bg-white border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-span-1 ml-1"> đồng</div>
                </div>
                {/* phan tong chi phi -block */}
                <div className="grid grid-cols-6 items-center">
                  <div className="mt-2 col-span-2">Tổng chi phí:</div>
                  <div className="col-span-3">
                    <Form.Item placeholder="Chi phí" className="mb-1">
                      <Input
                        disabled={true}
                        // value={sumAmountExpenses}
                        className="rounded-xl bg-white border border-solid border-gray-400 py-2 px-4 ant-input mr-2 text-right"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-span-1 ml-1"> đồng</div>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center mb-2">
                <div className="grid grid-cols-6 items-center">
                  <div className="col-span-2">Giảm giá theo:</div>
                  <div className="col-span-3">
                    <Form.Item name="discount" className="mb-1">
                      <Select defaultValue={{ value: 'amount' }} onChange={handleChange}>
                        <Select.Option value="percentage">Phần trăm</Select.Option>
                        <Select.Option value="amount">Số tiền</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-span-1 ml-1"></div>
                </div>
                {showAmount ? (
                  <div className="grid grid-cols-6 items-center">
                    <div className="col-span-2">Giảm giá (số tiền):</div>
                    <div className="col-span-3">
                      <Form.Item name="amountDiscount" className="mb-1">
                        <Mask
                          {...formItemDiscount}
                          name="amountDiscount"
                          onChange={(e) => {
                            setTimeout(() => {
                              form.setFieldsValue({ percentageDiscount: 0 });
                              set_readOnlyPercent(!!e.target.value && e.target.value !== '0');
                              sumTotalAmount();
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-span-1 ml-1"> đồng</div>
                  </div>
                ) : null}
              </div>
              {!showAmount ? (
                <div className="grid grid-cols-2 items-center mb-2">
                  <div className="grid grid-cols-6 items-center">
                    <div className="col-span-2">Giảm giá (phần trăm):</div>
                    <div className="col-span-3">
                      <Form.Item name="percentageDiscount" className="mb-1">
                        <Input
                          // disabled={readOnlyPercent}
                          className="h-10 rounded-xl bg-white border border-solid border-gray-400 py-2 px-4 ant-input w-full text-right"
                          onChange={(e) => {
                            let total_dataCost = 0;
                            let total_cost = 0;
                            data?.costs &&
                              data?.costs.map((index) => (total_cost += Number(index.unitPrice ? index.unitPrice : 0)));
                            dataCost.forEach((ele) => {
                              total_dataCost +=
                                Number(ele.amount ? ele.amount : 0) + data?.rentalPrice / 2 + total_cost / 2;
                            });

                            let total_otherCost = form.getFieldValue('totalOtherExpense');
                            total_otherCost = total_otherCost || 0;
                            const amountDiscount = (
                              (total_dataCost + Number(total_otherCost?.toString().replaceAll('.', ''))) *
                              (Number(e.target.value) / 100)
                            ).toFixed();
                            form.setFieldsValue({ amountDiscount: Math.floor(amountDiscount) });
                            sumTotalAmount(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-span-1 ml-1">%</div>
                  </div>
                  <div className="grid grid-cols-6 items-center">
                    <div className="col-span-2">Giảm giá (số tiền):</div>
                    <div className="col-span-3">
                      <Form.Item name="amountDiscount" className="mb-1">
                        <Mask
                          disabled={true}
                          {...formItemDiscount}
                          name="amountDiscount"
                          onChange={(e) => {
                            setTimeout(() => {
                              form.setFieldsValue({ percentageDiscount: 0 });
                              // set_readOnlyPercent(!!e.target.value && e.target.value !== '0');
                              sumTotalAmount();
                            });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-span-1 ml-1"> đồng</div>
                  </div>
                </div>
              ) : null}

              {/* totalAmount */}
              <div className="grid grid-cols-2 items-center">
                <div className="grid grid-cols-6 items-center">
                  <div className="col-span-2">Tổng số tiền phải thu:</div>
                  <div className="col-span-3">
                    <Form.Item name="totalAmount" className="mb-1">
                      <Mask {...formItemMask} />
                    </Form.Item>
                  </div>
                  <div className="col-span-1 ml-1"> đồng</div>
                </div>
              </div>
              <Form.Item label={columns[3].label} name={columns[3].name} className="mb-1 font-bold">
                <TextArea
                  placeholder={columns[3].placeholder}
                  rows={4}
                  className="w-full rounded-xl bg-white border border-solid border-gray-400 py-2 px-4 ant-input font-normal"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      )),
    showModalForm,
  ];
};

export default CreateForm;

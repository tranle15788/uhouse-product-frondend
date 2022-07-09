import { HookModal } from 'hooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import Electricawater from 'services/room/electricawater';
import { useAuth } from 'global';
import moment from 'moment';
import { formatNumber } from 'utils';
const CreateForm = () => {
  const { formatDate } = useAuth();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState(null);
  const [showModal, ModalJSX] = HookModal({
    title: (data) => t('Thông tin chi tiết chi phí điện nước'),
    isLoading,
    setIsLoading,
    checkHidden: true,
    firstChange: true,
    widthModal: 650,
  });
  const getDetail = async (id) => {
    const res = await Electricawater.getDetailById(id);
    setDetail(res.data);
  };
  const showModalForm = (id) => {
    getDetail(id);
    showModal();
  };
  return [
    () =>
      ModalJSX(() => (
        <div>
          <Form
            name="electricForm"
            initialValues={{ remember: true }}
            autoComplete="off"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 6 }}
            form={form}
          >
            <p className="font-bold text-center text-lg mb-2">{'THÔNG TIN CHI TIẾT CHỈ SỐ ĐIỆN NƯỚC'}</p>
            <p className="font-bold text-center text-lg mb-3 readOnly">
              Tháng: {moment(detail?.date).format('MM-YYYY')}
            </p>

            <br />

            <div className="mx-3">
              <p> Ngày chốt chỉ số: {moment(detail?.billClosingDate).format(formatDate)} </p>
              <br />
            </div>
            <div className="rounded-2xl border border-black p-5 mx-3  mb-5">
              <p className="font-bold text-sm mb-3 ">CHỈ SỐ ĐIỆN</p>
              <div className="mx-24">
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Chỉ số đầu: </div>
                  <div className="col-span-2 text-left mx-14">
                    {detail?.electricityDetail?.firstIndex ? formatNumber(detail?.electricityDetail?.firstIndex) : '0'}
                  </div>
                  <div>kW</div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Chỉ số cuối: </div>
                  <div className="col-span-2 text-left mx-14">
                    {detail?.electricityDetail?.lastIndex ? formatNumber(detail?.electricityDetail?.lastIndex) : '0'}
                  </div>
                  <div>kW</div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Sử dụng: </div>
                  <div className="col-span-2 text-left mx-14">
                    {detail?.electricityDetail?.indexUsed ? formatNumber(detail?.electricityDetail?.indexUsed) : '0'}
                  </div>
                  <div>kW</div>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-2">
                  <div className="col-span-2">Loại chi phí:</div>
                  <div className="col-span-2 ">
                    {detail?.electricityDetail?.type === 'ELECTRICITY' ? 'Tiền điện' : ''}
                  </div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Số tiền:</div>
                  <div className="col-span-2 text-left mx-14">
                    {detail?.electricityDetail?.amount ? formatNumber(detail?.electricityDetail?.amount) : '0'}
                  </div>
                  <div>đồng</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-black p-5 mx-3  mb-5">
              <p className="font-bold text-sm mb-3 ">CHỈ SỐ NƯỚC</p>
              <div className="mx-24">
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Chỉ số đầu: </div>
                  <div className="col-span-2 text-left mx-14">
                    {detail?.waterDetail?.firstIndex ? formatNumber(detail?.waterDetail?.firstIndex) : '0'}{' '}
                  </div>
                  <div>m3</div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Chỉ số cuối:</div>
                  <div className="col-span-2 text-left mx-14">
                    {detail?.waterDetail?.lastIndex ? formatNumber(detail?.waterDetail?.lastIndex) : '0'}{' '}
                  </div>
                  <div>m3</div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Sử dụng: </div>
                  <div className="col-span-2 text-left mx-14">
                    {detail?.waterDetail?.indexUsed ? formatNumber(detail?.waterDetail?.indexUsed) : ''}{' '}
                  </div>
                  <div>m3</div>
                </div>
                <div className="grid grid-cols-5 gap-4 mb-2">
                  <div className="col-span-2">Loại chi phí:</div>
                  <div className="col-span-2">{detail?.waterDetail?.type === 'WATER' ? 'Tiền Nước' : ''} </div>
                  <div></div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-2">
                  <div>Số tiền: </div>
                  <div className="col-span-2 text-left mx-14 ">
                    {detail?.waterDetail?.amount ? formatNumber(detail?.waterDetail?.amount) : '0'}{' '}
                  </div>
                  <div>đồng</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mx-3 items-center mb-2  ">
              <div className="font-bold">Tổng tiền: </div>
              <div className="col-span-2 text-center">
                {detail?.totalAmount ? formatNumber(detail?.totalAmount) : '0'}
              </div>
              <div className="col-span-1 text-left">đồng</div>
            </div>
            <div className="grid  gap-4 mb-2 mx-3">
              <p>Ghi Chú: {detail?.note} </p>
              <br />
            </div>
          </Form>
        </div>
      )),
    showModalForm,
  ];
};

export default CreateForm;

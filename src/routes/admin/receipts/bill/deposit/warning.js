import { HookModal } from 'hooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CreateForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [, set_data] = useState();

  const [showModal, ModalJSX, handleOk] = HookModal({
    title: (data) => t('Cảnh báo'),
    isLoading,
    setIsLoading,
    idElement: 'CreateForm',
    checkHidden: true,
    firstChange: true,
    widthModal: 750,
    onOk: () => handleOk(),
  });

  const showModalForm = () => {
    set_data({});
    showModal();
  };

  return [
    () =>
      ModalJSX(() => (
        <div>
          <p>
            Số tiền cọc đã thu của bạn đã vượt quá Tổng số tiền đặt cọc phải thu, bạn có muốn lưu giữ số tiền thừa còn
            lại để trừ vào nợ của giấy báo tiếp theo?
          </p>
        </div>
      )),
    showModalForm,
  ];
};

export default CreateForm;

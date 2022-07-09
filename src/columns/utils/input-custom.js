import classNames from 'classnames';
import React, { useState } from 'react';
import { formatNumber } from 'utils';

const InputCustom = ({ checkSubmit, returnInputData, id, name }) => {
  const [noticeError, setNoticeError] = useState(true);
  const [_value, set_value] = useState('');
  return (
    <div>
      <input
        placeholder="Nhập"
        className={classNames(
          'mt-2 h-10 rounded-xl bg-white border border-solid border-gray-400  py-2 px-4 ant-input w-full text-center',
          noticeError && checkSubmit && 'border-red-400 hover:border-red-400 focus:border-red-400',
        )}
        onChange={(e) => {
          e.target.value ? setNoticeError(false) : setNoticeError(true);
          let value_temp = e.target.value?.toString().replace(/[^0-9]+/g, '');
          value_temp = formatNumber(value_temp, '.');
          returnInputData(name, value_temp, id);
          set_value(value_temp);
        }}
        value={_value}
      />
      {/* {noticeError && (
        <p className={classNames("text-red-500 mb-0 fixed text-xs")}>
          * Trường bắt buộc
        </p>
      )} */}
    </div>
  );
};
export default InputCustom;

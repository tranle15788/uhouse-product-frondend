import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

const Component = ({ mask, value, addonBefore, addonAfter, readOnly, ...prop }) => {
  const input = useRef(null);
  if (prop.condition) {
    delete prop.condition;
  }
  useEffect(() => {
    if (mask) {
      import('inputmask').then(({ default: Inputmask }) => input.current && Inputmask(mask).mask(input.current));
    }
  }, []);
  return (
    <div className={' border border-gray-400 rounded-xl ant-input flex items-center'}>
      {!!addonBefore && <div className={'h-10 rounded-l-xl bg-gray-200 p-2'}>{addonBefore}</div>}
      <input
        ref={input}
        className={classNames(
          'w-full h-10 text-gray-600 bg-white pr-9 pl-4 ant-input border-gray-400 ',
          {
            'rounded-xl border-none': !addonBefore && !addonAfter,
            'rounded-l-xl border-r': !addonBefore && !!addonAfter,
            'rounded-r-xl border-l': !!addonBefore && !addonAfter,
            'border-r border-l': !!addonBefore && !!addonAfter,
          },
          readOnly && 'bg-gray-100 text-gray-400',
        )}
        readOnly={readOnly}
        value={value || ''}
        {...prop}
      />
      {!!addonAfter && <div className={'h-10 rounded-r-xl bg-gray-200 p-2'}>{addonAfter}</div>}
    </div>
  );
};
export default Component;

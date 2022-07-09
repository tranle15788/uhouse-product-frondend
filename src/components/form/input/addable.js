import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import { formatNumber } from 'utils';
import classNames from 'classnames';
import { DatePicker } from './index';
import { useAuth } from '../../../global';
const Components = ({
  text_add = 'Add field',
  fieldsName = [],
  icon,
  listName,
  orderNumber = false,
  form,
  total = false,
  titleList,
  maxLength,
  ...rest
}) => {
  const { t } = useTranslation();
  const { formatDate } = useAuth();
  const timeoutID = useRef(null);
  const [checkAutoCompute, setCheckAutoCompute] = useState(total?.autocompute !== null ? total?.autocompute : true);
  useEffect(() => {
    form && sum(form.getFieldsValue()[total?.checkboxname]);
  }, [form]);

  const sum = (checkbox = form.getFieldsValue()[total?.checkboxname]) => {
    let total_temp = 0;
    checkbox !== checkAutoCompute && setCheckAutoCompute(checkbox);
    if (checkbox) {
      if (form.getFieldsValue(listName)[listName]) {
        form.getFieldsValue(listName)[listName].forEach((ele) => {
          if (ele && ele[total?.columnname]) {
            const value = ele[total?.columnname]?.toString().replace(/[^0-9,]+/g, '');
            total_temp += Number(value);
          }
        });
        form.setFieldsValue({ [total?.name]: formatNumber(total_temp, '.') });
      }
    } else {
      total_temp = form
        .getFieldsValue(listName)
        [total?.name]?.toString()
        .replace(/[^0-9,]+/g, '');
    }
    total?.addsumfunction && total?.addsumfunction(total_temp, form);
  };
  return (
    <div className="form-add">
      <Form.List name={listName}>
        {(fields = [], { add, remove }) => {
          return (
            <>
              {titleList && (
                <div className="flex items-center justify-center w-full bg-gray-300 h-7">
                  {orderNumber && (
                    <div className="w-[40px] flex justify-center items-center h-full p-0 font-bold ">{t('STT')}</div>
                  )}
                  <div className="flex w-full h-full">
                    {fieldsName?.map((ele, index) => {
                      const w_column = Math.round((100 / (fieldsName.length - !checkAutoCompute ? 1 : 0)) * 100) / 100;

                      return (
                        !(!checkAutoCompute && ele.name === total?.columnname) && (
                          <div
                            className={'h-full font-bold border-l-[1px] flex justify-center items-center'}
                            style={{ width: `${w_column}%` }}
                            key={index}
                          >
                            {titleList[index]}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="w-[40.1px] h-full bg-white"></div>
                </div>
              )}
              {fields.map(({ key, name, ...restField }, i) => {
                return (
                  <div className="form-add-item flex w-full" key={i}>
                    {orderNumber && (
                      <div className="h-full bg-gray-300 w-[40px] flex justify-center items-center border-b-[1px]">
                        {i + 1}
                      </div>
                    )}
                    <div className="flex m-0 h-full w-full">
                      {fieldsName?.map(
                        (ele, index) =>
                          !(!checkAutoCompute && ele.name === total?.columnname) && (
                            <Form.Item {...restField} name={[name, ele.name]} key={index}>
                              {ele.type !== 'date' ? (
                                <input
                                  type={ele.type ? ele.type : 'text'}
                                  className={classNames('form-input focus:outline-none w-full')}
                                  placeholder={ele.placeholder}
                                  onChange={(e) => {
                                    if (ele.name === total?.columnname) {
                                      if (e.target.value) {
                                        const arr_list = form.getFieldsValue()[listName];
                                        const value = e.target.value?.toString().replace(/[^0-9]+/g, '');
                                        arr_list[i][total?.columnname] = formatNumber(value, '.');
                                        form.setFieldsValue({ [listName]: arr_list });
                                      }
                                    }
                                    clearTimeout(timeoutID.current);
                                    timeoutID.current = setTimeout(() => {
                                      checkAutoCompute && ele.name === total?.columnname && sum();
                                    }, 500);
                                  }}
                                  value=""
                                />
                              ) : (
                                <DatePicker
                                  key={index}
                                  format={
                                    (!ele.picker || ele.picker === 'date') &&
                                    formatDate + (ele.showTime ? ' HH:mm' : '')
                                  }
                                  disabledDate={(current) => ele.disabledDate && ele.disabledDate(current, form)}
                                  showTime={ele.showTime}
                                  picker={ele.picker || 'date'}
                                  className={ele.className}
                                />
                              )}
                            </Form.Item>
                          ),
                      )}
                    </div>
                    <div className="icon-minus">
                      {' '}
                      {icon ? (
                        icon()
                      ) : (
                        <i
                          className="las la-trash-alt ml-4 text-red-500 text-3xl"
                          onClick={() => {
                            remove(name);
                            sum();
                          }}
                        ></i>
                      )}{' '}
                    </div>
                  </div>
                );
              })}
              {(!maxLength || maxLength(form) > fields.length) && (
                <div className="w-full flex justify-end">
                  <div
                    className="rounded-xl font-medium border mt-2 border-solid border-gray-400 h-10 text-white float-right bg-blue-500 hover:bg-blue-400 flex justify-center items-center px-4 my-3 "
                    onClick={() => add()}
                  >
                    <i className="las la-plus mr-1 text-lg"></i>
                    {text_add}
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Form.List>

      {total && (
        <div className="flex justify-end h-16">
          <Form.Item name={total?.checkboxname} valuePropName="checked" initialValue={true}>
            <Checkbox
              onChange={(e) => {
                setCheckAutoCompute(e.target.checked);
                sum(e.target.checked);
              }}
            >
              {t('Tự động tính tổng')}
            </Checkbox>
          </Form.Item>
          <Form.Item name={total?.name}>
            <input
              className="form-input border-[1px] p-2 rounded-xl focus:outline-none border-gray-400 w-full px-3"
              placeholder={total?.placeholder || t('components.form.Enter') + ' ' + total?.placeholder.toLowerCase()}
              readOnly={checkAutoCompute}
              onChange={(e) => {
                if (e.target.value) {
                  let totalValue = form.getFieldsValue()[total.name];
                  const value = e.target.value?.toString().replace(/[^0-9]+/g, '');
                  totalValue = formatNumber(value, '.');
                  form.setFieldsValue({ [total.name]: totalValue });
                }
                sum();
              }}
            />
          </Form.Item>
        </div>
      )}
    </div>
  );
};

export default Components;

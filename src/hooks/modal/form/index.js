import React, { useState } from 'react';
import { Form as FormAnt } from 'antd';

import { Form } from 'components';
import { convertFormValue } from 'utils';
import { HookModal } from 'hooks';

const Hook = ({
  parentID = () => {},
  title,
  isLoading,
  setIsLoading,
  handleChange,
  Post,
  Put,
  Patch,
  Delete,
  GetById,
  values,
  readOnly,
  customFooter,
  firstRun,
  widthModal = 1200,
  columns,
  textSubmit,
  idElement,
  extendButton,
  className,
  ...propForm
}) => {
  const [form] = FormAnt.useForm();
  const [firstChange, set_firstChange] = useState(false);

  const [handleShow, Modal] = HookModal({
    customFooter,
    widthModal,
    isLoading,
    setIsLoading,
    firstChange,
    idElement: 'modal-form-' + idElement,
    extendButton,
    className,
    textSubmit,
    title: (data) => title(data),
    onOk: async (data) => {
      return form
        .validateFields()
        .then(async (values) => {
          values = convertFormValue(columns, values, form);
          if (!!Post || !!Put) {
            try {
              setIsLoading(true);
              const res = await (data.id === undefined
                ? Post(values, parentID())
                : Put(values, data.id, parentID(), data));
              if (res !== false) {
                values = res?.data;
              } else {
                setIsLoading(false);
                return false;
              }
            } catch (e) {
              setIsLoading(false);
            }
          }
          handleChange && (await handleChange(values, data));
          return true;
        })
        .catch(() => false);
    },
    getValueForm: async () => {
      return form
        .validateFields()
        .then(async (values) => {
          values = convertFormValue(columns, values, form);
          return values;
        })
        .catch(() => false);
    },
  });

  const handleEdit = async (item = {}, firstChange = false) => {
    set_firstChange(firstChange);
    !!firstRun && (await firstRun(item));

    if (item && item.id && GetById) {
      setIsLoading(true);
      const { data } = await GetById(item.id, parentID(), item);
      item = { ...item, ...data };
      setIsLoading(false);
    }
    await handleShow(item);
  };
  const handleDelete = async (id, item) => {
    Delete && (await Delete(id, parentID(), item));
    handleChange && (await handleChange());
  };

  return [
    handleEdit,
    () =>
      Modal((data) => (
        <Form
          {...propForm}
          onFirstChange={() => set_firstChange(true)}
          values={data}
          form={form}
          columns={columns}
          readOnly={readOnly}
          // textSubmit={textSubmit}
        />
      )),
    handleDelete,
    form,
  ];
};
export default Hook;

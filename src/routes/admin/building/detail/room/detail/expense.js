import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';

import { ExpenseRoomService } from 'services/room';
import { roomExpensesForm, RoomExpensesSelectForm, roomExpensesFormTable } from 'columns/building/room';
import { CostServices } from 'services/mt-cost';
import './index.less';

const Expense = ({ isLoading, setIsLoading, roomId, key, permissions }) => {
  const { t } = useTranslation();
  const [editExpenseForm, setEditExpenseForm] = useState({});
  const [expensesList, setExpensesList] = useState([]);
  const [value, setValue] = useState(null);
  // const [show, setShow] = useState(true);
  // useEffect(() => {
  //   console.log('fhdg',show);
  // }, [show]);
  // console.log(expensesList);
  // console.log(value);
  // console.log(editExpenseForm, 123);
  const getlistCost = async () => {
    if (roomId) {
      const res = await CostServices.get();
      // console.log(res);
      setExpensesList(
        res.map((ele) => {
          return { ...ele, label: ele.name, value: ele.id };
        }),
      );
    }
  };
  useEffect(() => {
    if (Object.keys(editExpenseForm).length !== 0) handleEditSelectExpenseForm(editExpenseForm, true);
  }, [editExpenseForm]);
  
  useEffect(() => {
    key === '2' && roomId && handleChangeRoomExpenses() && getlistCost();
  }, [key]);
  useEffect(() => {
    const data = formFetchDataForm.getFieldValue('name');
    if (data === 'Nước' && value === 'm³') {
      return formFetchDataForm.setFieldsValue({ statusPayment: 'PAYMENTBF' });
    } else if (data === 'Nước' && value === 'nguoi') {
      return formFetchDataForm.setFieldsValue({ statusPayment: 'PAYMENTAT' });
    } else if (data === 'Dịch vụ cơ bản') {
      return formFetchDataForm.setFieldsValue({ statusPayment: 'PAYMENTAT' });
    } else if (data === 'Điện') {
      return formFetchDataForm.setFieldsValue({ statusPayment: 'PAYMENTAT' });
    } else if (data === 'Xe') {
      return formFetchDataForm.setFieldsValue({ statusPayment: 'PAYMENTBF' });
    }
  });

  const [handleEditSelectExpenseForm, SelectExpenseHookForm, , formFetchDataForm] = HookModalForm({
    title: (data) => {
      if (data)
        return data.id === 0 || data.id
          ? t('routes.admin.building.detail.room.detail.expenses.Update cost information')
          : t('routes.admin.building.detail.room.detail.expenses.Create new cost information');
    },
    isLoading,
    setIsLoading,
    idElement: 'selectExpenseForm',
    className:'selectExpenseForm',
    handleChange: async () => await handleChangeRoomExpenses(),
    columns: RoomExpensesSelectForm({
      t,
      expensesList,
      setEditExpenseForm,
      setValue,
      // show,
      // setShow,
    }),
    Post: async (value) => await ExpenseRoomService.post({ value, roomId, t }),
    widthModal: 650,
  });

  const [handleEditRoomExpenses, roomExpensesModal] = HookModalForm({
    title: (data) => {
      if (data)
        return data.id === 0 || data.id
          ? t('routes.admin.building.detail.room.detail.expenses.Update cost information')
          : t('routes.admin.building.detail.room.detail.expenses.Create new cost information');
    },
    idElement: 'expenseForm',
    isLoading,
    setIsLoading,
    handleChange: async () => await handleChangeRoomExpenses(),
    columns: roomExpensesForm({ t }),
    Post: async (value) => await ExpenseRoomService.post({ value, roomId, t }),
    Put: async (value, id) => {
      value = { ...value, id };
      return await ExpenseRoomService.put({ value, roomId, t });
    },
    parentID: () => roomId,
    widthModal: 650,
  });

  const [handleChangeRoomExpenses, roomExpensesTable] = HookDataTable({
    loadFirst: false,
    isLoading,
    setIsLoading,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: async (params, id) => await ExpenseRoomService.get(params, id),
    id: () => roomId,
    columns: roomExpensesFormTable({
      t,
      handleEdit: handleEditRoomExpenses,
      handleDelete: async (value) => (await ExpenseRoomService.delete({ roomId, value })) && handleChangeRoomExpenses(),
      permissions,
      // show,
    }),
    pageSizeOptions: [5, 10, 20],
    save: false,
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          {permissions?.THEM_QUAN_LY_CHI_PHI_PHONG && (
            <button
              className="bg-blue-500 text-white px-5 py-3 mr-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
              onClick={() => handleEditSelectExpenseForm()}
            >
              <i className="las la-plus mr-1" />
              {t('routes.admin.Layout.Add from list')}
            </button>
          )}
          {permissions?.THEM_QUAN_LY_CHI_PHI_PHONG && (
            <button
              className="bg-blue-500 btn-add text-white px-5 py-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
              onClick={() => handleEditRoomExpenses()}
            >
              <i className="las la-plus mr-1" />
              {t('routes.admin.Layout.Add')}
            </button>
          )}
        </div>
      </Fragment>
    ),
  });

  return [
    handleChangeRoomExpenses,
    () => (
      <Fragment>
        {permissions?.XEM_QUAN_LY_CHI_PHI_PHONG && roomExpensesTable()}
        {roomExpensesModal()}
        {SelectExpenseHookForm()}
      </Fragment>
    ),
  ];
};

export default Expense;

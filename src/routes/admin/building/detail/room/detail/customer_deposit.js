import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import { ColumnCustomerDeposit } from 'columns/building/room';
import { CustomerService } from 'services/room';

const CustomerDeposit = ({ isLoading, setIsLoading, idBuilding, formatDate, roomId, key, permissions }) => {
  const { t } = useTranslation();
  useEffect(() => {
    key === '10' && roomId && handleCustomerDepositChange();
  }, [key]);

  const [handleEditCustomerRent, ModalCustomerRent] = HookModalForm({
    title: (data) => {
      if (data)
        return data.id === 0 || data.id
          ? t('columns.admin.customer.Update Customer Deposit')
          : t('columns.admin.customer.Create Customer Deposit');
    },
    isLoading,
    setIsLoading,
    idElement: 'customer-rent-form',
    handleChange: async () => {
      await handleCustomerDepositChange();
    },
    columns: ColumnCustomerDeposit({
      t,
      formatDate,
    }),
    Post: async (value) => await CustomerService.post({ value: { ...value, customerType: 'BOOKER' }, roomId, t }),
    Put: async (value, id) => await CustomerService.put({ value: { ...value, id, customerType: 'BOOKER' }, roomId, t }),
    GetById: async (params) => {
      if (roomId) {
        const res = await CustomerService.getDetail(params, roomId);
        res.data = { ...res.data, jobSelect: res.data.job };
        return res;
      }
    },
    parentID: () => roomId,
    widthModal: 800,
  });
  const [handleCustomerDepositChange, RoomCustomerDepositTable] = HookDataTable({
    loadFirst: false,
    isLoading,
    save: false,
    setIsLoading,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: async (params) => {
      if (key === '10' && roomId) {
        return await CustomerService.getDeposit({ params, roomId });
      }
      return { data: [], count: 0 };
    },
    columns: ColumnCustomerDeposit({
      t,
      formatDate,
      handleEdit: handleEditCustomerRent,
      handleDelete: async (value) =>
        (await CustomerService.delete({ roomId, value, t })) && handleCustomerDepositChange(),
      permissions,
    }),
    idElement: 'room-customer-rent',
  });
  return [
    handleCustomerDepositChange,
    () => (
      <Fragment>
        {permissions?.XEM_QUAN_LY_KHACH_COC_PHONG && RoomCustomerDepositTable()}
        {ModalCustomerRent()}
      </Fragment>
    ),
  ];
};

export default CustomerDeposit;

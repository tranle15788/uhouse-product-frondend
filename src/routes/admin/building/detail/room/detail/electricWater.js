import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import moment from 'moment';
import Electricawater from 'services/room/electricawater';
import { ColumnElectricAwater, ColumnElectricAwaterFormCreate, ColumnDetail } from 'columns/building/room';
import { formatNumber } from 'utils';
import mappingElectric from '../mappingdata/electricWater';

const ElectricAWater = ({ isLoading, setIsLoading, roomId, key, permissions }) => {
  const { t } = useTranslation();
  const [Electricity, setEditExpenseFormElectric] = useState(null);
  const [Water, setEditExpenseFormWater] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const [CreateFormJSX, showCreateForm] = ColumnDetail();
  const [ElectricUsed, setElectricUsed] = useState(null);
  const [WaterUsed, setWaterUsed] = useState(null);
  const [rentalContractId, setRentalContractId] = useState(null);
  const [, set_total] = useState(0);

  useEffect(() => {
    key === '8' && roomId && handleChangeRoomElectricAwater();
  }, [key, roomId]);

  useEffect(() => {
    if (WaterUsed !== undefined && ElectricUsed !== undefined) {
      const data = formFetchData && formFetchData.getFieldsValue('indexUsedElectric');
      Electricity &&
        formFetchData &&
        formFetchData.setFieldsValue({
          priceElectric: Number(Electricity?.unitPrice),
          amountElectric: Number(data.indexUsedElectric) * Number(Electricity?.unitPrice),
          roomCodeIdElectric: Electricity.id,
          totalAmount:
            Number(Electricity?.unitPrice * data?.indexUsedElectric) + Number(data?.priceWater * data?.indexUsedWater),
        });
    }
  }, [Electricity, Water, ElectricUsed]);

  useEffect(() => {
    if (WaterUsed !== undefined && ElectricUsed !== undefined) {
      const data = formFetchData && formFetchData.getFieldsValue('indexUsedWater');
      Water &&
        formFetchData &&
        formFetchData.setFieldsValue({
          priceWater: formatNumber(Water.unitPrice),
          amountWater: Number(data?.indexUsedWater) * Number(Water?.unitPrice),
          roomCodeIdWater: Water.id,
          totalAmount:
            Number(Water?.unitPrice * data?.indexUsedWater) + Number(data?.priceWater * data?.indexUsedElectric),
        });
    }
  }, [Water, Electricity, WaterUsed]);

  useEffect(() => {
    const data = formFetchData && formFetchData.getFieldsValue('indexUsedWater');
    Electricity &&
      Water &&
      formFetchData &&
      formFetchData.setFieldsValue({
        totalAmount:
          Number(data?.indexUsedWater * Water?.unitPrice) + Number(data?.indexUsedElectric * Electricity?.unitPrice),
      });
  }, [Electricity, Water]);

  const [handleEditRoomElectricWater, roomElectricWaterModal, , formFetchData] = HookModalForm({
    title: (data) => {
      if (data) return data.id === 0 || data.id ? t('Chỉnh sửa chỉ số điện nước') : t('Tạo mới chỉ số điện nước');
    },
    idElement: 'electricWaterForm',
    isLoading,
    setIsLoading,
    handleChange: async () => await handleChangeRoomElectricAwater(),

    columns: ColumnElectricAwaterFormCreate({
      t,
      expensesList,
      setEditExpenseFormElectric,
      setEditExpenseFormWater,
      setElectricUsed,
      setWaterUsed,
    }),
    className: 'electricWater',
    Post: async (value) => {
      const test = mappingElectric.WebToServer({
        ...value,
        rentalContractId: rentalContractId.id,
      });
      return await Electricawater.createElectricWater({ ...test });
    },
    Put: async (value, id) => {
      const test = mappingElectric.WebToServer({ ...value, rentalContractId: rentalContractId.id });
      return await Electricawater.updateElectricWater({ ...test }, id);
    },
    widthModal: 650,
  });

  const [handleChangeRoomElectricAwater, roomElectricWaterTable] = HookDataTable({
    loadFirst: false,
    isLoading,
    setIsLoading,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: async (params, roomId) => {
      if (key.toString() === '8' && roomId) {
        const { data, count } = await Electricawater.get(params, roomId);
        set_total(count);
        return { data, count };
      } else {
        return { data: [], count: 0 };
      }
    },
    columns: ColumnElectricAwater({
      t,
      handleEdit: handleEditRoomElectricWater,
      mapping: mappingElectric.serverToWeb,
      handleDelete: async (value) => {
        const id = value.id;
        (await Electricawater.delete({ id, ...value })) && handleChangeRoomElectricAwater();
      },
      showCreateForm,
      roomId,
      expensesList,
    }),
    onRow: (record) => ({
      onDoubleClick: () => showCreateForm(record.id),
    }),
    id: () => roomId,
    save: false,
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          <button
            //  disabled={total === 0}
            className="btn-add text-white px-5 py-3 rounded-xl inline-flex items-center bg-blue-500 "
            onClick={async (value) => {
              if (roomId) {
                const res = await Electricawater.getListElectricityWater(roomId);
                setRentalContractId(res.data.rentalContract && res.data.rentalContract);
                setExpensesList(
                  res.data.cost &&
                    res.data.cost.map((ele) => {
                      return { ...ele, label: ele.description + '/' + formatNumber(ele.unitPrice), value: ele.id };
                    }),
                );
                await handleEditRoomElectricWater({
                  firstIndexElectric: Math.floor(res.data.electricityFirstIndex).toString(),
                  date: moment(),
                  firstIndexWater: Math.floor(res.data.waterFirstIndex).toString(),
                });
              }
            }}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        </div>
      </Fragment>
    ),
  });

  return [
    handleChangeRoomElectricAwater,
    () => (
      <Fragment>
        {roomElectricWaterTable()}
        {roomElectricWaterModal()}
        {CreateFormJSX()}
      </Fragment>
    ),
  ];
};

export default ElectricAWater;

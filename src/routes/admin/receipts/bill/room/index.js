import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import { ColumnBillList, ColumnFetchDataForm, ColumnFetchEditForm } from 'columns/receipt';
import { billService } from 'services/receipt';
import CreateForm from './create-form';
import { useNavigate } from 'react-router';
import { routerLinks } from 'utils';
import { RoomService } from 'services/room';

const Component = ({ isLoading, setIsLoading, key, building, roomId, buildingList }) => {
  const { t } = useTranslation();
  const [roomNumberList, set_roomNumberList] = useState(null);
  const [billCode, set_billCode] = useState(null);
  const refTimeout = useRef();
  const navigate = useNavigate();

  const [CreateFormJSX, showCreateForm] = CreateForm({
    Post: async (data_temp) => {
      const data = await billService.create(data_temp);
      data && handleChangeBillTable();
    },
  });

  const getRoomList = async () => {
    const data = await RoomService.roomManagement.getBuildingRoomList({ page: 0, perPage: 0 }, 'id', building.id);
    set_roomNumberList(
      data.data.map((ele) => {
        return { value: ele.id, label: ele.roomNumber };
      }),
    );
  };

  useEffect(async () => {
    clearTimeout(refTimeout.current);
    refTimeout.current = setTimeout(async () => {
      key === '1' && (await handleChangeBillTable());
      key === '1' && building && (await getRoomList());
    }, 200);
  }, [building, key]);

  useEffect(() => {
    billCode && formFetchDataForm && formFetchDataForm.setFieldsValue({ noticeCode: billCode?.code });
  }, [billCode]);

  useEffect(() => {
    roomNumberList && formFetchDataForm && formFetchDataForm.setFieldsValue({ roomNumber: '', noticeCode: '' });
  }, [roomNumberList]);

  const [handleShowFetchDataForm, FetchDataForm, , formFetchDataForm] = HookModalForm({
    title: (data) => t('Thêm mới phiếu thu tiền phòng'),
    isLoading,
    setIsLoading,
    columns: ColumnFetchDataForm({
      t,
      buildingList,
      roomNumberList,
      set_roomNumberList,
      set_billCode,
    }),
    Post: async (value) => {
      console.log(value, 123);
      const { data } = await billService.getDataMaster(value?.noticeCode);
      data &&
        showCreateForm({
          //  ...data,
          // date:new Date(),
          code: data?.code,
          housingExpenseCode: data?.housingExpenseCode,
          roomNumber: data?.roomNumber,
          renterName: data?.renterName,
          numberOfTenants: Number(data?.numberOfTenants),
          rentalPrice: Number(data?.rentalPrice),
          depositPrice: Number(data?.depositPrice),
          depositAmountReceived: Number(data?.depositAmountReceived),
          totalAmount: Number(data?.totalAmount),
          // depositPrice:Number(formatNumber(data.depositPrice?data.depositPrice:0)),
          // rentalPrice:Number(formatNumber(data.rentalPrice?data.rentalPrice:0)),
          // depositAmountReceived:Number(formatNumber(data.depositAmountReceived?data.depositAmountReceived:0)),
          // rentalPrice:Number(data.rentalPrice?data.rentalPrice:0),
          // depositAmountReceived:Number(data.depositAmountReceived?data.depositAmountReceived:0),
        });
    },
    widthModal: 600,
  });

  const [handleShowFetchEditForm, FetchEditFormJSX] = HookModalForm({
    title: (data) => t('Chỉnh sửa phiếu thu tiền phòng'),
    isLoading,
    setIsLoading,
    columns: ColumnFetchEditForm({
      t,
      buildingList,
      roomNumberList,
      set_roomNumberList,
      set_billCode,
    }),
    Post: () => showCreateForm(),
    widthModal: 600,
  });

  const [handleChangeBillTable, BillTableJSX] = HookDataTable({
    loadFirst: false,
    isLoading,
    setIsLoading,
    save: false,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: async (params) => {
      if (building?.id) {
        const { data, count } = await billService.getList(building.id, params);
        return { data, count };
      } else {
        return { data: [], count: 0 };
      }
    },
    columns: ColumnBillList({
      t,
      handleShowFetchEditForm,
      handleSendMail: async (data) => {
        await billService.sendMail(data.code);
        handleChangeBillTable();
      },
    }),

    onRow: (record) => ({
      onDoubleClick: () => navigate(`${routerLinks('bill')}?type=room`, { state: record.code }),
    }),
    // parentID: () => building,
    idElement: 'building-rules',
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => handleShowFetchDataForm({ building: building?.name }, true)}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        </div>
      </Fragment>
    ),
  });

  return [
    handleChangeBillTable,
    () => (
      <Fragment>
        {/* {buildingList[0]?.label} */}
        {BillTableJSX()}
        {FetchDataForm()}
        {CreateFormJSX()}
        {FetchEditFormJSX()}
      </Fragment>
    ),
  ];
};

export default Component;

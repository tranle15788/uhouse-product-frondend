import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import { ColumnBillDeposit, ColumEditDeposit, ColumnFetchDataForm } from 'columns/receipt';
import { billdeposit } from 'services/receipt';
import { useNavigate } from 'react-router';
import CreateForm from './create';
import Warning from './warning';
import { routerLinks } from 'utils';
import { RoomService } from 'services/room';
const Component = ({ isLoading, setIsLoading, building, key, buildingList, permissions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [roomNumberList, set_roomNumberList] = useState(null);
  const [billCode, set_billCode] = useState(null);
  const [CreateFormJSX, showCreateForm] = CreateForm({
    Post: async (data_temp) => {
      const data = await billdeposit.create(data_temp);
      data && handleChangeBillDepositTable();
    },
  });
  const [WarningJSX] = Warning();

  const getRoomList = async () => {
    const data = await RoomService.roomManagement.getBuildingRoomList({ page: 0, perPage: 0 }, 'id', building.id);
    set_roomNumberList(
      data.data.map((ele) => {
        return { value: ele.id, label: ele.roomNumber };
      }),
    );
  };
  useEffect(() => {
    key === '2' && building && handleChangeBillDepositTable() && getRoomList();
  }, [building, key]);

  useEffect(() => {
    billCode && formFetchDataForm && formFetchDataForm.setFieldsValue({ noticeCode: billCode?.code });
  }, [billCode]);

  useEffect(() => {
    roomNumberList && formFetchDataForm && formFetchDataForm.setFieldsValue({ roomNumber: '', ContractCode: '' });
  }, [roomNumberList]);

  const [handleShowFetchDataForm, FetchDataForm, , formFetchDataForm] = HookModalForm({
    title: (data) => t('Thêm mới phiếu thu tiền cọc'),
    isLoading,
    setIsLoading,
    // handleChange: async () => await handleChangeBillTable(),
    columns: ColumnFetchDataForm({
      t,
      buildingList,
      roomNumberList,
      set_roomNumberList,
      set_billCode,
    }),
    widthModal: 600,
    Post: async (value) => {
      const { data } = await billdeposit.getDataMaster(value.noticeCode);
      console.log('data tien coc', data);
      showCreateForm({
        ...data,
        // depositPrice:Number(formatNumber(data.depositPrice?data.depositPrice:0)),
        // rentalPrice:Number(formatNumber(data.rentalPrice?data.rentalPrice:0)),
        // depositAmountReceived:Number(formatNumber(data.depositAmountReceived?data.depositAmountReceived:0)),
        // rentalPrice:Number(data.rentalPrice?data.rentalPrice:0),
        // depositAmountReceived:Number(data.depositAmountReceived?data.depositAmountReceived:0),
      });
    },
    textSubmit: t('Tạo phiếu thu'),
  });

  const [handleShowFetchEditForm, FetchEditFormJSX] = HookModalForm({
    title: (data) => t('Chỉnh sửa phiếu thu tiền cọc'),
    isLoading,
    setIsLoading,
    columns: ColumEditDeposit({
      t,
    }),
    widthModal: 600,
    Post: () => showCreateForm(),
  });

  const [handleChangeBillDepositTable, BillDepositTableJSX] = HookDataTable({
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
      if (key === '2' && building) {
        const { data } = await billdeposit.getList(building.id, params);
        return { data };
      } else return { data: [], count: 0 };
    },
    columns: ColumnBillDeposit({
      t,
      handleShowFetchEditForm,
      handleSendMail: async (data) => {
        await billdeposit.sendMail(data.code);
        handleChangeBillDepositTable();
      },
    }),

    onRow: (record) => ({
      onDoubleClick: () => navigate(`${routerLinks('bill')}?type=deposit`, { state: record.code }),
    }),
    // parentID: () => idBuilding,
    idElement: 'building-rules',
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => handleShowFetchDataForm({ building: building?.name }, true)}
            // roomNumber: "1", ContractCode: "1"
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        </div>
      </Fragment>
    ),
  });

  return [
    handleChangeBillDepositTable,
    () => (
      <Fragment>
        {building && BillDepositTableJSX()}
        {FetchDataForm()}
        {CreateFormJSX()}
        {WarningJSX()}
        {FetchEditFormJSX()}
      </Fragment>
    ),
  ];
};

export default Component;

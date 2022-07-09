import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import { useNavigate } from 'react-router';
import { ColumnNotice, ColumnRoomNoticeList, ColumnEditNotice } from 'columns/receipt';
import CreateForm from './create-form';
import { noticeService } from 'services/receipt';
import { RoomService } from 'services/room';
import mapping from './mapping';
import { useAuth } from 'global';
import { routerLinks } from 'utils';

const Component = ({ isLoading, setIsLoading, key, permissions, building, buildingList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { formatDate } = useAuth();
  const [, set_noticeCode] = useState(null);
  const [roomNumberList, set_roomNumberList] = useState(null);
  const [CreateFormJSX, showCreateForm] = CreateForm({
    Post: async (data_temp) => {
      const data = await noticeService.create(data_temp);
      data && handleChangeNoticeTable();
    },
    Put: async (data_temp) => {
      const data = await noticeService.edit(data_temp.code, data_temp);
      data && handleChangeNoticeTable();
    },
  });

  // const getNoticeList = async () => {
  //   setNoticeList([{ value: 1, label: "Tòa nhà 1" }, { value: 2, label: "Tòa nhà 2" }]);
  // }

  const getRoomList = async () => {
    const data = await RoomService.roomManagement.getBuildingRoomList({ page: 0, perPage: 0 }, 'id', building.id);
    set_roomNumberList(
      data.data.map((ele) => {
        return { value: ele.id, label: ele.roomNumber };
      }),
    );
  };

  useEffect(() => {
    key === '1' && building && handleChangeNoticeTable();
    key === '1' && building && getRoomList();
  }, [building, key]);

  useEffect(() => {
    roomNumberList && formFetchDataForm && formFetchDataForm.setFieldsValue({ roomNumber: '' });
  }, [roomNumberList]);

  const [handleCreateNotice, ModalFormCreateNotice, , formFetchDataForm] = HookModalForm({
    title: (data) => t('routes.admin.receipt.notice.Create a notice of room charge'),
    isLoading,
    setIsLoading,
    columns: ColumnNotice({
      t,
      buildingList,
      roomNumberList,
      set_roomNumberList,
      set_noticeCode,
      permissions,
    }),
    widthModal: 600,
    Post: async (value) => {
      const data = await noticeService.getdataMaster(value.roomNumber);
      data &&
        showCreateForm({
          ...mapping.serverToWeb(data.data),
          date: new Date(),
        });
    },
    textSubmit: t('routes.admin.receipt.notice.Create a notice'),
  });

  const [handleEditNotice, ModalFormEditNotice] = HookModalForm({
    title: (data) => t('routes.admin.receipt.notice.Edit a notice of room charge'),
    isLoading,
    setIsLoading,
    columns: ColumnEditNotice({
      t,
      permissions,
    }),
    widthModal: 600,
    Put: async (value, id, parentID, data_put) => {
      data_put = {
        ...data_put,
        ...value,
        status: value?.status,
      };
      // console.log("getDetailgfdgdfhg", value, data_put);
      let { data } = await noticeService.getDetail(data_put.code);
      data = {
        ...data,
        status: data_put?.status,
      };
      // console.log("getDetail", data?.status)
      showCreateForm({
        ...mapping.serverToWeb(data),
      });
    },
    textSubmit: t('Chỉnh sửa chi tiết'),
  });

  const [handleChangeNoticeTable, NoticeTableJSX] = HookDataTable({
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
      const data = await noticeService.getList(building.id, params);
      return data;
    },
    columns: ColumnRoomNoticeList({
      t,
      permissions,
      handleEdit: (data) =>
        handleEditNotice(
          { ...data, building: building.name, roomNumber: data.room.roomNumber, noticeStatus: data.status },
          true,
        ),
      handleSendMail: async (data) => {
        await noticeService.sendMail(data.code);
        handleChangeNoticeTable();
      },
      formatDate,
    }),

    onRow: (record) => ({
      onDoubleClick: () => navigate(`${routerLinks('notice')}?type=room`, { state: record.code }),
    }),
    idElement: 'building-rules',
    rightHeader: (
      <Fragment>
        <div className="flex">
          <button
            className="bg-blue-500 text-white px-4 py-2.5 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={async () => {
              navigate('/receipt/mass-notice');
            }}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.receipt.notice.Create new batch')}
          </button>
          <button
            className="ml-5 bg-blue-500 text-white px-4 py-2.5 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => handleCreateNotice({ building: building.name }, true)}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        </div>
      </Fragment>
    ),
  });

  return [
    handleChangeNoticeTable,
    () => (
      <Fragment>
        {/* {building && NoticeTableJSX()} */}
        {NoticeTableJSX()}
        {ModalFormCreateNotice()}
        {ModalFormEditNotice()}
        {CreateFormJSX()}
      </Fragment>
    ),
  ];
};

export default Component;

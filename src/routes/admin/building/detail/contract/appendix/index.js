import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import buildService from 'services/building/building';
import { RoomService } from 'services/room';
import { useLocation, useNavigate } from 'react-router';
import { ColumnAppendixFormCreate, ColumnAppendixFormInfo, ColumnAddendumTable } from 'columns/building/room/contract';
import { useAuth } from 'global';

import moment from 'moment';
import { appandixContract } from 'services/contract';
import Preview from '../preview';
import mapping from './mapping';

const AppendixFurniture = ({ isLoading, setIsLoading, keyContract, idBuilding }) => {
  const { t } = useTranslation();
  const [buildingDetail, setBuildingDetail] = useState(null);
  const [listRoomNumber, setListRoomNumber] = useState(null);
  const [rentalCodeAvailable, setRentalCodeAvailable] = useState(null);
  const roomId = useRef(null);
  const history = useLocation();
  const { formatDate } = useAuth();
  const navigate = useNavigate();

  const getBuildingContractData = async () => {
    const res = await buildService.buildingManagement.getBuildingDetail(idBuilding);
    setBuildingDetail(res.data);
    const roomCode = await RoomService.roomManagement.getBuildingRoomList({ page: 0, perPage: 0 }, 0, idBuilding);
    setListRoomNumber(
      roomCode.data.map((ele) => {
        return { ...ele, value: ele.id, label: ele.roomNumber, id: ele.id };
      }),
    );
  };

  useEffect(() => {
    keyContract === '4' && handleChangeAddendumContract();
    idBuilding && keyContract === '4' && getBuildingContractData();
  }, [keyContract, idBuilding]);

  useEffect(() => {
    formChooseTemp && formChooseTemp.setFieldsValue({ rentalContractCode: rentalCodeAvailable || '' });
  }, [rentalCodeAvailable]);

  const [PreviewJSX, handleShowPreview] = Preview({ onOK: () => {}, typeContract: 'extention' });
  // formChooseTemp
  const [handleEditTempleContract, TempleContractModal, , formChooseTemp] = HookModalForm({
    title: () => t('Tạo phụ lục'),
    isLoading,
    setIsLoading,
    textSubmit: t('Tạo hợp đồng'),
    handleChange: async () => handleChangeAddendumContract(),
    columns: ColumnAppendixFormInfo({
      t,
      listRoomNumber,
      setRentalCodeAvailable,
    }),
    className: 'TempleContract',
    Post: async (value) => {
      const { data } = await appandixContract.getMasterContract(value.rentalContractCode);
      handleShowFormInfo({
        ...data,
        effectiveDate: new Date(),
        lessor: { ...data?.lessor, icDate: moment(data?.lessor?.icDate).format(formatDate) },
        tenant: { ...data?.tenant, icDate: moment(data?.tenant?.icDate).format(formatDate) },
        createdDate: new Date(),
        rentalCode: value?.rentalContractCode,
        numberOfContracts: '2',
        eachSideNumber: '1',
      });

      setRentalCodeAvailable(null);
    },
    widthModal: 1000,
  });

  const [handleShowFormInfo, ShowFormInfo] = HookModalForm({
    title: (data) => {
      return data.id === 0 || data.id ? t('Cập nhật phụ lục hợp đồng gia hạn') : t('Thêm mới phụ lục hợp đồng gia hạn');
    },
    isLoading,
    setIsLoading,
    textSubmit: t('Lưu phụ lục'),
    checkHidden: true,
    handleChange: async () => handleChangeAddendumContract(),
    columns: ColumnAppendixFormCreate({
      t,
      buildingDetail,
      formatDate,
    }),
    className: 'contract-room',
    customFooter: (handleOk, handleCancel, getValueForm) => (
      <div>
        <div className="flex justify-end">
          <button
            className="bg-blue-300 px-4 py-2.5 rounded-xl hover:bg-blue-500 hover:text-white mr-2 btn-cancel"
            onClick={handleCancel}
          >
            {t('components.form.modal.cancel')}
          </button>
          <button
            className="bg-blue-300 px-4 py-2.5 rounded-xl hover:bg-blue-500 hover:text-white mr-2 btn-cancel"
            onClick={async () => {
              const data = await getValueForm();
              handleShowPreview(data);
            }}
          >
            {t('Xem trước')}
          </button>
          {PreviewJSX()}
          <button
            className="bg-blue-300 px-4 py-2.5 rounded-xl hover:bg-blue-500 hover:text-white mr-2 btn-cancel"
            onClick={handleOk}
          >
            {t('Lưu lại')}
          </button>
        </div>
      </div>
    ),
    Post: async (value) => {
      return await appandixContract.post(mapping.webToServer(value));
    },
    Put: async (value, id, parentID, data) => {
      return await appandixContract.put(mapping.webToServer(value), value.code);
    },
    widthModal: 1000,
  });

  const [handleChangeAddendumContract, AddendumContractTable] = HookDataTable({
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
      if (keyContract.toString() === '4' && idBuilding) {
        return await appandixContract.getListAddendumContract(params, idBuilding);
      } else {
        return { data: [], count: 0 };
      }
    },
    id: () => roomId.current,
    columns: ColumnAddendumTable({
      t,
      handleEdit: handleShowFormInfo,
      URLnavi: history.pathname,
      mapping: mapping.serverToWeb,
    }),
    onRow: (record) => ({
      onDoubleClick: () =>
        navigate(`contract?type=appendix&code=${record.code}`, { state: { previewType: 'appendixContract' } }),
    }),
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => handleEditTempleContract({ nameBuilding: buildingDetail?.name, appendixType: 'extend' })}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        </div>
      </Fragment>
    ),
  });
  return [
    handleChangeAddendumContract,
    () => (
      <Fragment>
        {AddendumContractTable()}
        {TempleContractModal()}
        {ShowFormInfo()}
      </Fragment>
    ),
  ];
};

export default AppendixFurniture;

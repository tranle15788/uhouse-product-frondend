import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import {
  columnLiquidationCreateForm,
  columnLiquidationChooseTemplateForm,
  ColumnLiquidContract,
} from 'columns/building/room/contract';
import { LiquidatedContract } from 'services/contract/index';
import { useNavigate } from 'react-router';
import buildService from 'services/building/building';
import { RoomService } from 'services/room';
import { useAuth } from 'global';
import Preview from '../preview';
import mapping from './mapping';

const Liquidation = ({ isLoading, setIsLoading, keyContract, idBuilding }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [buildingDetail, setBuildingDetail] = useState(null);
  const [listRoomNumber, setListRoomNumber] = useState(null);
  const [rentalCodeAvailable, setRentalCodeAvailable] = useState(null);
  const [listRentalCodeAvailable, set_listRentalCodeAvailable] = useState(null);
  const { formatDate } = useAuth();
  useEffect(() => {
    keyContract === '3' && idBuilding && handleChangeLiquidationContract();
    idBuilding && keyContract === '3' && getBuildingContractData();
  }, [keyContract, idBuilding]);

  useEffect(() => {
    formChooseTemp && formChooseTemp.setFieldsValue({ rentalContractCode: rentalCodeAvailable || '' });
  }, [rentalCodeAvailable]);

  const [PreviewJSX, handleShowPreview] = Preview({ onOK: () => {}, typeContract: 'liquid' });

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
  // formChooseTemp
  const [editChooseTemplateForm, ChooseTemplateForm, , formChooseTemp] = HookModalForm({
    title: (data) => t('Tạo mới biên bản thanh lý'),
    isLoading,
    setIsLoading,
    textSubmit: t('Tạo biên bản'),
    handleChange: async () => handleChangeLiquidationContract(),
    columns: columnLiquidationChooseTemplateForm({
      t,
      listRoomNumber,
      buildingDetail,
      setRentalCodeAvailable,
      listRentalCodeAvailable,
      set_listRentalCodeAvailable,
    }),
    widthModal: 650,
    Post: async (value) => {
      const data = await LiquidatedContract.getMasterDataByCode(value.rentalContractCode);
      editLiquidationContractForm(mapping.serverToWeb({ ...data, signAddress: buildingDetail.address }, formatDate));
    },
  });

  const [editLiquidationContractForm, LiquidationContractForm] = HookModalForm({
    title: (data) => (data.id ? t('Chỉnh sửa biên bản thanh lý') : t('Tạo mới hợp đồng thanh lý')),
    isLoading,
    setIsLoading,
    textSubmit: t('Tạo'),
    handleChange: async () => handleChangeLiquidationContract(),
    columns: columnLiquidationCreateForm({
      t,
    }),
    className: 'liquidationCreating',
    widthModal: 1000,
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
      const data = mapping.webToServer(value);
      return await LiquidatedContract.createLiquidationContract(data);
    },
    Put: async (value) => {
      const data = mapping.webToServer(value);
      return await LiquidatedContract.updateLiquidationContract(data);
    },
  });

  const [handleChangeLiquidationContract, roomLiquidationTable] = HookDataTable({
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
      if (keyContract.toString() === '3' && idBuilding) {
        return await LiquidatedContract.getListLiquidatedContract(params, idBuilding);
      } else {
        return { data: [], count: 0 };
      }
    },
    columns: ColumnLiquidContract({
      t,
      editLiquidationContractForm,
      buildingDetail,
      mapping: mapping.serverToWeb,
    }),
    onRow: (record) => ({
      onDoubleClick: () =>
        navigate(`contract?type=liquidated&code=${record.code}`, { state: { previewType: 'liquidatedContract' } }),
    }),
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => {
              setRentalCodeAvailable('');
              editChooseTemplateForm({ buildingName: buildingDetail?.name }, true);
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
    handleChangeLiquidationContract,
    () => (
      <Fragment>
        {roomLiquidationTable()}
        {ChooseTemplateForm()}
        {LiquidationContractForm()}
      </Fragment>
    ),
  ];
};

export default Liquidation;

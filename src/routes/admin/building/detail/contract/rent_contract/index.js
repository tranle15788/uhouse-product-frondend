import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import { ColumnRentalFormInfo, ColumnRentalFormCreate, ColumnRentalTable } from 'columns/building/room/contract/index';
import { rentedContract } from 'services/contract';
import buildService from 'services/building/building';
import { RoomService } from 'services/room';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from 'utils';
import mapping from './mapping';
import './index.less';

const RentContract = ({ isLoading, setIsLoading, keyContract, setEditContract, idBuilding }) => {
  const { t } = useTranslation();
  const [buildingDetail, setBuildingDetail] = useState(null);
  const [listRoomNumber, setListRoomNumber] = useState(null);
  const [listContractCodeDeposit, setListContractCodeDeposit] = useState([]);
  const contractCode = useRef(null);
  const roomNumber = useRef(null);
  const history = useLocation();
  const navigate = useNavigate();

  const getBuildingContractData = async () => {
    const buildingInfo = await buildService.buildingManagement.getBuildingDetail(idBuilding);
    setBuildingDetail(buildingInfo.data);
    const listRoomNumber = await RoomService.roomManagement.getBuildingRoomList({ page: 0, perPage: 0 }, 0, idBuilding);
    listRoomNumber.data &&
      setListRoomNumber(
        listRoomNumber.data.map((ele) => {
          return { ...ele, value: ele.id, label: ele.roomNumber };
        }),
      );
  };

  const getListDepositContractCodeRoom = async (value) => {
    const { data } = await rentedContract.getListDepositContractCodeRoom(value);
    setListContractCodeDeposit(
      setListContractCodeDeposit(
        data.map((ele) => {
          return {
            value: ele.id,
            label: ele.depositContractCode,
          };
        }),
      ),
    );
  };
  useEffect(() => {
    idBuilding && keyContract === '2' && getBuildingContractData();
    keyContract === '2' && handleChangeRentContract();
  }, [idBuilding, keyContract]);

  const [handleEditRentContract, roomRentContractModal] = HookModalForm({
    title: (data) =>
      data.id === 0 || data.id
        ? t('routes.admin.building.detail.room.detail.contract.Create new rent contract information')
        : t('routes.admin.building.detail.room.detail.contract.Update rent contract information'),
    isLoading,
    setIsLoading,
    textSubmit: t('Tạo hợp đồng'),
    handleChange: async () => handleChangeRentContract(),
    className: 'pay-rent-modal',
    columns: ColumnRentalFormInfo({
      buildingDetail,
      listRoomNumber,
      getListDepositContractCodeRoom,
      listContractCodeDeposit,
      t,
      contractCode,
      roomNumber,
    }),
    Put: async (value) => {
      const depositContractCode = contractCode?.current?.children;
      const { roomNumber: roomId } = value;
      const params = {
        [`${depositContractCode ? 'depositContractCode' : 'roomId'}`]: depositContractCode || roomId,
      };

      const { data } = await rentedContract.getCreateDataRentContract(params);
      if (!data) {
        return false;
      }
      data?.cost?.map((ele) => (ele.unitPrice = formatCurrency(Math.floor(ele.unitPrice).toString(), '')));
      const data_temp = mapping.serverToWeb({
        ...value,
        ...data,
        lessor: {
          ...data?.lessor,
          indentityCard: data?.lessor?.identityCard,
        },
        tenant: {
          ...data?.tenant,
          indentityCard: data?.tenant?.identityCard,
        },
        createdDate: new Date(),
        effectiveDate: new Date(),
        buildingName: buildingDetail.name,
        address: buildingDetail.address,
        numberOfTenants: data?.numberTenant,
        payFromDay: '01',
        payToDay: '03',
        punishFromDay: '04',
        amountPunishPerDay: '100000',
        limitLateDay: '05',
        terminateContractFromDay: '09',
      });
      handleShowRentContract(data_temp);
    },
    widthModal: 650,
  });

  const [handleShowRentContract, roomShowRentContractModal] = HookModalForm({
    title: (data) =>
      data.id === 0 || data.id
        ? t('routes.admin.building.detail.room.detail.contract.Update rent contract information')
        : t('routes.admin.building.detail.room.detail.contract.Create new rent contract information'),
    isLoading,
    setIsLoading,
    checkHidden: true,
    textSubmit: t('Lưu hợp đồng'),
    handleChange: async () => handleChangeRentContract(),
    columns: ColumnRentalFormCreate({
      t,
    }),
    className: 'contract-rent',
    Post: async (value, id) => {
      return await rentedContract.createDataRentalContract(
        mapping.webToServer({
          ...value,
          buildingId: idBuilding,
          depositContractId: contractCode.current.value,
        }),
      );
    },
    GetById: async (value, a, b) => {
      const { data } = await rentedContract.getRentalContractByCode(b.code);
      data?.cost.forEach((ele) => {
        ele.unitPrice = formatCurrency(Math.floor(ele.unitPrice).toString(), '');
      });
      return {
        data: mapping.serverToWeb(data),
      };
    },
    Put: async (value, id) => {
      const data = mapping.webToServer({ ...value, buildingId: idBuilding, depositContractId: id });
      return await rentedContract.updateContractRent(data);
    },
    widthModal: 1025,
  });

  const [handleChangeRentContract, roomRentContractTable] = HookDataTable({
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
      if (keyContract.toString() === '2' && idBuilding) {
        return await rentedContract.getListRentalContract(params, idBuilding);
      } else {
        return { data: [], count: 0 };
      }
    },
    columns: ColumnRentalTable({
      t,
      URLnavi: history.pathname,
      handleEdit: handleShowRentContract,
    }),
    onRow: (record) => ({
      onDoubleClick: () =>
        navigate(`contract?type=rental&code=${record.code}`, { state: { previewType: 'rentedContract' } }),
    }),
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => handleEditRentContract({ id: buildingDetail.id, nameBuilding: buildingDetail.name })}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        </div>
      </Fragment>
    ),
  });
  return [
    handleChangeRentContract,
    () => (
      <Fragment>
        {roomRentContractTable()}
        {roomRentContractModal()}
        {roomShowRentContractModal()}
      </Fragment>
    ),
  ];
};

export default RentContract;

import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModalForm } from 'hooks';
import { depositContract } from 'services/contract/index';
import {
  ColumnDepositFormInfo,
  ColumnDepositContract,
  ColumnDepositFormCreate,
} from 'columns/building/room/contract/index';
import buildService from 'services/building/building';
import { RoomService } from 'services/room';
import { useLocation } from 'react-router';
import mappingDeposit from '../mappingFunction/deposit';
import { useNavigate } from 'react-router-dom';
import './index.less';
import moment from 'moment';
const DepositContract = ({ isLoading, setIsLoading, expenses, keyContract, idBuilding }) => {
  const { t } = useTranslation();
  const [nameBuilding, setNameBuilding] = useState(null);
  const [listRoomNumber, setListRoomNumber] = useState(null);
  const roomId = useRef(null);
  const history = useLocation();
  const navigate = useNavigate();
  const [indentity, setValueIdentity] = useState(null);
  const [dataDeposit, setDataDeposit] = useState(null);
  const TimeoutID = useRef(null);
  console.log(dataDeposit);

  const getBuildingContractData = async () => {
    const res = await buildService.buildingManagement.getBuildingDetail(idBuilding);
    setNameBuilding(res.data);
    const roomCode = await RoomService.roomManagement.getBuildingRoomList({ page: 0, perPage: 0 }, 0, idBuilding);
    setListRoomNumber(
      roomCode.data.map((ele) => {
        return { ...ele, value: ele.roomNumber, label: ele.roomNumber, id: ele.id };
      }),
    );
  };
  const getIndentity = async () => {
    if (indentity) {
      const { data } = await depositContract.GetIndentity(indentity);
      setDataDeposit(data);
    }
  };
  useEffect(() => {
    indentity && getIndentity();
  }, [indentity]);
  useEffect(() => {
    if(dataDeposit?.identityCard === indentity){
      dataDeposit &&
      formFetchDataForm &&
      formFetchDataForm.setFieldsValue({
        depositContractPeople: dataDeposit?.name,
        depositorDateOfBirthday: moment(dataDeposit?.dateOfBirthday),
        depositorIcDate: moment(dataDeposit?.icDate),
        depositorEmail: dataDeposit?.email,
        depositorPhoneNumber: dataDeposit?.phoneNumber,
        depositorIcPlace: dataDeposit?.icPlace,
      });
    }

  });
  useEffect(() => {
    keyContract === '1' && handleChangeDepositContract() 
    idBuilding && keyContract === '1' && getBuildingContractData() 
  }, [keyContract, idBuilding]);

  const [handleEditTempleContract, TempleContractModal, ,] = HookModalForm({
    title: (data) => (data.id === 0 || data.id ? t('Cập nhật hợp đồng cọc') : t('Thêm mới hợp đồng cọc')),
    isLoading,
    setIsLoading,
    textSubmit: t('Tạo hợp đồng'),
    handleChange: async () => handleChangeDepositContract(),
    columns: ColumnDepositFormInfo({
      t,
      nameBuilding,
      listRoomNumber,
      roomId: (value) => {
        roomId.current = value;
      },
      setValueIdentity,
    }),
    className: 'TempleContract',
    Post: async (value) => {
      const data = await depositContract.getDepositContract(roomId.current);
      data?.cost.forEach((ele) => {
        ele.unitPrice = Math.floor(ele.unitPrice).toString();
      });
      console.log(data);
      console.log(data?.lessor?.dateOfBirthday);
      handleShowDipositHistory({
        roomDto: {
          roomNumber: data?.room?.roomNumber,
        },
        createdAt: new Date(),
        statusPayment: value.statusPayment === 'PAYMENT' ? 'Đã thanh toán' : 'Chờ thanh toán',
        depositContractCode: data?.code,
        address: data?.building?.address,
        aLessorName: data?.lessor?.name,
        aLessorDateOfBirthday: data?.lessor?.dateOfBirthday,
        aLessorIcDate: data?.lessor?.icDate,
        aLessorIcPlace: data?.lessor?.icPlace,
        aLessorAccountBank: data?.lessor?.accountBank,
        nameBanking: data?.lessor?.bank,
        aLessorIdentityCardNumber: data?.lessor?.identityCard,
        aLessorPhoneNumber: data?.lessor?.phoneNumber,
        aLessorEmail: data?.lessor?.email,
        roomDtoId: data?.room?.roomNumber,
        acreage: Math.floor(data?.room?.acreage).toString(),
        price: Math.floor(data?.room?.price).toString(),
        costList: data.cost ? data?.cost : [],
        depositNumber: Math.floor(data?.room?.deposit).toString(),
        // roomNumber:data?.roomDto.roomNumber
        note: ` Khi trao trả lại phòng thuê cho Bên A, khách hàng đồng thời phải bàn giao lại các thiết bị đang hoạt động tốt và hiện trạng phòng thuê được vệ sinh như lúc được nhận không gian thuê ban đầu.
 Mọi thay đổi, hư hỏng, mất mát, vệ sinh khách hàng phải chịu trách nhiệm sửa chữa, khắc phục như hiện trạng để Bên A kiểm tra đồng ý xác nhận thì khách hàng mới hoàn tất được việc giao trả không gian thuê và được nhận lại số tiền đã đặt cọc.`,
      });
    },
    widthModal: 1000,
  });

  const [handleShowDipositHistory, ShowDipositContractModal, , formFetchDataForm] = HookModalForm({
    title: (data) => (data.id === 0 || data.id ? t('Cập nhật hợp đồng cọc') : t('Thêm mới hợp đồng cọc')),
    isLoading,
    setIsLoading,
    checkHidden: true,
    textSubmit: t('Lưu hợp đồng'),
    handleChange: async () => handleChangeDepositContract(),
    columns: ColumnDepositFormCreate({
      t,
      nameBuilding,
      listRoomNumber,
      setValueIdentity,
      dataDeposit,
      TimeoutID,
    }),
    className: 'contract-room',
    GetById: async (params, a, item) => {
      return await depositContract.getDepositContractByCode(item.DepositContractCode);
    },
    Post: async (value) => {
      const test = mappingDeposit.webToServer(value, roomId.current);
      return await depositContract.createListDepositContract(test);
    },
    Put: async (values, id, parentID, data) => {
      const test = mappingDeposit.webToServer({ ...values, id: data.id }, roomId.current);
      return await depositContract.editDepositContract(test, data.id);
    },
    widthModal: 1000,
  });

  const [handleChangeDepositContract, DepositContractTable] = HookDataTable({
    loadFirst: false,
    isLoading,
    setIsLoading,
    save: false,
    onRow: (record) => ({
      onDoubleClick: () =>
        navigate(`contract?type=deposit&code=${record.depositContractCode}`, {
          state: { previewType: 'rentedContract' },
        }),
    }),
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: async (params) => {
      if (keyContract === '1' && idBuilding) {
        return await depositContract.getListDepositContract(params, idBuilding);
      } else {
        return {
          data: [],
          count: 0,
        };
      }
    },
    id: () => roomId.current,
    columns: ColumnDepositContract({
      t,
      handleEdit: handleShowDipositHistory,
      URLnavi: history.pathname,
    }),
    rightHeader: (
      <Fragment>
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => handleEditTempleContract({ nameBuilding: nameBuilding.name, statusPayment: 'PAYMENT' })}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        </div>
      </Fragment>
    ),
  });
  return [
    handleChangeDepositContract,
    () => (
      <Fragment>
        {DepositContractTable()}
        {TempleContractModal()}
        {ShowDipositContractModal()}
      </Fragment>
    ),
  ];
};

export default DepositContract;

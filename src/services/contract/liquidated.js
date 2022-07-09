import axios from 'axios';
import { routerLinks } from 'utils';
import { Message } from 'components';

const Liquidation = {
  nameLink_Liquidated: 'liquidated-contract',
  nameLink_Rental: 'rental-contract',

  // get list liquidated contract
  getListLiquidatedContract: async (params, idBuilding) => {
    try {
      const { data } = await axios.get(`${routerLinks(Liquidation.nameLink_Liquidated, 'api')}/list/${idBuilding}`, {
        params,
      });

      if (data.message) {
        Message.success(data.message);
      }
      return {
        data: data.data,
        count: data.total,
      };
    } catch (e) {
      console.log('err', e);
      Message.error(e?.response?.data?.message);
      return false;
    }
  },
  // lessor sign contract
  lessorSignContract: async (pageCode) => {
    try {
      const { data } = await axios.post(
        `${routerLinks(Liquidation.nameLink_Liquidated, 'api')}/${pageCode}/lessor-sign`,
      );
      if (data.message) {
        Message.success(data.message);
      }
      return true;
    } catch (e) {
      console.log('err', e);
      if (e.response.data.message) Message.error(e.response.data.message);
      return false;
    }
  },

  getLiquidatedContractByCode: async (pageCode) => {
    try {
      const { data } = await axios.get(`${routerLinks(Liquidation.nameLink_Liquidated, 'api')}/${pageCode}`);
      if (data.message) {
        Message.success(data.message);
      }
      return data;
    } catch (e) {
      console.log('err', e);
      if (e.response.data.message) Message.error(e.response.data.message);
      return false;
    }
  },
  getDetailLiquidatedContract: async (code) => {
    try {
      const { data } = await axios.get(`${routerLinks(Liquidation.nameLink_Liquidated, 'api')}/${code}`);
      if (data.message) {
        Message.success(data.message);
      }
      return data;
    } catch (error) {
      console.log('err', error);
      if (error.response.data.message) Message.error(error.response.data.message);
      return false;
    }
  },
  getRentalCode: async (roomId, type = 'LIQUIDATED') => {
    try {
      const { data } = await axios.get(
        `${routerLinks(Liquidation.nameLink_Rental, 'api')}/${roomId}/rentalContractCode/${type}`,
      );
      // console.log("first121",data)
      return data.data;
    } catch (error) {
      console.log(error);
      if (error.response.data.message) Message.error(error.response.data.message);
      return false;
    }
  },
  getMasterDataByCode: async (code) => {
    try {
      const { data } = await axios.get(`${routerLinks(Liquidation.nameLink_Liquidated, 'api')}/create-data/${code}`);
      return data.data;
    } catch (error) {
      console.log('error', error);
      if (error.response.data.message) Message.error(error.response.data.message);
      return false;
    }
  },
  createLiquidationContract: async (value) => {
    try {
      const { data } = await axios.post(`${routerLinks(Liquidation.nameLink_Liquidated, 'api')}`, value);
      if (data?.message) Message.success(data?.message);
      return data.data;
    } catch (error) {
      console.log('error', error);
      if (error.response.data.message) Message.error(error.response.data.message);
      return false;
    }
  },
  updateLiquidationContract: async (value) => {
    try {
      const { data } = await axios.put(`${routerLinks(Liquidation.nameLink_Liquidated, 'api')}/${value.code}`, value);
      if (data?.message) Message.success(data?.message);
      return data;
    } catch (error) {
      console.log('error', error);
      if (error.response.data.message) Message.error(error.response.data.message);
      return false;
    }
  },
  preview: async (value) => {
    try {
      const { data } = await axios.put(`${routerLinks(Liquidation.nameLink_Liquidated, 'api')}/preview`, value);
      if (data?.message) Message.success(data?.message);
      return data;
    } catch (error) {
      console.log('error', error);
      if (error.response.data.message) Message.error(error.response.data.message);
      return false;
    }
  },
};
export default Liquidation;

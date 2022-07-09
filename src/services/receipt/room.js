import axios from 'axios';
import { Message } from 'components';
import { routerLinks } from 'utils';

const service = {
  nameLink: 'receipt-information',
  noticeLink: 'housing-expense',
  getList: async (roomId, params) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/building/${roomId}/ROOM_COST`, {
        params,
      });
      return {
        data: data.data,
        count: data.total,
      };
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return { data: [], count: 0 };
    }
  },
  getRoomBillDetail: async (code) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/${code}`);
      return {
        data: data.data,
        count: data.total,
      };
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return { data: [], count: 0 };
    }
  },
  getRoomNotice: async (roomId) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.noticeLink, 'api')}/${roomId}/oldest-housing-expense`);
      return data;
    } catch (error) {
      console.log('err', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getDataMaster: async (housingExpenseCode) => {
    try {
      const { data } = await axios.get(
        `${routerLinks(service.nameLink, 'api')}/${housingExpenseCode}/create-data/ROOM_COST`,
      );
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  create: async (values) => {
    try {
      const { data } = await axios.post(`${routerLinks(service.nameLink, 'api')}`, { ...values, type: 'ROOM_COST' });
      if (data.message) Message.success(data.message);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  edit: async (receiptCode) => {
    try {
      const { data } = await axios.post(`${routerLinks(service.nameLink, 'api')}/${receiptCode}`);
      if (data.message) Message.success(data.message);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  sendMail: async (code) => {
    try {
      const { data } = await axios.post(`${routerLinks(service.nameLink, 'api')}/send-mail/${code}`);
      if (data.message) Message.success(data.message);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
};

export default service;

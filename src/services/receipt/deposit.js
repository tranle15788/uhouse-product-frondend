import axios from 'axios';
import { Message } from 'components';
import { routerLinks } from 'utils';

const service = {
  nameLink: 'receipt-information',
  getList: async (idBuilding, params) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/building/${idBuilding}/DEPOSIT`, {
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
  create: async (values) => {
    try {
      const { data } = await axios.post(`${routerLinks(service.nameLink, 'api')}`, { ...values, type: 'DEPOSIT' });
      if (data.message) Message.success(data.message);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getDataMaster: async (housingExpenseCode) => {
    try {
      const { data } = await axios.get(
        `${routerLinks(service.nameLink, 'api')}/${housingExpenseCode}/create-data/DEPOSIT`,
      );
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getDepositBillDetail: async (code) => {
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

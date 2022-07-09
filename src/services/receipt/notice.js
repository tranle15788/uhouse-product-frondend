import axios from 'axios';
import { routerLinks } from 'utils';
import { Message } from 'components';

const service = {
  nameLink: 'housing-expense',
  getList: async (idBuilding, params) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/${idBuilding}/building`, { params });
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
  getDetail: async (code) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/${code}`);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getdataMaster: async (roomId) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/${roomId}/create-data`);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getWaterElectric: async (params) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/waterElectric`, { params });
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  create: async (values) => {
    try {
      const { data } = await axios.post(`${routerLinks(service.nameLink, 'api')}`, values);
      if (data.message) Message.success(data.message);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  edit: async (code, values) => {
    try {
      const { data } = await axios.put(`${routerLinks(service.nameLink, 'api')}/${code}`, values);
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

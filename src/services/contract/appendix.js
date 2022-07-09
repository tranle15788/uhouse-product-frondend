import axios from 'axios';

import { routerLinks } from 'utils';
import { Message } from 'components';

const Service = {
  nameLink: 'extention-contract',
  namelink_addendum: 'contract-addendum',

  getListAddendumContract: async (params, idBuilding) => {
    try {
      const { data } = await axios.get(`${routerLinks(Service.namelink_addendum, 'api')}/list/${idBuilding}`, {
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
  getAddendumContractByCode: async (pageCode) => {
    try {
      const { data } = await axios.get(`${routerLinks(Service.nameLink, 'api')}/${pageCode}`);
      if (data.message) {
        Message.success(data.message);
      }
      return data;
    } catch (e) {
      console.log('err', e);
      Message.error(e?.response?.data?.message);
      return false;
    }
  },
  getMasterContract: async (code) => {
    try {
      const { data } = await axios.get(`${routerLinks(Service.nameLink, 'api')}/create-data/${encodeURI(code)}`);
      return data;
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getDetailContract: async (code) => {
    try {
      const { data } = await axios.get(`${routerLinks(Service.nameLink, 'api')}/${encodeURI(code)}`);
      return data;
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  post: async (value) => {
    try {
      const { data } = await axios.post(`${routerLinks(Service.nameLink, 'api')}`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  createLessorSign: async (value, code) => {
    try {
      const { data } = await axios.post(`${routerLinks(Service.nameLink, 'api')}/${code}/lessor-sign`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  put: async (value, code) => {
    try {
      console.log(code);
      const { data } = await axios.put(`${routerLinks(Service.nameLink, 'api')}/${code}`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  lessorSignContract: async (pageCode) => {
    const { data } = await axios.post(`${routerLinks(Service.nameLink, 'api')}/${pageCode}/lessor-sign`);
    try {
      if (data.message) Message.success(data.message);
      return true;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
};
export default Service;

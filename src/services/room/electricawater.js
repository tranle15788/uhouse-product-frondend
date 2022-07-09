import axios from 'axios';
import { routerLinks } from 'utils';
import { Message } from 'components';

const Electricawater = {
  nameLink: 'electricity-water-information',
  get: async (params, roomId) => {
    try {
      const { data } = await axios.get(`${routerLinks(Electricawater.nameLink, 'api')}/room/${roomId}`, { params });
      return {
        data: data.data,
        count: data.total,
      };
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return {
        data: [],
        count: 0,
      };
    }
  },
  getDetailById: async (id) => {
    try {
      const { data } = await axios.get(`${routerLinks(Electricawater.nameLink, 'api')}/${id}`);
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
  getListElectricityWater: async (roomId) => {
    try {
      const { data } = await axios.get(`${routerLinks(Electricawater.nameLink, 'api')}/create-data/${roomId}`);
      return {
        data: data.data,
        count: data.total,
      };
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return {
        data: [],
        count: 0,
      };
    }
  },
  createElectricWater: async (value) => {
    try {
      const { data } = await axios.post(`${routerLinks(Electricawater.nameLink, 'api')}`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },

  updateElectricWater: async (value, id) => {
    try {
      const { data } = await axios.put(`${routerLinks(Electricawater.nameLink, 'api')}/${id}`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (err) {
      Message.error(err?.response?.data?.message);
      return false;
    }
  },
  delete: async ({ id, value }) => {
    try {
      const { data } = await axios.delete(`${routerLinks(Electricawater.nameLink, 'api')}/${id}`, { data: value });
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (err) {
      Message.userManagement.error('components.message.Fail', err.data?.message);
      return false;
    }
  },
};
export default Electricawater;

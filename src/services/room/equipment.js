import axios from 'axios';

import { routerLinks } from 'utils';
import { Message } from 'components';

const Equipment = {
  nameLink: 'Room',
  get: async ({ params, roomId }) => {
    try {
      const { data } = await axios.get(`${routerLinks(Equipment.nameLink, 'api')}/${roomId}/suppliess`, { params });
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
  post: async ({ value, roomId, t }) => {
    try {
      value = { ...value, id: 0 };
      const { data } = await axios.post(`${routerLinks(Equipment.nameLink, 'api')}/${roomId}/supplies`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  put: async ({ value, roomId, t }) => {
    try {
      const { data } = await axios.put(`${routerLinks(Equipment.nameLink, 'api')}/${roomId}/supplies`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (err) {
      Message.error(err?.response?.data?.message);
      return false;
    }
  },
  delete: async ({ roomId, value }) => {
    try {
      const { data } = await axios.delete(`${routerLinks(Equipment.nameLink, 'api')}/${roomId}/supplies`, {
        data: value,
      });
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
export default Equipment;

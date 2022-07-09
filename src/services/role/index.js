import axios from 'axios';

import { routerLinks } from 'utils';
import { Message } from 'components';

export const RoleService = {
  nameLink: 'Role',
  getListRoles: async (params = { page: 0, perPage: 0 }) => {
    try {
      const { data } = await axios.get(`${routerLinks(RoleService.nameLink, 'api')}`, { params });
      return {
        data: data.data,
        count: data.total,
      };
    } catch (error) {
      Message.error(error?.response?.data?.message);
      console.log(error);
      return {
        data: [],
        count: 0,
      };
    }
  },
  getById: async (id) => {
    const { data } = await axios.get(`${routerLinks(RoleService.nameLink, 'api')}/${id}`);
    data.data.permissionList = data.data.permissions?.map((subItem) => subItem.id);
    return data;
  },
  post: async (values) => {
    try {
      values.permissionList = values.permissionList
        .filter((item) => item.value.indexOf('__') !== 0)
        .map((item) => item.value);
      const { data } = await axios.post(routerLinks(RoleService.nameLink, 'api'), values);
      if (data.message) Message.success(data.message);
      return data;
    } catch (e) {
      Message.error(e?.response?.data?.message);
      return false;
    }
  },
  put: async (values, id) => {
    try {
      values.permissionList = values.permissionList
        .filter((item) => (item.value ? item.value.indexOf('__') !== 0 : true))
        .map((item) => item?.value || item);
      const { data } = await axios.put(`${routerLinks(RoleService.nameLink, 'api')}`, { ...values, id });
      if (data.message) Message.success(data.message);
      return data;
    } catch (e) {
      Message.error(e?.response?.data?.message);
      return false;
    }
  },
  delete: async (id) => {
    try {
      const { data } = await axios.delete(`${routerLinks(RoleService.nameLink, 'api')}/${id}`);
      if (data.message) Message.success(data.message);
      return data;
    } catch (e) {
      Message.error(e?.response?.data?.message);
      return false;
    }
  },
};

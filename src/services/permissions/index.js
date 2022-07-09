import axios from 'axios';
import { routerLinks } from 'utils';
import { Message } from 'components';

export const PermissionsService = {
  nameLink: 'Permissions',
  nameLinkMenu: 'MenuPermissions',
  nameLinkMenu_Permission: 'menu-permission',

  get: async () => {
    try {
      const { data } = await axios.get(`${routerLinks(PermissionsService.nameLink, 'api')}/get-all`);
      return data.data;
    } catch (res) {
      Message.error(res.data.message);
    }
  },

  getMenu: async (pageCode) => {
    try {
      const { data } = await axios.get(`${routerLinks(PermissionsService.nameLinkMenu, 'api')}/${pageCode}`);
      return data;
    } catch (res) {
      Message.error(res.data.message);
    }
  },

  get_Permission: async (pageCode) => {
    try {
      const { data } = await axios.get(`${routerLinks(PermissionsService.nameLinkMenu_Permission, 'api')}/${pageCode}`);
      return data;
    } catch ({ res }) {
      console.log('error', res.data.message);
      Message.error(res.data.message);
    }
  },
  get_buildingPermission: async (pageCode, idBuilding) => {
    try {
      const { data } = await axios.get(
        `${routerLinks(PermissionsService.nameLinkMenu_Permission, 'api')}/${pageCode}`,
        { params: { buildingId: idBuilding } },
      );
      return data;
    } catch ({ res }) {
      console.log('error', res.data.message);
      Message.error(res.data.message);
    }
  },
};

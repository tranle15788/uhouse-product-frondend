import axios from 'axios';
import { Message } from 'components';
import { routerLinks } from 'utils';

export const ContentBuildingServices = {
  nameLink: 'Building',

  get: async (idBuilding) => {
    try {
      const { data } = await axios.get(`${routerLinks(ContentBuildingServices.nameLink, 'api')}/${idBuilding}/content`);
      return { content: data?.data?.content || '', id: data?.data?.id || null };
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
    }
  },
  post: async (value, idBuilding) => {
    try {
      const { data } = await axios.post(
        `${routerLinks(ContentBuildingServices.nameLink, 'api')}/${idBuilding}/content`,
        value,
      );
      if (data.message) {
        Message.success(data.message);
      }
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  put: async (body, idBuilding) => {
    try {
      const { data } = await axios.put(
        `${routerLinks(ContentBuildingServices.nameLink, 'api')}/${idBuilding}/content`,
        body,
      );
      if (data?.message) {
        Message.success(data?.message);
      }
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  delete: async (value, idBuilding) => {
    try {
      const { data } = await axios.delete(
        `${routerLinks(ContentBuildingServices.nameLink, 'api')}/${idBuilding}/content`,
        { data: value },
      );
      if (data.message) {
        Message.success(data.message);
      }
      return true;
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
};

import axios from 'axios';
import { routerLinks } from 'utils';
import { Message } from 'components';

const buildService = {
  nameLink: 'Building',
  buildingManagement: {
    getBuildingList: async (params) => {
      try {
        const { data } = await axios.get(`${routerLinks(buildService.nameLink, 'api')}`, { params });
        return {
          data: data.data,
          count: data.total,
        };
      } catch (error) {
        console.log('error', error);
        Message.error(error?.response?.data?.message);
        return {
          data: [],
          count: 0,
        };
      }
    },
    getBuildingDetail: async (id) => {
      try {
        const { data } = await axios.get(`${routerLinks(buildService.nameLink, 'api')}/${id}`, 'accept: */*');
        data.data.rentedRooms = data.data.rentedRooms + data.data.almostExpiredRooms + data.data.depositedRooms;
        data.data.arrayId = {
          fullTitle:
            data.data.buildingAddress.province.name +
            ' / ' +
            data.data.buildingAddress.district.name +
            ' / ' +
            data.data.buildingAddress.ward.name,
          id:
            data.data.buildingAddress.province.code +
            '_' +
            data.data.buildingAddress.district.code +
            '_' +
            data.data.buildingAddress.ward.code,
          isLeaf: true,
          label:
            data.data.buildingAddress.province.name +
            ' / ' +
            data.data.buildingAddress.district.name +
            ' / ' +
            data.data.buildingAddress.ward.name,
          pId: data.data.buildingAddress.province.code + '_' + data.data.buildingAddress.district.code,
          selectable: true,
          title: data.data.buildingAddress.ward.name,
          value:
            data.data.buildingAddress.province.code +
            '_' +
            data.data.buildingAddress.district.code +
            '_' +
            data.data.buildingAddress.ward.code,
        };
        // province district ward
        data.data.detail = data.data.buildingAddress.detail;
        return data;
      } catch ({ response }) {
        console.log('error', response);
        Message.error(response.data.message);
      }
    },
    getBuildingMedia: async (id) => {
      try {
        const { data } = await axios.get(`${routerLinks(buildService.nameLink, 'api')}/${id}/media`);
        return data;
      } catch (error) {
        console.log('error', error);
        Message.error(error?.response?.data?.message);
      }
    },
    getBuildingInfo: async (id) => {
      try {
        const { data } = await axios.get(`${routerLinks(buildService.nameLink, 'api')}/${id}`);
        const generalInfo = {
          name: data.data.name,
          type: data.data.type,
          address: data.data.address,
          numRooms: data.data.totalRooms,

          availableRooms: data.data.emptyRooms,
          rentedRooms: data.data.rentedRooms + data.data.almostExpiredRooms + data.data.depositedRooms,
          media: data.data.media,
        };
        return {
          generalInfo,
          costInfo: data.data.costs,
          utilitiesInfo: data.data.utilities,
          buildingManager: data.data.buildingManagers,
        };
      } catch (error) {
        console.log('error', error);
        Message.error(error?.response?.data?.message);
      }
    },
    updateBuildingUtilities: async (id, body) => {
      try {
        const { data } = await axios.post(`${routerLinks(buildService.nameLink, 'api')}/${id}/utilities`, body);
        if (data.message) {
          Message.success(data.message);
        }
      } catch (error) {
        console.log('error', error);
        Message.error(error?.response?.data?.message);
        return false;
      }
    },
    createBuilding: async (params) => {
      try {
        if (params.arrayId) {
          const code = params.arrayId.label.split(' / ');
          delete params.arrayId;
          params.address = {
            detail: params.detail,
            province: code[0],
            district: code[1],
            ward: code[2],
          };
        }
        const { data } = await axios.post(`${routerLinks(buildService.nameLink, 'api')}`, params);
        if (data.message) {
          Message.success(data.message);
        }
        return data;
      } catch ({ response }) {
        await Message.userManagement.error('components.message.Fail', response.data.message);
      }
      return null;
    },
    updateBuilding: async (params, id, t) => {
      try {
        params = { ...params, id };
        if (params.type === 'Nhà trọ') {
          params.type = 'MOTEL';
        } else if (params.type === 'Căn hộ dịch vụ') {
          params.type = 'CHDV';
        } else if (params.type === 'Khách sạn') {
          params.type = 'HOTEL';
        }
        if (params.arrayId) {
          const code = params.arrayId.label.split(' / ');
          delete params.arrayId;
          params.address = {
            detail: params.detail,
            province: code[0],
            district: code[1],
            ward: code[2],
          };
        }
        const { data } = await axios.put(`${routerLinks(buildService.nameLink, 'api')}`, params);
        if (data.message) {
          Message.success(data.message);
        }
        return data;
      } catch ({ response }) {
        await Message.userManagement.error('components.message.Fail', response.data.message);
        return false;
      }
    },
    deleteBuilding: async (id, t, setReloadTable) => {
      try {
        const { data } = await axios.delete(`${routerLinks(buildService.nameLink, 'api')}/${id}`, 'accept: */*');
        if (data.message) {
          Message.success(data.message);
          setReloadTable(true);
        }
        return data;
      } catch ({ response }) {
        await Message.error(response.data.message);
      }
      return { id };
    },
    deleteMedia: async (id) => {
      try {
        await axios.delete(`${routerLinks(buildService.nameLink, 'api')}/media/${id}`);
      } catch (error) {
        console.log(error, 'err');
        Message.error(error?.response?.data?.message);
      }
    },
  },
};

export default buildService;

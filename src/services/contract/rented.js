import axios from 'axios';

import { routerLinks } from 'utils';
import { Message } from 'components';

const Service = {
  nameLink: 'export',
  nameLink_Rental: 'rental-contract',

  get: async ({ params, roomId }) => {
    try {
      const { data } = await axios.get(`${routerLinks(Service.nameLink, 'api')}/${roomId}/suppliess`, { params });
      return {
        data: data.data,
        count: data.total,
      };
    } catch (response) {
      console.log(response, 'err');
      return {
        data: [],
        count: 0,
      };
    }
  },
  post: async ({ objContract, roomId, t }) => {
    try {
      const { data } = await axios.post(`${routerLinks(Service.nameLink, 'api')}/export-contract-pdf`, objContract);
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
      const { data } = await axios.put(`${routerLinks(Service.nameLink, 'api')}/${roomId}/supplies`, value);
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
      const { data } = await axios.delete(`${routerLinks(Service.nameLink, 'api')}/${roomId}/supplies`, {
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

  postExport: async ({ objContract, roomId, t }) => {
    try {
      const { data } = await axios.post(`${routerLinks(Service.nameLink, 'api')}/export-contract-pdf`, objContract);
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      return fileURL;
    } catch (error) {
      Message.error(t('components.message.Fail'), error?.data?.message, t('components.message.Close'));
      return false;
    }
  },

  // get list rental contract
  getListRentalContract: async (params, idBuilding) => {
    try {
      if (idBuilding) {
        const { data } = await axios.get(`${`${routerLinks(Service.nameLink_Rental, 'api')}/list/${idBuilding}`}`, {
          params,
        });
        return {
          data: data.data,
          count: data.total,
        };
      }
      return {
        data: [],
        count: 0,
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
  createDataRentalContract: async (value) => {
    try {
      const { data } = await axios.post(`${routerLinks(Service.nameLink_Rental, 'api')}`, value);
      if (data.message) {
        Message.success(data.success);
      }
    } catch (error) {
      console.log('err', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  updateContractRent: async (value) => {
    try {
      const { data } = await axios.put(`${routerLinks(Service.nameLink_Rental, 'api')}/${value.code}`, { ...value });
      if (data.message) {
        Message.success(data.success);
      }
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  // get list rental contract by id
  getRentalContractByCode: async (code) => {
    try {
      const { data } = await axios.get(`${routerLinks(Service.nameLink_Rental, 'api')}/detail/${code}`);
      return {
        data: data.data,
      };
    } catch (response) {
      console.log(response, 'err');
      Message.error(response?.data?.message);
      return {
        data: [],
        count: 0,
      };
    }
  },

  postPreview: async ({ objContract, roomId, t }) => {
    try {
      const { data } = await axios.post(`${routerLinks(Service.nameLink, 'api')}/preview-contract-pdf`, objContract);
      return data;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },

  getRoomNumber: async (idBuilding) => {
    try {
      const { data } = await axios.get(`${routerLinks('Room', 'api')}/roomNumber/${idBuilding}`);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },

  // lessor sign contract

  lessorSignContract: async (code) => {
    try {
      const { data } = await axios.post(`${routerLinks(Service.nameLink_Rental, 'api')}/${code}/lessor-sign`);
      if (data?.message) {
        Message.success(data?.message);
        return true;
      }
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },

  getListDepositContractCodeRoom: async (roomId) => {
    try {
      const { data } = await axios.get(`${routerLinks('deposit-contract', 'api')}/${roomId}/depositContract`);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getDepositContractNotRent: async (roomId) => {
    try {
      const { data } = await axios.get(`${routerLinks('deposit-contract', 'api')}/${roomId}/without-rental-contract`);
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getCreateDataRentContract: async (params) => {
    try {
      const { data } = await axios.get(`${routerLinks(Service.nameLink_Rental, 'api')}/create-data`, { params });
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
};
export default Service;

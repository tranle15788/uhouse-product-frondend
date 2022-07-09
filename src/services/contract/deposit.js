import axios from 'axios';
import { routerLinks } from 'utils';
import { Message } from 'components';

const Deposit = {
  nameLink: 'export',
  nameLink_Deposit: 'deposit-contract',

  get: async ({ params, roomId }) => {
    try {
      const { data } = await axios.get(`${routerLinks(Deposit.nameLink, 'api')}/${roomId}/suppliess`, { params });
      return {
        data: data.data,
        count: data.total,
      };
    } catch (response) {
      console.log(response, 'err');
      Message.error(response.data.message);

      return {
        data: [],
        count: 0,
      };
    }
  },
  // get list deposit contract
  getListDepositContract: async (params, idBuilding) => {
    try {
      const { data } = await axios.get(`${routerLinks(Deposit.nameLink_Deposit, 'api')}/list/${idBuilding}`, {
        params,
      });
      return {
        data: data.data,
        count: data.total,
      };
    } catch (response) {
      Message.error(response.data.message);
      console.log(response, 'err');
      return {
        data: [],
        count: 0,
      };
    }
  },
  // get list deposit contract
  // getListDepositContract: async (params, idBuilding) => {
  //   try {
  //     if (idBuilding) {
  //       const { data } = await axios.get(
  //         `${routerLinks(Deposit.nameLink_Deposit, "api")}/list/${idBuilding}`, { params }
  //       )
  //       return {
  //         data: data.data,
  //         count: data.total
  //       }
  //     }
  //   } catch (response) {
  //     console.log(response, "err");
  //     return {
  //       data: [],
  //       count: 0
  //     }
  //   }
  // },
  // get list deposit contract
  createListDepositContract: async (value) => {
    try {
      const { data } = await axios.post(`${routerLinks(Deposit.nameLink_Deposit, 'api')}`, value);
      if (data.message) {
        Message.success(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  postExport: async ({ objContract, roomId, t }) => {
    try {
      let fileURL;
      await axios.post(`${routerLinks(Deposit.nameLink, 'api')}/export-contract-pdf`, objContract).then((data) => {
        const file = new Blob([data.data], { type: 'application/octet-stream' });
        fileURL = URL.createObjectURL(file);
      });
      return fileURL;
    } catch (error) {
      Message.error(t('components.message.Fail'), error?.response?.data?.message, t('components.message.Close'));
      return false;
    }
  },
  postPreview: async ({ objContract, roomId, t }) => {
    try {
      const { data } = await axios.post(`${routerLinks(Deposit.nameLink, 'api')}/preview-contract-pdf`, objContract);
      return data;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  put: async ({ value, roomId, t }) => {
    try {
      const { data } = await axios.put(`${routerLinks(Deposit.nameLink, 'api')}/${roomId}/supplies`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  delete: async ({ roomId, value }) => {
    try {
      const { data } = await axios.delete(`${routerLinks(Deposit.nameLink, 'api')}/${roomId}/supplies`, {
        data: value,
      });
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch (err) {
      await Message.userManagement.error('components.message.Fail', err.data?.message);
      return false;
    }
  },

  // lessor sign contract

  lessorSignContract: async (code) => {
    try {
      const { data } = await axios.put(`${routerLinks(Deposit.nameLink_Deposit, 'api')}/${code}/sign`);
      if (data?.message) {
        Message.success(data?.message);
        return true;
      }
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  getDepositContract: async (roomId) => {
    try {
      const { data } = await axios.get(`${routerLinks(Deposit.nameLink_Deposit, 'api')}/${roomId}/master`);
      return data;
    } catch (error) {
      Message.error(error?.response?.data?.message);
      return false;
    }
  },

  getDepositPrevInfo: async (id) => {
    try {
      const { data } = await axios.get(`${routerLinks(Deposit.nameLink_Deposit, 'api')}/${id}`);
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

  getDepositContractByCode: async (code) => {
    try {
      if (code) {
        const { data } = await axios.get(`${routerLinks(Deposit.nameLink_Deposit, 'api')}/detail`, {
          params: { code },
        });
        data.data.checkBoxShowC = !!data.data?.housingBroker;
        return data;
      }
      return false;
    } catch (response) {
      Message.error(response?.data?.message);
      console.log(response, 'err');
      return false;
    }
  },
  previewDepositContract: async (value) => {
    try {
      const { data } = await axios.get(`/export/preview-contract-pdf`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },

  editDepositContract: async (value, id) => {
    try {
      const { data } = await axios.put(`${routerLinks('deposit-contract', 'api')}/${id}`, value);
      if (data?.message) {
        Message.success(data?.message);
      }
      return data;
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
  GetIndentity: async (indentityCard) => {
    try {
      const { data } = await axios.get(`${routerLinks(Deposit.nameLink_Deposit, 'api')}/find-user/${indentityCard}`);
      return {
        data: data.data,
      };
    } catch (response) {
      // console.log(response, 'err');
      // Message.error(response?.data?.message);
      return {
        data: [],
        count: 0,
      };
    }
  },
};
export default Deposit;

import axios from 'axios';
import { Message } from '../../components';
import { routerLinks } from '../../utils';

const service = {
  nameLink: 'housing-expense',
  getList: async (params) => {
    try {
      const { data } = await axios.get(`${routerLinks(service.nameLink, 'api')}/building/batch-create`, { params });
      return {
        data: data.data.map((item) => ({
          id: parseInt(item.id, 10),
          waterOld: item?.waterFirstIndex,
          electricOld: item?.electricityFirstIndex,
          romNumber: item?.room?.roomNumber,
          roomId: item?.room?.id,
        })),
        count: data.total,
      };
    } catch (error) {
      console.log('error', error);
      Message.error(error?.response?.data?.message);
      return { data: [], count: 0 };
    }
  },
  postBatchCreate: async (values) => {
    try {
      const { data } = await axios.post(`${routerLinks(service.nameLink, 'api')}/batch-create`, { ...values });
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

import { routerLinks } from 'utils';
// import { Message } from "components";
// import {formatCurrency} from "utils"
import axios from 'axios';
import { Message } from 'components';

const statistic = {
  nameLink: 'Room',
  get: async () => {
    try {
      const { data } = await axios.get(`${routerLinks(statistic.nameLink, 'api')}/analysis`);
      return data;
    } catch (error) {
      console.log(error, 'err');
      Message.error(error?.response?.data?.message);
      return false;
    }
  },
};
export default statistic;

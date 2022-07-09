import axios from 'axios';
import moment from 'moment';
import { routerLinks } from 'utils';
import { Message } from 'components';

const PaymentHistory = {
  nameLink: 'Room',
  get: async ({ params, roomId }) => {
    try {
      const { data } = await axios.get(`${routerLinks(PaymentHistory.nameLink, 'api')}/${roomId}/payments`, { params });

      data.data.forEach((ele, i) => {
        const appointmentTimetemp =
          moment(ele.appointmentTime).format('LT') + ' ' + moment(ele.appointmentTime).format('L');
        data.data[i] = { ...data.data[i], appointmentTime: appointmentTimetemp };
      });
      data.data.forEach((ele, index) => {
        const paymentTermtemp = moment(ele.paymentTerm).format('L');
        const paymentTimetemp = moment(ele.paymentTime).format('L');
        data.data[index] = { ...ele, paymentTerm: paymentTermtemp, paymentTime: paymentTimetemp };
      });
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
      // .toString().replaceAll(',', '')
      value = {
        ...value,
        price: value.price.toString().replaceAll(',', ''),
        amountMoney: value.amountMoney.toString().replaceAll(',', ''),
        oldDebt: value.oldDebt.toString().replaceAll(',', ''),
        newDebt: value.newDebt.toString().replaceAll(',', ''),
        totalMoney: value.totalMoney.toString().replaceAll(',', ''),
      };
      const { data } = await axios.post(
        `${routerLinks(PaymentHistory.nameLink, 'api')}/${roomId}/history-payment`,
        value,
      );
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch ({ response }) {
      Message.error(response?.data?.message);
      return false;
    }
  },
  put: async ({ value, id, roomId, t }) => {
    try {
      value = {
        ...value,
        price: value.price.toString().replaceAll(',', ''),
        amountMoney: value.amountMoney.toString().replaceAll(',', ''),
        oldDebt: value.oldDebt.toString().replaceAll(',', ''),
        newDebt: value.newDebt.toString().replaceAll(',', ''),
        totalMoney: value.totalMoney.toString().replaceAll(',', ''),
        id,
      };
      const { data } = await axios.put(
        `${routerLinks(PaymentHistory.nameLink, 'api')}/${roomId}/history-payment`,
        value,
      );
      if (data?.message) {
        Message.success(data?.message);
      }
      return true;
    } catch ({ response }) {
      Message.error(response?.data?.message);
      return false;
    }
  },
  delete: async ({ roomId, value, setReloadTable }) => {
    try {
      const { data } = await axios.delete(`${routerLinks(PaymentHistory.nameLink, 'api')}/${roomId}/history-payment`, {
        data: value,
      });
      if (data?.message) {
        Message.success(data?.message);
        setReloadTable(true);
      }
      return true;
    } catch ({ response }) {
      Message.userManagement.error('components.message.Fail', response.data?.message);
      return false;
    }
  },
};
export default PaymentHistory;

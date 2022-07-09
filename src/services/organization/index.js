import axios from 'axios';

import { routerLinks } from 'utils';
import { Message } from 'components';

export const OrganizationService = {
  nameLink: 'organization',

  post: async (values) => {
    try {
      const { data } = await axios.post(routerLinks(OrganizationService.nameLink, 'api'), values);
      if (data.message) Message.success(data.message);
      return data;
    } catch (e) {
      Message.error(e?.response?.data?.message);
      return false;
    }
  },
};

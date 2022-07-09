import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';

import { keyMenu, keyRefreshToken, keyToken, keyUser } from 'variable';

export const AuthContext = React.createContext({
  user: {},
  permission: {},
  menu: [],
  title: '',
  formatDate: 'YYYY-MM-DD',
  setTitlePage: () => {},
  login: () => {},
  logout: () => {},
  changeLanguage: () => {},
  changePermission: () => {},
  set_menu: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const Global = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(keyUser)));
  const [title, setTitle] = useState('');
  const [locale, set_locale] = useState();
  const [permission, set_permission] = useState({});
  const [formatDate, set_formatDate] = useState('YYYY-MM-DD');
  const [menu, set_menu] = useState(JSON.parse(localStorage.getItem(keyMenu)));
  const { t, i18n } = useTranslation();

  const login = (data) => {
    localStorage.setItem(keyToken, data.accessToken);
    localStorage.setItem(keyRefreshToken, data.refreshToken);
    localStorage.setItem(keyUser, JSON.stringify(data));
    if (data.menu) {
      localStorage.setItem(keyMenu, JSON.stringify(data.menu));
      set_menu(data.menu);
    }
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(keyUser);
  };

  const setTitlePage = useCallback(
    (name) => {
      document.title = t(name);
      setTitle(name);
    },
    [t],
  );

  const changeLanguage = useCallback(
    (values) => {
      i18n.changeLanguage(values);
      axios.defaults.headers.common['X-localization'] = values;
      moment.locale(values);
      switch (values) {
        case 'vi':
          set_locale(viVN);
          set_formatDate('DD-MM-YYYY');
          break;
        default:
          set_locale(enUS);
          set_formatDate('DD-MM-YYYY');
      }
    },
    [i18n],
  );

  const changePermission = (value) => {
    set_permission(value);
  };

  const clearTempLocalStorage = () => {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf('temp-') === 0) {
        arr.push(localStorage.key(i));
      }
    }
    for (let i = 0; i < arr.length; i++) {
      localStorage.removeItem(arr[i]);
    }
  };

  useEffect(() => {
    changeLanguage(localStorage.getItem('i18nextLng'));
    clearTempLocalStorage();
    const token = localStorage.getItem(keyToken);
    if (token) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
  }, [user, changeLanguage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        permission,
        title,
        formatDate,
        setTitlePage,
        login,
        logout,
        changeLanguage,
        changePermission,
        menu,
        set_menu,
      }}
    >
      <ConfigProvider locale={locale}>{children}</ConfigProvider>
    </AuthContext.Provider>
  );
};
export default Global;

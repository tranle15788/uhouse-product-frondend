import React, { useState, Fragment, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Tabs } from 'antd';
import BillRoom from './room';
// import Deposit from './deposit';
import { useLocation } from 'react-router';
// import { useSearchParams } from 'react-router-dom';

// import Notice from "./notice"

/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = ({ building, buildingList, key }) => {
  // const { t } = useTranslation();
  // const [permissions, set_permissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const { TabPane } = Tabs;
  const [keyTab, set_keyTab] = useState(null);
  // const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);

  useEffect(() => {
    if (URLSearch.get('tab') === 'bill') {
      switch (URLSearch.get('subtab')) {
        case 'room':
          keyTab !== '1' && set_keyTab('1');
          break;
        case 'deposit':
          keyTab !== '2' && set_keyTab('2');
          break;
        default:
          keyTab !== '1' && set_keyTab('1');
          // setSearchParams({subtab:"room",tab:URLSearch.get("tab")});
          break;
      }
    }
  }, [location.search]);

  // const changeTab = (tab) => {
  //   switch (tab.toString()) {
  //     case '1':
  //       setSearchParams({ subtab: 'room', tab: URLSearch.get('tab') });
  //       set_keyTab(tab);
  //       break;
  //     case '2':
  //       setSearchParams({ subtab: 'deposit', tab: URLSearch.get('tab') });
  //       set_keyTab(tab);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  const [, BillRoomJSX] = BillRoom({ isLoading, setIsLoading, building, buildingList, key: keyTab });
  // const [, NoticeJSX] = Deposit({ isLoading, setIsLoading, building, buildingList, key: keyTab });
  return [
    () => (
      <Fragment>
        {BillRoomJSX()}
        {/* <Tabs activeKey={keyTab} onChange={(e) => changeTab(e)}>
          <TabPane forceRender={true} tab={<span>{t('Phiếu thu tiền phòng').toUpperCase()}</span>} key="1">
            {BillRoomJSX()}
          </TabPane>
          <TabPane forceRender={true} tab={<span>{t('Phiếu thu tiền cọc').toUpperCase()}</span>} key="2">
            {key === '2' && NoticeJSX()}
          </TabPane>
        </Tabs> */}
      </Fragment>
    ),
  ];
};
export default Page;

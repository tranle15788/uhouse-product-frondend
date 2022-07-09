import React, { useState, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Tabs } from 'antd';
import './index.less';
import Bill from './bill';
import Notice from './notice';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import buildService from 'services/building/building';

/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = () => {
  const { t } = useTranslation();
  // const [permissions, set_permissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { TabPane } = Tabs;
  const [keyTab, set_keyTab] = useState('1');
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  let [buildingList, setBuildingList] = useState([]);
  const [building, set_building] = useState(
    localStorage.getItem('selectBuilding') ? JSON.parse(localStorage.getItem('selectBuilding')) : null,
  );

  const [, NoticeJSX] = Notice({ isLoading, setIsLoading, building, buildingList, key: keyTab });
  const [BillJSX] = Bill({ isLoading, setIsLoading, building, buildingList, key: keyTab });

  const getBuildingList = async () => {
    const data = await buildService.buildingManagement.getBuildingList({ page: 0, perPage: 0 });
    buildingList = data.data?.map((ele) => {
      return { value: ele.id, label: ele.name };
    });
    setBuildingList(buildingList);
  };

  useEffect(async () => {
    await getBuildingList();
    if (!building) {
      set_building({ id: buildingList[0]?.value, name: buildingList[0]?.label });
    }
  }, []);

  useEffect(() => {
    switch (URLSearch.get('tab')) {
      case 'notice':
        keyTab !== '1' && set_keyTab('1');
        break;
      case 'bill':
        keyTab !== '2' && set_keyTab('2');
        break;
      default:
        setSearchParams({ tab: 'notice' });
        break;
    }
  }, [location.search]);

  const changeTab = (key) => {
    switch (key.toString()) {
      case '1':
        setSearchParams({ tab: 'notice' });
        set_keyTab(key);
        break;
      case '2':
        setSearchParams({ tab: 'bill' });
        set_keyTab(key);
        break;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <div className="financialManagementList px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)] ">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 px-4">
          <span className="text-lg font-semibold" id="test12314">
            {t('routes.admin.receipt.Receipt')}
          </span>
          <Select
            value={building?.id}
            // value={{ id: buildingList[0]?.value, name: buildingList[0]?.label }}
            style={{ width: 208, marginRight: '12px', marginBottom: '8px' }}
            onChange={(value, option) => {
              localStorage.setItem('selectBuilding', JSON.stringify({ id: option?.value, name: option.children }));
              set_building({ id: option?.value, name: option.children });
            }}
            placeholder={t('Tòa nhà')}
            allowClear
            showSearch
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {buildingList?.map((ele, index) => (
              <Select.Option value={ele.value} key={index}>
                {ele.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="buildingList bg-white relative px-5 mb-7 min-h-[480px] rounded-b-xl">
          <Tabs activeKey={keyTab} onChange={(e) => changeTab(e)}>
            <TabPane forceRender={true} tab={<span>{t('routes.admin.receipt.List of notice')}</span>} key="1">
              {NoticeJSX()}
            </TabPane>
            <TabPane forceRender={true} tab={<span>{t('DANH SÁCH PHIẾU THU')}</span>} key="2">
              {BillJSX()}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;

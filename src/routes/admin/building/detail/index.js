import React, { useEffect, useState, Fragment, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useLocation, useParams } from 'react-router-dom';

import { Tabs } from 'antd';

import RoomList from './room';
import Contract from './contract';
import GeneralInfo from './general_info';
import Photo from './photo';
import Rules from './rules';
import Utility from './utility';
import Expenses from './cost';
import EmployeeList from './employee';
import Content from './content';
import { PermissionsService } from 'services/permissions';
import buildService from '../../../../services/building/building';

const Page = () => {
  const blockLoopAPI = useRef(false);
  const { TabPane } = Tabs;
  const { t } = useTranslation();
  const location = useLocation();
  const [idBuilding, setIdBuilding] = useState();
  const [organization, setOrganization] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState('1');
  const [kindpage, setKindpage] = useState();
  const [, setSearchParams] = useSearchParams();
  const [permissions, set_permissions] = useState([]);
  const params = useParams();
  const tabname = useMemo(() => {
    return {
      1: 'general-info',
      2: 'building-staff',
      3: 'cost',
      4: 'utility',
      5: 'photo',
      6: 'rule',
      7: 'list',
      11: 'introduction',
      12: 'contract',
    };
  }, []);

  const [title, handleGeneralInfoChange, GeneralInfoJSX] = GeneralInfo({
    isLoading,
    setIsLoading,
    idBuilding,
    setIdBuilding,
    setKindpage,
    key,
    kindpage,
    setOrganization,
    permissions,
  });
  const [BuildingContentJSX] = Content({ isLoading, setIsLoading, idBuilding, key, permissions });
  const [, RoomListJSX] = RoomList({ isLoading, setIsLoading, idBuilding, key, permissions });
  const [, RulesJSX] = Rules({ isLoading, setIsLoading, idBuilding, key, permissions });
  const [, UtilityJSX] = Utility({ isLoading, setIsLoading, idBuilding, key, permissions });
  const [, ExpensesJSX] = Expenses({ isLoading, setIsLoading, idBuilding, key, permissions });
  const [, ContractJsx] = Contract({ isLoading, setIsLoading, idBuilding, key, permissions });
  const [handleBuildingManagerListChange, ManagerJSX] = EmployeeList({
    isLoading,
    setIsLoading,
    idBuilding,
    key,
    organization,
    permissions,
  });
  const [PhotoJsx] = Photo({ isLoading, setIsLoading, idBuilding, key, permissions });
  const getPermission = async () => {
    const res = await PermissionsService.get_buildingPermission('DANH_SACH_TOA_NHA', idBuilding);
    set_permissions(res?.permissions);
  };
  useEffect(async () => {
    idBuilding && getPermission();
    if (key.toString() !== '1' && idBuilding) {
      const res = await buildService.buildingManagement.getBuildingDetail(idBuilding);
      setOrganization(res?.data.organization);
    }
  }, [idBuilding]);

  useEffect(() => {
    const arr_temp = params.building.split('-');
    !isNaN(arr_temp[arr_temp.length - 1]) && setIdBuilding(arr_temp[arr_temp.length - 1]);
    arr_temp.pop();
    setKindpage(arr_temp.join('-'));
    const URLSearch = new URLSearchParams(location.search);
    for (const property in tabname) {
      if (URLSearch.get('tab') === tabname[property]) {
        URLSearch.get('tab') === tabname[property] && setKey(property.toString());
      }
    }
  }, [location.search, params.building, tabname]);

  const handleChangeTab = async (key) => {
    idBuilding && setSearchParams({ tab: tabname[key] });
    setKey(key.toString());
    switch (key.toString()) {
      case '1':
        handleGeneralInfoChange();
        break;
      case '2':
        handleBuildingManagerListChange();

        break;

      default:
        break;
    }
  };

  // permission

  return (
    <Fragment>
      <div className="buildingList px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)]">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 font-semibold text-base px-4">
          <span className="text-lg">{title()}</span>
        </div>
        <div className="buildingList bg-white relative px-5 mb-7 min-h-[480px] rounded-b-xl">
          <Tabs defaultActiveKey="1" activeKey={key.toString()} onChange={handleChangeTab}>
            {/* {permissions?.XEM_QUAN_LY_TTC_TOA_NHA && */}
            <TabPane key="1" tab={t('routes.admin.building-info.General Information Uppercase')}>
              {GeneralInfoJSX()}
            </TabPane>
            {/* } */}
            {permissions?.XEM_GIOI_THIEU_TOA_NHA && (
              <TabPane
                forceRender={true}
                tab={t('routes.admin.building-info.Introduction tab')}
                disabled={!idBuilding}
                className="form-room-list"
                key="11"
              >
                {key === '11' && BuildingContentJSX()}
              </TabPane>
            )}
            {permissions?.XEM_QUAN_LY_NHAN_VIEN_TOA_NHA && (
              <TabPane
                tab={t('columns.admin.buildingInfo.buildingManager')}
                disabled={!idBuilding}
                className="form-building-staff"
                id="building-manager"
                key="2"
              >
                {key === '2' && ManagerJSX({ idBuilding, blockLoopAPI })}
              </TabPane>
            )}
            {permissions?.XEM_QUAN_LY_CHI_PHI_TOA_NHA && (
              <TabPane
                forceRender={true}
                tab={t('routes.admin.building-info.Expenses')}
                disabled={!idBuilding}
                className="form-change-pass"
                key="3"
              >
                {key.toString() === '3' && ExpensesJSX(idBuilding)}
              </TabPane>
            )}
            {permissions?.XEM_QUAN_LY_TIEN_ICH_TOA_NHA && (
              <TabPane
                forceRender={true}
                tab={t('routes.admin.building-info.Utilities')}
                disabled={!idBuilding}
                className="form-room-utilities"
                key="4"
              >
                {key.toString() === '4' && UtilityJSX()}
              </TabPane>
            )}
            {permissions?.XEM_QUAN_LY_ANH_DINH_KEM_TOA_NHA && (
              <TabPane
                tab={t('columns.admin.buildingInfo.Attached Photo')}
                disabled={!idBuilding}
                className="form-change-pass"
                key="5"
              >
                {key.toString() === '5' && PhotoJsx()}
              </TabPane>
            )}
            {permissions?.XEM_QUAN_LY_NOI_QUY_TOA_NHA && (
              <TabPane
                forceRender={true}
                key="6"
                disabled={!idBuilding}
                tab={t('columns.admin.roomRules.Building Rules').toUpperCase()}
              >
                {key.toString() === '6' && RulesJSX()}
              </TabPane>
            )}
            {permissions?.XEM_QUAN_LY_DS_PHONG_TOA_NHA && (
              <TabPane
                forceRender={true}
                tab={t('routes.admin.building-info.Room List')}
                disabled={!idBuilding}
                className="form-room-list"
                key="7"
              >
                {key.toString() === '7' && RoomListJSX()}
              </TabPane>
            )}
            {permissions?.XEM_QUAN_LY_DS_PHONG_TOA_NHA && (
              <TabPane
                forceRender={true}
                key="12"
                tab={t('routes.admin.building.detail.room.detail.Contract').toUpperCase()}
                disabled={!idBuilding}
              >
                {key.toString() === '12' && ContractJsx()}
              </TabPane>
            )}
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;

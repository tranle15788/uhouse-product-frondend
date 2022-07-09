import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { HookDataTable } from 'hooks';
import { ColumnBuilding } from 'columns/building';
import buildService from 'services/building/building';
import { Menu, Dropdown } from 'antd';
import './index.less';
import { useAuth } from 'global';
import { routerLinks } from 'utils';
import { PermissionsService } from 'services/permissions';
import { useLocation } from 'react-router-dom';

/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = ({ location }) => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  // const { formatDate } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const { menu } = useAuth();
  const [permissions, set_permissions] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const initFunction = useCallback(async () => {
    if (!mount) {
      setMount(true);
    }
  }, [mount]);

  useEffect(() => {
    initFunction();
    if (reloadTable === true) {
      handleChange();
      setReloadTable(false);
    }
  }, [initFunction, location, reloadTable]);

  const [handleChange, DataTable] = HookDataTable({
    loadFirst: true,
    isLoading,
    setIsLoading,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: buildService.buildingManagement.getBuildingList,
    onRow: (record) => ({
      onDoubleClick: async (event) => {
        navigate(`${routerLinks('Building list')}/detail-${record.id}`);
      },
    }),
    columns: ColumnBuilding({
      t,
      setReloadTable,
      navigate,
      permissions,
    }),

    rightHeader: (
      <Fragment>
        <Dropdown overlay={<MenuHover />}>
          <button className="bg-blue-400 text-white px-4 py-2.5 rounded-xl hover:bg-blue-500 inline-flex items-center mr-2 manipulate-list">
            {t('routes.admin.Layout.Data manipulation')}
          </button>
        </Dropdown>

        {permissions?.THEM_DANH_SACH_TOA_NHA && (
          <button
            className="bg-blue-500 text-white px-4 py-2.5 rounded-xl hover:bg-blue-600 inline-flex items-center btn-add-building "
            onClick={() => navigate(`${routerLinks('Building list')}/creating`)}
          >
            <i className="las la-plus mr-1" />
            {t('routes.admin.Layout.Add')}
          </button>
        )}
      </Fragment>
    ),
  });
  const initPermission = async () => {
    const res = await PermissionsService.get_Permission(menu.filter((item) => item.pageUrl === pathname)[0].code);
    set_permissions(res.permissions);
  };
  useEffect(() => {
    initPermission();
  }, []);
  return (
    <Fragment>
      <div className="buildingList px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)] ">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 font-semibold text-base px-4">
          <span className="text-lg">{t('routes.admin.building-info.Building List')}</span>
        </div>
        {permissions?.XEM_DANH_SACH_TOA_NHA && DataTable()}
      </div>
    </Fragment>
  );
};
export default Page;

/// ////////////////////////////////////////////MenuHover/////////////////////////////////////////////

const MenuHover = () => {
  const { t } = useTranslation();
  return (
    <Menu className="bg-white p-2 rounded-xl drop-shadow-2xl mt-5">
      {/* <Menu.Item key={1}>
        <button className="flex w-40 justify-center m-1 items-center text-sm border-2 border-blue-500 text-blue-500 rounded-xl px-5 py-1">
          <i className="las la-file-export text-3xl"></i> {t("routes.admin.Layout.Export")}{" "}
        </button>
      </Menu.Item> */}
      <Menu.Item key={1}>
        <button className="flex w-40 justify-center m-1 items-center text-sm border-2 border-blue-500 text-blue-500 rounded-xl px-5 py-1">
          <i className="las la-file-import text-3xl"></i> {t('routes.admin.Layout.Import')}
        </button>
      </Menu.Item>
      <Menu.Item key={2}>
        <button className="flex w-40 justify-center m-1 items-center text-sm border-2 border-blue-500 text-blue-500 rounded-xl px-5 py-1">
          <i className="las la-download text-3xl"></i> {t('routes.admin.Layout.Download templates')}
        </button>
      </Menu.Item>
    </Menu>
  );
};

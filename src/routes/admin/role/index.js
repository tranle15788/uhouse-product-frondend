import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'global';
import { HookDataTable, HookModalForm } from 'hooks';
import { ColumnRole } from 'columns/user';
import './index.less';
import { RoleService } from 'services/role';
import { PermissionsService } from 'services/permissions';
import { useLocation } from 'react-router-dom';
// import ColumnDetail from './detail';
const Page = () => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [permissions, set_permissions] = useState([]);
  const { formatDate, menu, set_menu, changePermission, permission } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const { pathname } = useLocation();
  const [menuPermission, set_MenuPermission] = useState([]);
  const [showDetail, setShowDetail] = useState(true);

  const initFunction = useCallback(async () => {
    if (!mount) {
      const res = await PermissionsService.getMenu(menu.filter((item) => item.pageUrl === pathname)[0].code);
      set_menu(res.menu);
      changePermission(res.permissions);

      setMount(true);
      const data = await PermissionsService.get();
      set_permissions(
        data.map((item, index) => {
          const level1 = {
            customTitle: item.groupName,
            title: item.groupName,
            value: '__' + index,
            checkable: true,
            pId: 0,
          };

          if (item?.subGroups?.length) {
            let length1 = item?.subGroups?.length;

            level1.children = item?.subGroups?.map((subItem, subIndex) => {
              const level2 = {
                customTitle: subItem.subGroupName,
                title: subItem.subGroupName,
                value: '___' + index + '' + subIndex,
                checkable: true,
                pId: level1.value,
              };
              const length2 = subItem?.permissions?.length;
              if (subItem?.permissions?.length) {
                level2.customTitle += ' (' + length2 + ')';
                length1 += length2;

                level2.children = subItem?.permissions?.map((permission, perIndex) => ({
                  customTitle: subItem.subGroupName + ' - ' + permission.name,

                  title: subItem.subGroupName + ' - ' + permission.name,
                  value: permission.id,
                  checkable: true,
                  pId: level2.value,
                  isLeaf: true,
                }));
              }

              return level2;
            });
            level1.customTitle += ' (' + length1 + ')';
          }

          return level1;
        }),
      );
    }
  }, [mount]);

  useEffect(() => {
    if (reloadTable === true) {
      handleChange();
      setReloadTable(false);
    }
  }, [reloadTable]);

  useEffect(() => {}, [showDetail]);

  useEffect(() => {
    initFunction();
  }, [initFunction]);

  // const [handleShowDrag, ModalDrag] = HookModalDrag({
  //   title: () => t("routes.admin.user-management.Role"),
  //   isLoading,
  //   setIsLoading,
  //   columns: ColumnRole({ t, permissions }),
  //   Get: RoleService.getListRoles,
  //   Put: RoleService.put,
  //   Post: RoleService.post,
  //   Delete: RoleService.delete,
  //   GetById: RoleService.getById,
  //   idElement: 'role',
  //   isReloadLoadToSave: true,
  //   showAddNew: permission.THEM_PHAN_QUYEN,
  //   conditionEdit: () => permission.SUA_PHAN_QUYEN,
  //   conditionDelete: () => permission.XOA_PHAN_QUYEN,
  // });

  const [handleEditRole, ModalForm, handleDelete] = HookModalForm({
    title: (data) => {
      if (data)
        return data.id === 0 || data.id
          ? t('routes.admin.role-management.Edit Role')
          : t('routes.admin.role-management.Add Role');
    },
    isLoading,
    setIsLoading,
    handleChange: async () => await handleChange(),
    columns: ColumnRole({
      t,
      formatDate,
      permissions,
      showDetail,
    }),
    Post: RoleService.post,
    Put: RoleService.put,
    Delete: async (id) => await RoleService.delete(id),
    GetById: RoleService.getById,
    widthModal: 600,
    parentID: () => t,
    idElement: 'role',
    showAddNew: permission.THEM_PHAN_QUYEN,
    conditionEdit: () => permission.SUA_PHAN_QUYEN,
    conditionDelete: () => permission.XOA_PHAN_QUYEN,
  });

  const [handleChange, DataTable] = HookDataTable({
    isLoading,
    setIsLoading,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: RoleService.getListRoles,
    columns: ColumnRole({
      t,
      formatDate,
      handleEditRole,
      handleDelete,
      setReloadTable,
      menuPermission,
      showDetail,
      setShowDetail,
    }),

    rightHeader: (
      <Fragment>
        <div className="flex">
          {menuPermission?.THEM_THIET_LAP_VAI_TRO && (
            <button
              className="bg-blue-500 text-white px-4 py-2.5 rounded-xl hover:bg-blue-400 inline-flex items-center"
              onClick={() => handleEditRole()}
            >
              <i className="las la-plus mr-1" />
              {t('routes.admin.Layout.Add')}
            </button>
          )}
        </div>
      </Fragment>
    ),
  });
  const initPermission = async () => {
    const res = await PermissionsService.get_Permission(menu.filter((item) => item.pageUrl === pathname)[0].code);
    set_MenuPermission(res.permissions);
  };
  useEffect(() => {
    initPermission();
  }, []);
  return (
    <Fragment>
      <div className="userList px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)]">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 text-lg font-semibold border-b-2 border-gray-300 px-4">
          <span>{t('routes.admin.role-management.Role List')}</span>
          {/* <span>
            <span className="text-blue-500 text-base">{t("routes.admin.user-management.User Management")}</span>
            <span className="px-2">/</span>
            <span className="text-base">{t("routes.admin.user-management.User List")}</span>
          </span> */}
        </div>
        {menuPermission?.XEM_THIET_LAP_VAI_TRO && DataTable()}
        {ModalForm()}
        {/* {CreateFormJSX()} */}
        {/* <button onClick={()=>{
          handleChange()
          }}>handleChange</button> */}
      </div>
    </Fragment>
  );
};
export default Page;

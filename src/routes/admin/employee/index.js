import React, { useState, Fragment, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable, HookModal } from 'hooks';
import ColumnEmployeeList from 'columns/employee';
import employeeListService from 'services/employee';
import { BuildingEmployee } from 'services/building';
import { Select } from 'antd';
import './index.less';
import classNames from 'classnames';
import { Message } from 'components';
import { useAuth } from 'global';
import CreateFormComponent from 'routes/admin/building/detail/employee/createform';
import DeleteHookForm from 'routes/admin/building/detail/employee/deleteform';
import { RoleService } from 'services/role';
import { UserRoleService } from 'services/user-role';
import { PermissionsService } from 'services/permissions';
import { useLocation } from 'react-router-dom';

/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = ({ location }) => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [permissions, set_permissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectAllButton, setSelectAllButton] = useState(false);
  const [roleList, setRoleList] = useState([]);
  // const [EmployeePermissioin, setEmployeePermissioin] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const idBuilding = useRef(null);
  const selectedRowsRef = useRef([]);
  const rowKeys = useRef([]);
  const dataTable = useRef([]);
  const { pathname } = useLocation();
  const { menu } = useAuth();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      selectedRowsRef.current = selectedRows;
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setSelectAllButton(selected);
    },
    selectedRowKeys,
  };
  const initFunction = useCallback(async () => {
    if (!mount) {
      setMount(true);
      getRoleList();
    }
  }, [mount]);

  useEffect(() => {
    initFunction();
  }, [initFunction, roleList]);

  const initPemission = async () => {
    const res = await PermissionsService.get_Permission(menu.filter((item) => item.pageUrl === pathname)[0].code);
    set_permissions(res.permissions);
  };

  useEffect(() => {
    initPemission();
  }, []);

  useEffect(() => {
    Object.keys(filterParams).length !== 0 && handleChange();
  }, [filterParams]);

  const getRoleList = async (key) => {
    const { data } = await RoleService.getListRoles({
      page: 0,
      perPage: 0,
    });
    setRoleList([...data]);
  };

  const filterRole = (value, option) => {
    setFilterParams((states) => {
      return { ...states, roleId: value };
    });
  };
  // const filterStatus = (value, option) => {
  //   setFilterParams((states) => {
  //     return { ...states, status: value };
  //   });
  // };

  const [handleChange, DataTable] = HookDataTable({
    loadFirst: true,
    isLoading,
    setIsLoading,
    filter: filterParams,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    Get: async (params) => {
      const data = await employeeListService.get(
        Object.keys(filterParams).length === 0 ? params : { ...params, filter: { ...filterParams } },
        user?.getUserInfor?.organization[0]?.id,
      );
      data?.data?.forEach((ele, i) => {
        data.data[i] = { ...ele, id: ele.userId + params.page + i };
      });
      let selectedRowKeys_arr = [];
      selectedRowKeys_arr = data?.data?.map((ele) => ele.id);
      rowKeys.current = selectedRowKeys_arr;
      dataTable.current = data.data;
      selectAllButton && selectedRowKeys[0] === rowKeys.current[0] && setSelectedRowKeys(rowKeys.current);
      return data;
    },
    columns: ColumnEmployeeList({
      t,
      // conditionEdit: () => permission.SUA_QUAN_LY_NHAN_VIEN_TOA_NHA,
      handleEdit: async (values) => {
        const { data } = values.userIdentityCard && (await BuildingEmployee.getUserIDcard(values.userIdentityCard));
        idBuilding.current = values.userRolesBuildingId;
        const roles = await UserRoleService.getUserRole(idBuilding.current, values.userId);
        const role_arr = roles.data.map((ele) => {
          return (
            ele && {
              value: ele.role?.id,
              label: ele.role?.name,
            }
          );
        });
        handeEditCreateForm({
          display: data,
          form: {
            CMND: values.userIdentityCard || values.userPassport,
            roles: role_arr,
          },
        });

        await showCreateHookForm(values);
      },
      handleDelete: async (data) => {
        const roles_arr = data.roles.map((ele) => {
          return { value: ele.userRolesId, label: ele.roleName };
        });
        handleShowDeleteForm({
          roles: roles_arr,
          id: data.userRolesUserId,
          userPermissionStatus: data.userRolesStatus,
        });
      },
      permissions, //
    }),
    rowSelection: permissions?.XOA_QUAN_LY_NHAN_VIEN_TOA_NHA ? { ...rowSelection } : null,
    rightHeader: (
      <div className="w-full mx-3 flex justify-between">
        <div>
          {/* filter Role */}
          {roleList.length !== 0 && (
            <Select
              labelInValue={false}
              style={{ width: 208, marginRight: '12px', marginBottom: '8px' }}
              onChange={filterRole}
              placeholder={t('routes.admin.employee.Find holder roles')}
              allowClear
              showSearch
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {roleList.map((ele, index) => (
                <Select.Option value={ele.id} key={index}>
                  {ele.name}
                </Select.Option>
              ))}
            </Select>
          )}
          {/* filter status */}
          {/* <Select
            labelInValue={false}
            style={{ width: 208, marginRight: '12px' }}
            placeholder={t('routes.admin.employee.Find status')}
            onChange={filterStatus}
            allowClear
          >
            {[
              { value: 'APPROVED', label: 'Đang làm việc' },
              { value: 'PENDING', label: 'Đang chờ xác nhận' },
              { value: 'REJECTED', label: 'Đã từ chối' },
            ].map((ele, index) => (
              <Select.Option value={ele.value} key={index}>
                {ele.label}
              </Select.Option>
            ))}
          </Select> */}
        </div>
        <div>
          {permissions?.XOA_QUAN_LY_NHAN_VIEN_TOA_NHA && (
            <button
              className={classNames(
                ' text-white px-4 py-2.5 w-40 mb-2 rounded-xl inline-flex items-center justify-center mr-3 text-center btn-deleteselect',
                selectedRowsRef.current.length !== 0 ? 'bg-red-600 hover:bg-red-800' : 'bg-red-300',
              )}
              disabled={selectedRowsRef.current.length === 0}
              onClick={() =>
                Message.request(
                  t('components.message.Confirm Delete'),
                  t('components.message.Are you sure want to delete', {
                    object: t('routes.admin.employee.User roles'),
                  }),
                  false,
                  () => {
                    const delete_arr = [];
                    selectedRowsRef.current.forEach((ele) => {
                      ele.roles.forEach((ele1) => {
                        delete_arr.push(ele1.userRolesId);
                      });
                    });
                    UserRoleService.deleteRolesUser(delete_arr) && handleChange();
                  },
                )
              }
            >
              {t('routes.admin.employee.Delete select')}
            </button>
          )}

          {permissions?.XOA_QUAN_LY_NHAN_VIEN_TOA_NHA && (
            <button
              className={
                ' text-white w-40 h-10 justify-center rounded-xl inline-flex items-center bg-blue-500 hover:bg-blue-700 mr-4'
              }
              onClick={() => {
                if (!selectAllButton) {
                  setSelectedRowKeys(rowKeys.current);
                  selectedRowsRef.current = dataTable.current;
                  setSelectAllButton(true);
                } else {
                  setSelectedRowKeys([]);
                  selectedRowsRef.current = [];
                  setSelectAllButton(false);
                }
              }}
            >
              {!selectAllButton ? t('routes.admin.employee.Select all') : t('routes.admin.employee.Uncheck all')}
            </button>
          )}
        </div>
      </div>
    ),
  });

  const [CreateFormJSX, onOk, handeEditCreateForm] = CreateFormComponent({
    roleList,
    post: async (data, id) =>
      await BuildingEmployee.post({
        userId: id,
        buildingId: idBuilding.current,
        organizationId: user.getUserInfor.organization[0].id,
        roles: data,
      }),
    handleChange,
  });

  const [DeleteFormJSX, handleShowDeleteForm] = DeleteHookForm({
    title: (data) => {
      switch (data?.userPermissionStatus) {
        case 'REJECTED':
          return t('columns.admin.building.deleteHistory');
        case 'APPROVED':
          return t('columns.admin.building.deleteRole');
        case 'PENDING':
          return t('routes.admin.building.detail.employee.DeleteRequest');
        default:
      }
    },
    width: 450,
    submitText: t('routes.admin.building.detail.employee.AcceptDelete'),
    cancelText: t('routes.admin.building.detail.employee.CacelDelete'),
    Delete: async (checkList) => await BuildingEmployee.delete(checkList),
    handleChange,
  });
  const [showCreateHookForm, CreateHookForm] = HookModal({
    title: (data) => t('routes.admin.building.Update building employee'),
    isLoading,
    setIsLoading,
    idElement: 'employeeForm',
    handleChange: async () => await handleChange(),
    onOk,
    textSubmit: t('Lưu'),
  });
  const initiFunction = async () => {
    const res = await PermissionsService.get_Permission(menu.filter((item) => item.pageUrl === pathname)[0].code);
    set_permissions(res.permissions);
  };
  useEffect(() => {
    initiFunction();
  }, []);
  // const [handleDelete,showForm] = {}

  return (
    <Fragment>
      <div className="employeeList px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)] ">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 font-semibold text-base px-4">
          <span className="text-lg" id="test12314">
            {t('routes.admin.employee.Employee list')}
          </span>
        </div>
        {permissions?.XEM_QUAN_LY_NHAN_VIEN_TOA_NHA && DataTable()}
        {CreateHookForm(() => (
          <CreateFormJSX />
        ))}
        <DeleteFormJSX />
      </div>
    </Fragment>
  );
};
export default Page;

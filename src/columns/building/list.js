import RemoveIcon from 'assets/svg/remove.js';
import React, { Fragment } from 'react';
import { Message } from 'components';
import buildService from 'services/building/building';
import { useNavigate } from 'react-router';
import { Popconfirm, Tooltip } from 'antd';
import { routerLinks } from 'utils';
import { convertTypeBuilding } from 'routes/admin/building/utils';
import axios from 'axios';

const Column = ({ t, setReloadTable, permissions }) => {
  const navigate = useNavigate();
  return [
    // name
    {
      name: 'name',
      title: t('columns.admin.buildingInfo.Building Name'),
      tableItem: {
        // align: 'center',
        fixed: 'left',
        width: 150,
        sorter: true,
        onCell: (record) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => {
            navigate(`${routerLinks('Building list')}/detail-${record.id}`);
          },
        }),
        // render: (text, record) => (
        //   <span

        //     className="cursor-pointer hover:border-b-2 buildingname"
        //   >
        //     {record.name}
        //   </span>
        // ),
      },
      formItem: {
        // col: 6,
        // rules: [{ type: "required" }],
        rules: [
          {
            type: 'required',
            validator: () => ({
              validator(_, value) {
                if (
                  !value ||
                  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ/,\s]+$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(t('components.form.ruleName'));
              },
            }),
          },
        ],
      },
    },

    // Room type
    {
      name: 'type',
      title: t('columns.admin.buildingInfo.Building Type'),
      tableItem: {
        align: 'center',
        width: 120,
        sorter: true,
        render: (text, record) => convertTypeBuilding(text, t),
      },

      formItem: {
        // col: 6,
        placeholder: t('columns.admin.buildingInfo.Building Type'),
        type: 'select',
        // className: "border-gray-400 border rounded-xl",
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'MOTEL',
            label: t('columns.admin.buildingInfo.Motel'),
          },
          {
            value: 'HOTEL',
            label: t('columns.admin.buildingInfo.Hotel'),
          },
          {
            value: 'CHDV',
            label: t('columns.admin.buildingInfo.CHDV'),
          },
        ],
      },
    },
    {
      title: 'Khu vực',
      name: 'arrayId',
      formItem: {
        rules: [{ type: 'required' }],
        col: 16,
        type: 'tree_select',
        api: {
          link: (getFieldValue) => `${routerLinks(buildService.nameLink, 'api')}/create-address`,
          format: (item) => ({
            id: item.code,
            pId: '00',
            value: item.code,
            title: item.name,
            fullTitle: item.name,
            selectable: false,
          }),
          loadData: async (treeNode, listTree) => {
            const _pos = treeNode.pos.split('-');
            const _id = treeNode.id.split('_');
            let isLeaf = false;
            let _res;
            switch (_pos.length) {
              case 2:
                _res = await axios.get(`${routerLinks(buildService.nameLink, 'api')}/create-address`, {
                  params: { provinceCode: _id[_id.length - 1] },
                });
                break;
              case 3:
                _res = await axios.get(`${routerLinks(buildService.nameLink, 'api')}/create-address`, {
                  params: {
                    provinceCode: _id[0],
                    districtCode: _id[_id.length - 1],
                  },
                });
                isLeaf = true;
                break;
              default:
                break;
            }

            return listTree.concat(
              _res.data.data.map((item) => ({
                pId: treeNode.id,
                id: treeNode.id + '_' + item.code,
                value: treeNode.id + '_' + item.code,
                title: item.name,
                fullTitle: treeNode.fullTitle + ' / ' + item.name,
                selectable: !!isLeaf,
                isLeaf,
              })),
            );
          },
        },
        list: [],
      },
    },

    // Address
    {
      title: t('columns.admin.buildingInfo.Address'),
      name: 'address',
      tableItem: {
        placeholder: t('columns.admin.buildingInfo.Address'),
        sorter: true,
        width: 280,
        align: 'center',
      },
    },

    // // Address
    {
      title: t('columns.admin.buildingInfo.Address'),
      name: 'detail',
      formItem: {
        placeholder: t('columns.admin.buildingInfo.Address'),
        rules: [
          {
            type: 'required',
            // validator: () => ({
            //   validator(_, value) {
            //     if (
            //       !value ||
            //       /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ/,\s]+$/.test(
            //         value,
            //       )
            //     ) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject(t('components.form.ruleAddress'));
            //   },
            // }),
          },
        ],
      },
    },

    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 120,
        fixed: 'right',
        align: 'center',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                {permissions?.SUA_DANH_SACH_TOA_NHA && (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <button
                      className="embed  text-xs mr-1"
                      onClick={async () => {
                        // handleEdit({ id: record.id });
                        navigate(`${routerLinks('Building list')}/edit-${record.id}`);
                      }}
                    >
                      <i className="las la-edit text-3xl text-blue-500 m-0 p-0"></i>
                    </button>
                  </Tooltip>
                )}

                {permissions?.XOA_DANH_SACH_TOA_NHA && (
                  <Tooltip title={t('routes.admin.Layout.Delete')}>
                    <Popconfirm
                      placement="left"
                      title={t('components.datatable.areYouSureWant')}
                      icon={
                        <i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />
                      }
                      onConfirm={() => {
                        buildService.buildingManagement.deleteBuilding(record.id, t, setReloadTable);
                      }}
                      okText={t('components.datatable.ok')}
                      cancelText={t('components.datatable.cancel')}
                    >
                      <button className="embed  text-xs rounded-lg mr-2">
                        <span className="uhome-trash m-0 p-0 text-red-500 text-2xl"></span>
                      </button>
                    </Popconfirm>
                  </Tooltip>
                )}
              </div>
            </Fragment>
          );
        },
      },
    },
  ];
};
export default Column;

export const ColumnManager = ({
  t,
  formatDate,
  handleEdit,
  handleDelete,
  setReloadTable,
  handleShowBuildingInfo,
  getBuildingInfo,
  setIsLoading,
  setIdBuilding,
}) => {
  return [
    // name
    {
      name: 'name',
      title: t('columns.admin.buildingManager.Manager Name'),
      tableItem: {
        fixed: 'left',
        width: 200,
        sorter: true,
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => (
          <span
            onClick={async () => {
              const data = await getBuildingInfo(record.id, setIsLoading);
              const arr = data?.buildingManager.map((ele, index) => {
                ele.managers.description = ele.description;
                return ele.managers;
              });
              handleShowBuildingInfo({
                general: data?.generalInfo,
                expenses: data?.costInfo,
                utils: data?.utilitiesInfo,
                buildingManager: arr,
              });
              setIdBuilding(record.id);
            }}
            className="cursor-pointer hover:border-b-2"
          >
            {record.name}
          </span>
        ),
      },
      formItem: {
        col: 6,
        rules: [{ type: 'required' }],
      },
    },

    // description
    {
      name: 'description',
      title: t('columns.admin.building.Description'),
      tableItem: {
        width: 150,
        sorter: true,
      },

      formItem: {
        col: 6,
        placeholder: t('columns.admin.buildingInfo.Building Type'),
        type: 'select',
        // className: "border-gray-400 border rounded-xl",
        rules: [{ type: 'required' }],
        list: [
          {
            value: 'MOTEL',
            label: t('columns.admin.buildingInfo.Hotel'),
          },
          {
            value: 'HOTEL',
            label: t('columns.admin.buildingInfo.Motel'),
          },
          {
            value: 'CHDV',
            label: t('columns.admin.buildingInfo.CHDV'),
          },
        ],
      },
    },

    // action
    {
      title: t('columns.admin.user.Action'),
      tableItem: {
        width: 180,
        fixed: 'right',
        align: 'center  ',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text, record) => {
          return (
            <Fragment>
              <div className="flex justify-center">
                <Tooltip title={t('routes.admin.Layout.Edit')}>
                  <button
                    className="embed text-xs mr-2"
                    onClick={async () => {
                      handleEdit({ id: record.id });
                    }}
                  >
                    <i className="las la-edit m-0 p-0 text-3xl text-blue-500"></i>
                  </button>
                </Tooltip>

                <Tooltip title={t('routes.admin.Layout.Delete')}>
                  <button
                    className="embed text-xs mr-2"
                    onClick={() =>
                      Message.request(
                        t('components.message.Confirm Delete'),
                        t('components.message.Are you sure want to delete', {
                          object: t('columns.admin.building.building'),
                        }),
                        false,
                        () => {
                          buildService.buildingManagement.deleteBuilding(record.id, t, setReloadTable);
                        },
                      )
                    }
                  >
                    <RemoveIcon />
                  </button>
                </Tooltip>
              </div>
            </Fragment>
          );
        },
      },
    },
  ];
};

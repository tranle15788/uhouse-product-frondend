import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HookDataTable } from 'hooks';
import { ColumnMass } from 'columns/receipt';
import { massService } from 'services/receipt';
import { Select } from 'antd';
import { DatePicker } from 'components/form/input';
import moment from 'moment';
import './index.less';
import buildService from '../../../../../services/building/building';

const Component = ({ isLoading, setIsLoading, key, permissions }) => {
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const selectedRowsRef = useRef([]);
  const dateEffective = useRef(moment().format('YYYY-MM') + '-01');
  const buildingEffective = useRef(null);
  const [checkSubmit, set_checkSubmit] = useState(false);
  const [checkInputNull, set_checkInputNull] = useState(false);
  const dataInputTable = useRef();
  const [buildingList, setBuildingList] = useState([]);
  const getBuildingList = async () => {
    const data = await buildService.buildingManagement.getBuildingList({ page: 0, perPage: 0 });

    setBuildingList(
      data.data?.map((ele) => {
        return { value: ele.id, label: ele.name };
      }),
    );
  };

  useEffect(async () => {
    await getBuildingList();
    await handleChangeNoticeTable();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      selectedRowsRef.current = selectedRows;
    },
    selectedRowKeys,
  };

  // const fetchInputData=(fieldName,value,index)=>
  const [handleChangeNoticeTable, NoticeTableJSX] = HookDataTable({
    loadFirst: false,
    isLoading,
    setIsLoading,
    save: false,
    perPageLablePagi: [
      t('columns.building_list.of'),
      t('columns.building_list.items'),
      t('columns.building_list.page'),
    ],
    showPagination: false,
    Get: async (params) => {
      if (params.date && params.buildingId) {
        const data = await massService.getList(params);
        dataInputTable.current = data.data;
        return data;
      } else {
        return { data: [], count: 0 };
      }
    },
    columns: ColumnMass({
      t,
      checkSubmit,
      fetchInputData: (fieldName, value, index) => {
        dataInputTable.current[index][fieldName] = value.toString().replaceAll('.', '');
      },
      selectedRowKeys,
    }),
    idElement: 'building-multiNotice',
    rowSelection: { ...rowSelection },
    showSearch: false,
    leftHeader: (
      <div className="mx-3">
        <DatePicker
          defaultValue={moment()}
          format={'YYYY-MM'}
          picker="month"
          className="mr-3 h-10 rounded-xl bg-white border border-solid border-gray-400 py-2 pl-4 ant-input"
          onChange={(time_momont, time_str) => {
            dateEffective.current = time_str + '-01';
            if (buildingEffective.current) {
              handleChangeNoticeTable({ date: time_str + '-01', buildingId: buildingEffective.current });
            }
          }}
        />
        <Select
          allowClear
          showSearch
          style={{ width: 208, marginRight: '12px', marginBottom: '8px' }}
          placeholder={t('Chọn tòa nhà')}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          onChange={(e) => {
            buildingEffective.current = e;
            if (dateEffective.current) {
              handleChangeNoticeTable({ date: dateEffective.current, buildingId: e });
            }
          }}
        >
          {buildingList?.map((ele, index) => (
            <Select.Option value={ele.value} key={index}>
              {ele.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    ),
    rightHeader: (
      <div className="mx-3 flex flex-col relative">
        <div>
          <button
            className="ml-5 bg-blue-500 text-white px-4 py-2.5 rounded-xl hover:bg-blue-400 inline-flex items-center"
            onClick={() => submitData()}
          >
            {t('Lập giấy báo')}
          </button>
        </div>
        {checkInputNull && (
          <div className="text-red-400 text-xs translate-y-4 whitespace-nowrap">{t('Vui Lòng nhập đủ dữ liệu !')}</div>
        )}
      </div>
    ),
  });

  const submitData = async () => {
    set_checkSubmit(true);
    let checkInputNull = false;
    const data = [];

    dataInputTable.current.forEach((ele) => {
      if (selectedRowKeys.includes(ele.id)) {
        if (!ele.waterNew || !ele.electricNew) {
          checkInputNull = true;
          set_checkInputNull(true);
          return false;
        } else {
          data.push({
            waterFirstIndex: ele.waterOld,
            waterLastIndex: ele.waterNew,
            electricityFirstIndex: ele.electricOld,
            electricityLastIndex: ele.electricNew,
            roomId: ele.roomId,
            id: ele.id,
          });
        }
      }
    });
    // submit
    if (!checkInputNull) {
      if (data.length) {
        await massService.postBatchCreate({ date: dateEffective.current, data });
        await getBuildingList();
      }
      set_checkInputNull(false);
    }
  };

  return [
    handleChangeNoticeTable,
    () => (
      <Fragment>
        {NoticeTableJSX()}
        {/* <button onChange={submitData} className="w-5 h-3 bg-blue-500">submitData</button> */}
      </Fragment>
    ),
  ];
};

export default Component;

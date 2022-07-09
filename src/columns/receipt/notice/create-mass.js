import React from 'react';
import { InputCustom } from 'columns/utils';
const Column = ({ t, checkSubmit, fetchInputData, selectedRowKeys }) => {
  return [
    // romNumber
    {
      name: 'romNumber',
      title: t('columns.admin.buildingInfo.Room Code'),
      tableItem: {
        align: 'center',
        width: 150,
        sorter: true,
      },
    },
    // Electric old
    {
      name: 'electricOld',
      title: t('Chỉ số điện cũ (kW)'),
      tableItem: {
        align: 'center',
        width: 250,
        sorter: true,
      },
    },
    // Electric new
    {
      name: 'electricNew',
      title: t('Chỉ số điện mới (kW)'),
      tableItem: {
        align: 'center',
        width: 250,
        sorter: true,
        onCell: () => ({ style: { paddingTop: '0' } }),
        render: (text, record, index) => (
          <InputCustom
            checkSubmit={selectedRowKeys.includes(index + 1) && checkSubmit}
            returnInputData={fetchInputData}
            name={'electricNew'}
            id={index}
          />
        ),
      },
    },

    // Water old
    {
      name: 'waterOld',
      title: t('Chỉ số nước cũ (m3)'),
      tableItem: {
        align: 'center',
        width: 250,
        sorter: true,
      },
    },
    // Water new
    {
      name: 'waterNew',
      title: t('Chỉ số nước mới (m3)'),
      tableItem: {
        align: 'center',
        width: 250,
        sorter: true,
        onCell: () => ({ style: { paddingTop: '0' } }),
        render: (text, record, index) => (
          <InputCustom
            checkSubmit={selectedRowKeys.includes(index + 1) && checkSubmit}
            returnInputData={fetchInputData}
            name={'waterNew'}
            id={index}
          />
        ),
        // {
        //   return ( <InputCustom/>
        // <div>
        //   <input placeholder="Nhập" className={classNames("mt-2 h-10 rounded-xl bg-white border border-solid border-gray-400 py-2 px-4 ant-input w-full text-center",!dataTable[index]?.waterNew&&"border-red-400")}
        //   onChange={(e) => {
        //     !dataTable[index]&&(dataTable[index]={});
        //     dataTable[index].waterNew = e.target.value;

        //     console.log(dataTable,index,"test")
        //     setTimeout(()=>set_datatable([...dataTable]),500)
        //   }}
        //   />
        //   {!dataTable[index]?.waterNew&&<p className={classNames("text-red-500 mb-0 fixed",)}>Không được bỏ trống</p>}
        // </div>
        // )
        //   }
      },
    },
  ];
};

export default Column;

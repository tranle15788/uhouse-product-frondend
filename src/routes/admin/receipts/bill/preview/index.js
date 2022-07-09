import React, { useState, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import billRoomDetail from './room';
import billDepositDetail from './deposit';
import { billService, billdeposit } from 'services/receipt';
/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = () => {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const pageType = URLSearch.get('type');
  const [BillRoomDetailJsx] = billRoomDetail();
  const [BillDepositDetailJsx] = billDepositDetail();
  const getBillDetail = async () => {
    let value;
    if (pageType === 'room') {
      value = await billService.getRoomBillDetail(location.state);
    } else if (pageType === 'deposit') {
      value = await billdeposit.getDepositBillDetail(location.state);
    }
    setData(value.data);
  };
  useEffect(() => {
    getBillDetail();
  }, []);

  return (
    <Fragment>
      <div className="mb-4 px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)] ">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 font-semibold text-base px-4">
          <span className="text-lg" id="test12314">
            {pageType === 'room' && t('Chi tiết phiếu thu tiền phòng')}
            {pageType === 'deposit' && t('Chi tiết phiếu thu tiền cọc')}
          </span>
        </div>
        {pageType === 'room' ? BillRoomDetailJsx(data) : BillDepositDetailJsx(data)}
        {/* { pageType==="deposit" ? BillDepositDetailJsx(data) : BillDepositDetailJsx()} */}
      </div>
    </Fragment>
  );
};
export default Page;

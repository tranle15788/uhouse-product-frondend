import React, { useState, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import InformationOnNotice from './info';
import { noticeService } from 'services/receipt';
/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = () => {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [InformationOnNoticeJsx] = InformationOnNotice();
  const location = useLocation();
  const getDetail = async () => {
    const { data } = await noticeService.getDetail(location.state);
    setData(data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Fragment>
      <div className="mb-4 px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)] ">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 font-semibold text-base px-4">
          <span className="text-lg" id="test12314">
            {t('Chi tiết giấy báo tiền phòng')}
          </span>
        </div>
        {InformationOnNoticeJsx(data)}
      </div>
    </Fragment>
  );
};
export default Page;

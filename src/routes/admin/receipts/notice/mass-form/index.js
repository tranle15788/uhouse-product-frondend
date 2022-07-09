import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import CreateMass from './create-mass';
/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [, CreateMassJsx] = CreateMass({ isLoading, setIsLoading });
  return (
    <Fragment>
      <div className="mb-4 px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)] ">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 font-semibold text-base px-4">
          <span className="text-lg">{t('Tạo giấy báo hàng loạt')}</span>
        </div>
        <div className="buildingList bg-white relative px-5 mb-7 min-h-[480px] rounded-b-xl pt-7">
          {CreateMassJsx()}
        </div>
      </div>
    </Fragment>
  );
};
export default Page;

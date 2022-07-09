import React, { useState, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TableRentedContract from './table-rent-contract/index';
import TableDepositContract from './deposit/index';
import './index.less';
import { useLocation } from 'react-router-dom';
import { LiquidatedContract, depositContract, rentedContract, appandixContract } from 'services/contract';
import TableLiquidatedContract from './liquidation/index';
import DetailAddendumContract from './addendum/index';
/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = () => {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const pageType = URLSearch.get('type');
  const code = URLSearch.get('code');
  const [ContractDepositJsx] = TableDepositContract();
  const [ContractRentalJsx] = TableRentedContract();
  const [LiquidatedContractJsx] = TableLiquidatedContract();
  const [AddendumContractJsx] = DetailAddendumContract();
  // const getData = async () => {
  //   let res;
  //   if (pageType === 'deposit') {
  //     res = await depositContract.getDepositContractByCode(code);
  //   } else if (pageType === 'rental') {
  //     res = await rentedContract.getRentalContractByCode(code);
  //   }
  //   else if (pageType === 'liquidated') {
  //     res = await LiquidatedContract.getLiquidatedContractByCode(code);
  //   }
  //   else {
  //     res = await appandixContract.getAddendumContractByCode(code);
  //   }
  //   setData(res.data);
  // }
  useEffect(() => {
    (async () => {
      let res;
      if (pageType === 'deposit') {
        res = await depositContract.getDepositContractByCode(code);
      } else if (pageType === 'rental') {
        res = await rentedContract.getRentalContractByCode(code);
      } else if (pageType === 'liquidated') {
        res = await LiquidatedContract.getLiquidatedContractByCode(code);
      } else {
        res = await appandixContract.getAddendumContractByCode(code);
      }
      setData(res.data);
    })();
  }, []);

  return (
    <Fragment>
      <div className="mb-4 px-7 drop-shadow-lg min-h-[calc(100vh-60px-64px-1.25rem)] ">
        <div className="bg-white h-16 rounded-t-xl flex justify-between items-center p-7 border-b-2 border-gray-300 font-semibold text-base px-4">
          <span className="text-lg" id="test12314">
            {pageType === 'deposit' && t('Hợp đồng cọc')}
            {pageType === 'rental' && t('Hợp đồng thuê')}
            {pageType === 'liquidated' && t('Hợp đồng thanh lý')}
            {pageType === 'appendix' && t('Phụ lục hợp đồng')}
          </span>
        </div>
        {pageType === 'deposit' && ContractDepositJsx(data)}
        {pageType === 'rental' && ContractRentalJsx(data)}
        {pageType === 'liquidated' && LiquidatedContractJsx(data)}
        {pageType === 'appendix' && AddendumContractJsx(data)}
      </div>
    </Fragment>
  );
};
export default Page;

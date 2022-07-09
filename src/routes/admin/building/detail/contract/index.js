import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import RentContract from './rent_contract/index';
import DepositContract from './deposit_contract/index';
import AppendixFurniture from './appendix/index';
import Liquidation from './liquidation/index';
import './index.less';

const Contract = ({ isLoading, setIsLoading, expenses, roomId, key, idBuilding, permissions }) => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const [keyContract, setKeyContract] = useState(convertTabToKey(URLSearch.get('subtab')));

  useEffect(() => {}, [key]);

  function convertTabToKey(params) {
    switch (params) {
      case 'deposit':
        return '1';
      case 'rental':
        return '2';
      case 'liquidated':
        return '3';
      case 'appendix':
        return '4';
      default:
        return '1';
    }
  }

  useEffect(() => {
    if (URLSearch.get('tab') === 'contract') {
      switch (URLSearch.get('subtab')) {
        case 'deposit':
          keyContract !== '1' && setKeyContract('1');
          break;
        case 'rental':
          keyContract !== '2' && setKeyContract('2');
          break;
        case 'liquidated':
          keyContract !== '3' && setKeyContract('3');
          break;
        case 'appendix':
          keyContract !== '4' && setKeyContract('4');
          break;
        default:
          // setSearchParams({subtab:"deposit",tab:"contract"});
          break;
      }
    }
  }, [location.search]);

  const [, RentContractJsx] = RentContract({ isLoading, setIsLoading, expenses, roomId, keyContract, idBuilding });
  const [, DepositContractJsx] = DepositContract({
    isLoading,
    setIsLoading,
    expenses,
    roomId,
    keyContract,
    idBuilding,
  });
  const [, AppendixFurnitureJsx] = AppendixFurniture({
    isLoading,
    setIsLoading,
    expenses,
    roomId,
    keyContract,
    idBuilding,
  });
  const [, LiquidationJSX] = Liquidation({ isLoading, setIsLoading, expenses, roomId, keyContract, idBuilding });

  const handleChangeTab = async (key) => {
    setKeyContract(key);
    switch (key) {
      case '1':
        setSearchParams({ tab: 'contract', subtab: 'deposit' });
        break;
      case '2':
        setSearchParams({ tab: 'contract', subtab: 'rental' });
        break;
      case '3':
        setSearchParams({ tab: 'contract', subtab: 'liquidated' });
        break;
      case '4':
        setSearchParams({ tab: 'contract', subtab: 'appendix' });
        break;
      default:
        break;
    }
  };

  return [
    () => {},
    () => (
      <Fragment>
        {/* onChange={handleChangeTab} activeKey={key}  */}
        {permissions?.XEM_QUAN_LY_DS_PHONG_TOA_NHA && (
          <Tabs key="1" defaultActiveKey="2" onChange={handleChangeTab} activeKey={keyContract}>
            <Tabs.TabPane key="1" tab={t('Hợp đồng cọc').toUpperCase()} disabled={!idBuilding}>
              {DepositContractJsx()}
            </Tabs.TabPane>

            <Tabs.TabPane key="2" tab={t('Hợp đồng cho thuê').toUpperCase()} disabled={!idBuilding}>
              {RentContractJsx()}
            </Tabs.TabPane>

            <Tabs.TabPane key="3" tab={t('Thanh lý hợp đồng').toUpperCase()} disabled={!idBuilding}>
              {LiquidationJSX()}
            </Tabs.TabPane>

            <Tabs.TabPane key="4" tab={t('Phụ lục hợp đồng').toUpperCase()} disabled={!idBuilding}>
              {AppendixFurnitureJsx()}
            </Tabs.TabPane>
          </Tabs>
        )}
      </Fragment>
    ),
  ];
};

export default Contract;

import React, { useState, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import buildService from 'services/building/building';
import { Form } from 'components';
import { Form as FormAnt } from 'antd';
import { ColumnBuilding } from 'columns/building';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { convertTypeBuilding } from 'routes/admin/building/utils';
import { linkApi } from 'variable';

const GeneralInfo = ({ idBuilding, setIdBuilding, setKindpage, kindpage, setOrganization, permissions, key }) => {
  const [form] = FormAnt.useForm();
  const [mount] = useState(false);
  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDetailBuildingChange = async () => {
    if (idBuilding) {
      const res = await buildService.buildingManagement.getBuildingDetail(idBuilding);
      setTitle(res.data.name);
      setData(res?.data);
      setOrganization(res?.data.organization);
    }
  };

  useEffect(() => {
    if (key.toString() === '1' && idBuilding) {
      handleDetailBuildingChange();
    }
  }, [idBuilding, key]);

  const submit = async (value) => {
    value = { ...value, name: value.name.trim() };
    if (!idBuilding) {
      const { data } = await buildService.buildingManagement.createBuilding(value);
      if (data) {
        navigate(location.pathname + '-' + data.id);
        setIdBuilding(data.id);
      }
    } else {
      await buildService.buildingManagement.updateBuilding(value, idBuilding);
    }
    handleDetailBuildingChange();
  };

  return [
    () => {
      switch (kindpage) {
        case 'editting':
          return t('routes.admin.building-info.Edit Building') + ' ' + title;
        case 'detail':
          return t('routes.admin.building-info.Building detail') + ' ' + title;
        default:
          return t('routes.admin.building-info.Create Building');
      }
    },
    handleDetailBuildingChange,
    () => (
      <Fragment>
        <div className="flex flex-col sm:flex-row">
          {/* side left */}
          <div className="w-auto h-full sm:w-1/2 z-10 flex flex-col mt-4 sm:items-start lg:w-1/3 ">
            <div className=" w-full  h-full  flex justify-center items-center pr-4">
              <img
                src={
                  idBuilding
                    ? data.media
                    : `${linkApi}/util/download?key=entity-service/building/default/landmark81-2.jpeg`
                }
                alt="background_building"
                className="rounded-lg mb-2 max-w-[430px] max-h-[350px] w-full h-full "
              />
            </div>

            {data && data.name && (
              <div className="flex w-48 mb:w-72 sm:w-72 justify-between pt-5 mx-auto mb-4">
                <div>
                  <h2 className="font-bold text-blue-600  text-center">{data?.totalRooms}</h2>
                  <span>{t('routes.admin.building-info.Room')}</span>
                </div>
                <div>
                  <h2 className="font-bold text-green-600  text-center"> {data?.emptyRooms}</h2>
                  <span>{t('routes.admin.building-info.Available')}</span>
                </div>
                <div>
                  <h2 className="font-bold text-red-600  text-center">{data?.rentedRooms}</h2>
                  <span>{t('routes.admin.building-info.Rented')}</span>
                </div>
              </div>
            )}
          </div>

          {/* side right */}
          <div className="building-detail-info w-full sm:w-1/2 lg:w-2/3 pb-5">
            <div className="flex justify-between mb-3">
              <div>
                <span className="font-bold">{/* {t("routes.admin.building-info.General Information")} */}</span>
              </div>
            </div>

            <div className={classNames(kindpage !== 'detail' && 'hidden')}>
              <div className="flex justify-between mb-3">
                <div>
                  <span className="font-bold">{t('routes.admin.building-info.General Information')}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-center items-center border-b-[1px] ">
                  <div className="w-1/3">
                    <span>{t('columns.admin.buildingInfo.Type')}</span>
                  </div>
                  <div className="w-2/3 p-2 border-l-[1px]">
                    <span>{convertTypeBuilding(data?.type, t)}</span>
                  </div>
                </div>

                <div className="flex justify-center items-center border-b-[1px]">
                  <div className="w-1/3">
                    <span>{t('columns.auth.register.Address')}</span>
                  </div>
                  <div className="w-2/3 p-2 border-l-[1px]">
                    <span>{data?.address}</span>
                  </div>
                </div>

                <div className="flex justify-center items-center border-b-[1px]">
                  <div className="w-1/3">
                    <span>{t('columns.admin.buildingInfo.Total Room')}</span>
                  </div>
                  <div className="w-2/3 p-2 border-l-[1px]">
                    <span>{data?.totalRooms}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* {permissions?.XEM_QUAN_LY_TTC_TOA_NHA ? */}

            <Form
              className={classNames('intro-x w-3/4 form-addnewRoom', kindpage === 'detail' && 'hidden')}
              columns={ColumnBuilding({ t })}
              textSubmit={t('components.form.modal.save')}
              handSubmit={submit}
              idSubmit={'button-addnewbuilding'}
              values={data}
              form={form}
            />
            {/* } */}
          </div>
        </div>
      </Fragment>
    ),
    mount,
  ];
};

export default GeneralInfo;

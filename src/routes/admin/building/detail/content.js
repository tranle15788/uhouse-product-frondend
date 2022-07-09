import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'components';
import { ColumnRoomContent } from 'columns/building/room';
import { ContentBuildingServices } from 'services/building/content';
import { Form as FormAnt } from 'antd';

const Content = ({ isLoading, setIsLoading, idBuilding, key, permissions }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState({ content: '', id: null });
  const [form] = FormAnt.useForm();

  useEffect(() => {
    if (idBuilding && key === '11') {
      getContent();
    }
  }, [key]);

  const getContent = async () => setContent(await ContentBuildingServices.get(idBuilding));
  // const [data, setData] = useState()

  return [
    () => (
      <div className="flex flex-col sm:flex-row">
        {permissions?.XEM_GIOI_THIEU_TOA_NHA && (
          <Form
            className="intro-x w-full"
            columns={ColumnRoomContent({ t })}
            textSubmit={t('columns.admin.profile.Save')}
            handSubmit={async (values) =>
              content?.id
                ? ContentBuildingServices.put(values, idBuilding)
                : ContentBuildingServices.post(values, idBuilding)
            }
            values={content}
            form={form}
          />
        )}
      </div>
    ),
  ];
};

export default Content;

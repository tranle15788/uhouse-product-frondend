import React, { useState, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'components';
import { ColumnRoomContent } from 'columns/building/room';
import { ContentRoomServices } from 'services/room/content';
import { Form as FormAnt } from 'antd';

const Content = ({ isLoading, setIsLoading, roomId, key, permissions }) => {
  const [content, setContent] = useState({ content: '', id: null });
  const [form] = FormAnt.useForm();

  const { t } = useTranslation();
  const getContent = async () => setContent(await ContentRoomServices.get(roomId));

  useEffect(() => {
    if (roomId && key === '11') {
      getContent();
    }
  }, [key]);

  return [
    () => (
      <Fragment>
        {' '}
        <div className="flex flex-col sm:flex-row">
          {permissions?.XEM_GIOI_THIEU_PHONG && (
            <Form
              className="intro-x w-full"
              columns={ColumnRoomContent({ t })}
              textSubmit={t('columns.admin.profile.Save')}
              handSubmit={async (values) =>
                content?.id ? ContentRoomServices.put(values, roomId) : ContentRoomServices.post(values, roomId)
              }
              values={content}
              form={form}
            />
          )}
        </div>
      </Fragment>
    ),
  ];
};

export default Content;

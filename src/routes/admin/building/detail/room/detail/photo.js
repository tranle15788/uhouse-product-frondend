import React, { Fragment } from 'react';
import { UtilServices } from 'services/util';
import { Upload } from 'components';
import { RoomService, roomMedias } from 'services/room';
import { Popconfirm } from 'antd';

const Photo = ({ isLoading, setIsLoading, idRoom, key, permissions, t, listRoomImage, setListRoomImage }) => {
  const categoryType = 'ROOM';
  const getListImageRoom = async () => {
    if (key === '6') {
      const listImgRes = await UtilServices.getMediaList(categoryType, idRoom);
      setListRoomImage(listImgRes);
    }
  };

  return (
    <Fragment>
      <div style={{ paddingRight: '110px' }}>
        <div className="relative opacity-0">
          <p className="h-10 w-full rounded-xl text-gray-600 bg-white border border-solid border-gray-100 pr-9 pl-4"></p>
        </div>
      </div>
      <div style={{ marginTop: '-42px' }} className="pb-4">
        {permissions?.XEM_QUAN_LY_ANH_DINH_KEM_PHONG && (
          <Upload
            loading={isLoading}
            right={true}
            showBtnUpload={permissions?.THEM_QUAN_LY_ANH_DINH_KEM_PHONG}
            showBtnDownload={() => permissions?.XUAT_FILE_QUAN_LY_ANH_DINH_KEM_PHONG}
            showBtnDelete={() => permissions?.XOA_QUAN_LY_ANH_DINH_KEM_PHONG}
            extendButton={(item) => (
              <Fragment>
                {item.mediaType === 'IMAGE' && !item.isDefault && (
                  <Popconfirm
                    placement="left"
                    title={t('routes.admin.building-info.Are you sure you choose photo avatar?')}
                    icon={<i className="las la-question-circle text-2xl text-red-500 bold absolute -top-0.5 -left-1" />}
                    onConfirm={async () => {
                      setIsLoading(true);
                      await roomMedias.putMediaAvatar(item.id);
                      await getListImageRoom();
                    }}
                    okText={t('components.datatable.ok')}
                    cancelText={t('components.datatable.cancel')}
                  >
                    {permissions?.SUA_QUAN_LY_ANH_DINH_KEM_PHONG && (
                      <button className="embed  text-xs rounded-lg mr-2">
                        <span className="las la-check-circle m-0 p-0 text-green-500 text-2xl" />
                      </button>
                    )}
                  </Popconfirm>
                )}
              </Fragment>
            )}
            accept={'video/*,image/*'}
            onChange={(params) => getListImageRoom(params)}
            action={async (file, config) =>
              await UtilServices.postUpload({ file, category: categoryType }, idRoom, config, setIsLoading)
            }
            value={listRoomImage}
            // deleteFile={async (fileId) => await buildService.buildingManagement.deleteMedia(fileId)}
            deleteFile={async (fileId) => {
              await RoomService.roomManagement.deletePhotoRoom(fileId, t);
              getListImageRoom();
            }}
          />
        )}
      </div>
    </Fragment>
  );
};
export default Photo;

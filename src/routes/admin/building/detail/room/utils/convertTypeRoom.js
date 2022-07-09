import React from 'react';
export const convertTypeRoom = (key, t) => {
  switch (key) {
    case 'DEPOSIT':
      return (
        <div className="bg-blue-100 rounded-md py-1 px-2 w-fit">
          <p className="text-blue-700 font-medium text-center text-sm">ĐÃ CỌC</p>
        </div>
      );
    // return t('routes.admin.room-info.deposit');
    case 'ALMOST_EXPIRED':
      return (
        <div className="bg-yellow-100 rounded-md py-1 px-2 w-fit">
          <p className="text-yellow-600 font-medium text-center text-sm">SẮP HẾT HẠN</p>
        </div>
      );
    // return t('routes.admin.room-info.almost expired');
    case 'RENT':
      return (
        <div className="bg-green-100 rounded-md py-1 px-2 w-fit">
          <p className="text-green-700 font-medium text-center text-sm">ĐÃ CHO THUÊ</p>
        </div>
      );
    // return t('routes.admin.room-info.rent');
    case 'EMPTY':
      return (
        <div className="bg-red-100 rounded-md py-1 px-2 w-fit">
          <p className="text-red-700 font-medium text-center text-sm">PHÒNG TRỐNG</p>
        </div>
      );
    // return t('routes.admin.room-info.empty');
    default:
      return '';
  }
};

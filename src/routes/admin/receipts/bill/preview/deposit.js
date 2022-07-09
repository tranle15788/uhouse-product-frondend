import React, { Fragment } from 'react';
import './index.less';
import moment from 'moment';
import { useAuth } from 'global';
import { formatNumber } from 'utils';
/// ////////////////////////////////////////////Page/////////////////////////////////////////////

const Page = () => {
  const { formatDate } = useAuth();
  return [
    (data) => (
      <Fragment>
        <div className="bg-white w-full p-4 text-black rounded-b-lg">
          <table width="100%" cellPadding="8">
            <tbody>
              <tr>
                <td align="center" colSpan="3">
                  <p className="mb-5 text-black">
                    <strong>Thông tin phiếu thu</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" colSpan="3">
                  <p className="mb-4">
                    <strong>NHÀ TRỌ {data?.buildingName.toUpperCase()}</strong>
                  </p>
                  <p className="mb-4">
                    <i> {data?.buidlingAdress}</i>
                  </p>
                  <p className="mb-3 text-black">
                    <strong>PHIẾU THU TIỀN CỌC</strong>
                  </p>
                  <p className="mb-5 text-black">
                    <strong>THÁNG {moment(data?.date).format(formatDate)}</strong>
                  </p>
                  <p className="mb-4">Mã {data?.code}</p>
                  <p>
                    <em>
                      NOTE: Phiếu thu này là một phần không thể tách rời của Giấy thông báo tiền phòng mã{' '}
                      {data?.housingExpenseCode}
                    </em>
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="table-cover p-5 rounded-2xl border-solid border-[1px] border-black ml-1 mr-1">
                    <table width="100%" cellSpacing="0" cellPadding="5" className="table">
                      <thead>
                        <tr>
                          <th className="th" colSpan="3" align="left">
                            <strong className="text-black">Thông tin phòng</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h4>Mã phòng:</h4>
                          </td>
                          <td>
                            <h4 className="font-semibold">{data?.room?.roomNumber}</h4>
                          </td>
                          <td>
                            <h4>Giá thuê:</h4>
                          </td>
                          <td className="text-right font-semibold">
                            <h4>{formatNumber(data?.room?.price)} đồng</h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h4>Người thuê nhà:</h4>
                          </td>
                          <td>
                            <h4 className="font-semibold">{data?.room?.tenantName}</h4>
                          </td>
                          <td>
                            <h4>Số tiền đặt cọc:</h4>
                          </td>
                          <td className="text-right font-semibold">
                            <h4>{formatNumber(data?.room?.deposit)} đồng</h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h4>Số người ở:</h4>
                          </td>
                          <td>
                            <h4 className="font-semibold">{data?.room?.numberOfTenants}</h4>
                          </td>
                          <td>
                            <h4>Số tiền cọc đã nhận:</h4>
                          </td>
                          <td className="text-right font-semibold">
                            <h4>{formatNumber(data?.room?.amountReceived)} đồng </h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <table width="100%" cellPadding="5">
                    <tbody>
                      <tr>
                        <td width="250px" className="font-semibold text-black">
                          Số tiền cọc đã thu:
                        </td>
                        <td width="300px" className="font-semibold text-black">
                          {data?.amountReceived ? formatNumber(data?.amountReceived) : 0} đồng
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-black">Nợ mới (số tiền nợ còn lại):</td>
                        <td className="font-semibold text-black">
                          {data?.newDebtAmount ? formatNumber(data?.newDebtAmount) : 0} đồng
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <b className="ml-1 ">Ghi chú: </b>
                  {data?.note ? data?.note : ''}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    ),
  ];
};
export default Page;

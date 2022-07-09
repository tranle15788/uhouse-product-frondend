import React from 'react';
import { formatCurrency, formatNumber } from 'utils';
import moment from 'moment';
import './index.less';
import { useAuth } from 'global';
export default function InformationOnNotice() {
  const { formatDate } = useAuth();

  return [
    (data) => (
      <div className="bg-white w-full detailNotice rounded-b-xl">
        <table width="100%" cellPadding="8">
          <tbody>
            <tr>
              <td align="center" colSpan="3">
                <h4 className="font-semibold mb-2 mt-4">Thông tin giấy báo tiền phòng</h4>
              </td>
            </tr>
            <tr>
              <td align="center" colSpan="3">
                <h4 className="font-bold leading-4 pt-4">{data?.buildingName?.toUpperCase()}</h4>
              </td>
            </tr>
            <tr>
              <td align="center" className="pt-0">
                <h4>
                  <i className="las la-map-marked-alt text-2xl pr-1"></i>
                  <i>{data?.buildingAddress}</i>
                </h4>
              </td>
            </tr>
            <tr>
              <td align="center">
                <h4 className="font-bold mt-1">GIẤY BÁO TIỀN PHÒNG</h4>
              </td>
            </tr>
            <tr>
              <td align="center" className="p-0">
                {' '}
                <p className="font-semibold mt-1">THÁNG {moment(data?.date).format(formatDate)}</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p className="mb-6">Mã {data?.code}</p>
              </td>
            </tr>
            <tr className="bg-neutral-100 table-info">
              <td colSpan="3">
                <table width="100%" className="table-info">
                  <thead>
                    <tr>
                      <th colSpan="3" align="left">
                        <p className="font-bold mt-2 mb-3 ml-2.5">THÔNG TIN PHÒNG</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="info">
                    <tr>
                      <td>
                        <div className="border border-solid bg-white py-5 px-9">
                          <table width="100%">
                            <tbody className="border-solid">
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
                                  <h4>{formatCurrency(data?.room?.price, '')} đồng</h4>
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
                                  <h4>{formatCurrency(data?.deposit, '')} đồng</h4>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h4>Số người ở:</h4>
                                </td>
                                <td>
                                  <h4 className="font-semibold">{data?.room?.numTenants}</h4>
                                </td>
                                <td>
                                  <h4>Số tiền cọc đã nhận:</h4>
                                </td>
                                <td className="text-right font-semibold">
                                  <h4>
                                    {data?.depositAmountReceived === null
                                      ? 0
                                      : formatCurrency(data?.depositAmountReceived, '')}{' '}
                                    đồng{' '}
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="bg-white table-info">
              <td colSpan="3">
                <table width="100%">
                  <thead>
                    <tr>
                      <th colSpan="3" align="left">
                        <p className="font-bold mt-2 mb-3 ml-2.5">CÁC CHI PHÍ</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="info">
                    <tr>
                      <td>
                        <div className="border border-solid bg-white py-5 px-9">
                          <table width="100%">
                            <tbody className="border-solid border-white">
                              {/* rent - water */}
                              <tr>
                                <td>
                                  <h4>Tiền thuê:</h4>
                                </td>
                                <td>
                                  <h4 className="font-semibold">
                                    {formatCurrency(data?.expenses?.rentalAmount, '')} đồng
                                  </h4>
                                </td>
                                <td>
                                  <h4>Tiền nước:</h4>
                                </td>
                                <td className="text-right font-semibold">
                                  <h4>{formatCurrency(data?.expenses?.electricWaterDetail[1]?.amount, '')} đồng</h4>
                                </td>
                              </tr>
                              {/* electric- firstIndex */}
                              <tr>
                                <td>
                                  <h4>Tiền điện:</h4>
                                </td>
                                <td>
                                  <h4 className="font-semibold">
                                    {formatCurrency(data?.expenses?.electricWaterDetail[0]?.amount, '')} đồng
                                  </h4>
                                </td>
                                <td>
                                  <h4 className="ml-8">_Chỉ số mới:</h4>
                                </td>
                                <td>
                                  <h4 className="font-semibold ml-8">
                                    {formatNumber(data?.expenses?.electricWaterDetail[1]?.firstIndex)}
                                  </h4>
                                </td>
                              </tr>
                              {/* firstIndex- lastIndex */}
                              <tr>
                                <td>
                                  <h4 className="ml-8">_Chỉ số mới:</h4>
                                </td>
                                <td>
                                  <h4 className="font-semibold ml-8">
                                    {formatNumber(data?.expenses?.electricWaterDetail[0]?.firstIndex)}
                                  </h4>
                                </td>
                                <td>
                                  <h4 className="ml-8">_Chỉ số cũ:</h4>
                                </td>
                                <td>
                                  <h4 className="font-semibold ml-8">
                                    {formatNumber(data?.expenses?.electricWaterDetail[1]?.lastIndex)}
                                  </h4>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h4 className="ml-8">_Chỉ số cũ:</h4>
                                </td>
                                <td>
                                  <h4 className="font-semibold ml-8">
                                    {formatNumber(data?.expenses?.electricWaterDetail[0]?.lastIndex)}
                                  </h4>
                                </td>
                                {/* table 0 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 0 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[0]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 0 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[0]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              {/* table  1-2 */}
                              <tr>
                                {/* table 1 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 1 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[1]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 1 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[1]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                {/* table 2 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 2 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[2]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 2 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[2]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              {/* table  3-4 */}
                              <tr>
                                {/* table 3 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 3 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[3]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 3 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[3]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                {/* table 4 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 4 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[4]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 4 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[4]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              {/* table  5-6 */}
                              <tr>
                                {/* table 5 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 5 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[5]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 5 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[5]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                {/* table 6 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 6 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[6]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 6 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[6]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              {/* table  7-8 */}
                              <tr>
                                {/* table 7 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 7 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[7]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 7 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[7]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                {/* table 8 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 8 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[8]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 8 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[8]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              {/* table  9-10 */}
                              <tr>
                                {/* table 9 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 9 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[9]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 9 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[9]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                {/* table 10 */}
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 10 ? (
                                        <tr>
                                          <td>
                                            <h4>{data?.expenses?.cost[10]?.name}:</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <table width="100%">
                                    <tbody>
                                      {data?.expenses?.cost.length > 10 ? (
                                        <tr>
                                          <td className="text-right font-semibold">
                                            <h4>{formatCurrency(data?.expenses?.cost[10]?.unitPrice, '')} đồng</h4>
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="bg-neutral-100 table-info">
              <td colSpan="3">
                <table width="100%" className="table-info">
                  <thead>
                    <tr>
                      <th colSpan="3" align="left">
                        <p className="font-bold mt-2 mb-3 ml-2.5">CÁC CHI PHÍ KHÁC</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="info">
                    <tr>
                      <td>
                        <div className="bg-white div-border">
                          <table width="100%" cellSpacing="3" cellPadding="7" border="true">
                            <thead>
                              <tr>
                                <th width="65px" align="center">
                                  STT
                                </th>
                                <th align="center">Tên chi phí</th>
                                <th align="center">Số tiền</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.otherExpense.map((index, i) => (
                                <tr key={i}>
                                  <td align="center">{i + 1}</td>
                                  <td align="center">{index.name}</td>
                                  <td align="center">{formatCurrency(index.price, '')}</td>
                                </tr>
                              ))}
                              <tr>
                                <th colSpan="2">
                                  <p>
                                    <b>Tổng cộng</b>
                                  </p>
                                </th>
                                <th align="center">
                                  <h4>
                                    <b>{formatCurrency(data?.totalOtherExpense, '')}</b>
                                  </h4>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <div className="mx-7">
                  <table width="100%" cellPadding="5">
                    <tbody>
                      <tr>
                        <td width="250px">
                          <p className="font-medium">Nợ cũ:</p>
                        </td>
                        <td>
                          <h4 className="font-bold">{formatCurrency(data?.oldDebtAmount, '')}</h4>
                        </td>
                      </tr>
                      <tr>
                        <td width="250px">
                          <p className="font-medium">Giảm giá (phần trăm):</p>
                        </td>
                        <td>
                          <h4 className="font-bold">{formatNumber(data?.percentageDiscount)} %</h4>
                        </td>
                      </tr>
                      <tr>
                        <td width="250px">
                          <p className="font-medium">Giảm giá (số tiền):</p>
                        </td>
                        <td>
                          <h4 className="font-bold">
                            {data?.amountDiscount === null ? 0 : formatCurrency(data?.amountDiscount, '')} đồng
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td width="250px">
                          <p className="font-bold">Tổng số tiền phải thu:</p>
                        </td>
                        <td>
                          <h4 className="font-bold">{formatCurrency(data?.totalAmount, '')} đồng</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table width="100%" cellPadding="5" className="mt-7">
                    <tbody>
                      <tr>
                        <td width="100px" valign="top">
                          <p className="font-bold leading-8">Ghi chú:</p>
                        </td>
                        <td valign="top">
                          <p className="leading-8 whitespace-pre-wrap">{data?.note}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mx-7 mt-10 mb-20 list">
                  <p className="font-bold mb-4">Danh sách giao dịch liên quan</p>
                  <table width="100%" cellSpacing="3" cellPadding="7" border="true">
                    <thead>
                      <tr>
                        <th>
                          <p className="font-semibold">Mã phiếu thu</p>
                        </th>
                        <th>
                          <p className="font-semibold">Số tiền đã thu</p>
                        </th>
                        <th>
                          <p className="font-semibold">Nợ mới</p>
                        </th>
                        <th>
                          <p className="font-semibold">Trạng thái phiếu thu</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.relatedTransactions.map((index) => (
                        <tr key={index.code}>
                          <td align="center">{index.code}</td>
                          <td align="center">{formatCurrency(index.amountReceived, '')}</td>
                          <td align="center">{formatCurrency(index.newDebtAmount, '')}</td>
                          <td align="center">{index.status === 'ACTIVATE' ? 'Đang hoạt động' : 'Hủy hoạt động'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  ];
}

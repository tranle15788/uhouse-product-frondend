import moment from 'moment';
import { useAuth } from 'global';
import { depositContract } from 'services/contract';
import React, { useState } from 'react';
import { formatCurrency } from 'utils';
import '../index.less';
export default function TableDepositContract() {
  const { formatDate } = useAuth();
  const [signcontract, setSignContract] = useState(false);

  return [
    (data) => (
      <div className="bg-white w-full p-4 text-black">
        <table width="100%" cellPadding="8">
          <tbody>
            <tr>
              <td align="center" colSpan="3">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM <br />
                Độc lập - Tự do - Hạnh phúc <br />
                --------------------
              </td>
            </tr>
            <tr>
              <td align="center" colSpan="3">
                <strong>HỢP ĐỒNG CỌC TIỀN NHÀ</strong>
                <p>Mã Hợp Đồng: {data?.depositContractCode} </p>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <p className="description">
                  Hôm nay ngày {data?.createdAt && moment(data?.createdAt).format(formatDate)} tại {data?.address}.
                  Chúng tôi gồm:
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table width="100%" cellPadding="5">
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <strong>BÊN A - CHỦ NHÀ - BÊN NHẬN CỌC</strong>
                      </td>
                    </tr>

                    <tr>
                      <td>Họ và tên: {data?.lessor?.name} </td>
                      <td>Số điện thoại: {data?.lessor?.phoneNumber} </td>
                      <td>Email: {data?.lessor?.email} </td>
                    </tr>
                    <tr>
                      <td>
                        Sinh ngày:{' '}
                        {data?.lessor?.dateOfBirthday && moment(data?.lessor?.dateOfBirthday).format(formatDate)}{' '}
                      </td>
                      <td>Tài khoản ngân hàng: {data?.lessor?.accountBank} </td>
                      <td>Tên ngân hàng: {data?.lessor?.bank} </td>
                    </tr>
                    <tr>
                      <td>CMND/CCCD/Passport: {data?.lessor?.identityCard} </td>
                      <td> Nơi cấp:{data?.lessor?.icPlace} </td>
                      <td>Cấp ngày: {data?.lessor?.icDate && moment(data?.lessor?.icDate).format(formatDate)}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table width="100%" cellPadding="5">
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <strong>BÊN B – NGƯỜI THUÊ – BÊN ĐẶT CỌC </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Họ và tên: {data?.depositor?.name}</td>
                      <td>Số điện thoại: {data?.depositor?.phoneNumber}</td>
                      <td>Email: {data?.depositor?.email}</td>
                    </tr>
                    <tr>
                      <td>
                        Sinh ngày:{' '}
                        {data?.depositor?.dateOfBirthday && moment(data?.depositor?.dateOfBirthday).format(formatDate)}
                      </td>
                      <td colSpan="2">Địa chỉ: </td>
                    </tr>
                    <tr>
                      <td>CMND/CCCD/Passport: {data?.depositor?.identityCard}</td>
                      <td>Nơi cấp: {data?.depositor?.icPlace}</td>
                      <td>
                        Cấp ngày: {data?.depositor?.icDate && moment(data?.depositor?.icDate).format(formatDate)}{' '}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            {data?.housingBroker !== undefined && (
              <tr>
                <td colSpan="3">
                  <table width="100%" cellPadding="5">
                    <tbody>
                      <tr>
                        <td colSpan="3">
                          <strong>BÊN C – MÔI GIỚI – NGƯỜI LÀM CHỨNG </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Họ và tên: {data?.housingBroker?.name}</td>
                        <td>Số điện thoại: {data?.housingBroker?.identityCard}</td>
                        <td>Email: {data?.housingBroker?.email}</td>
                      </tr>
                      <tr>
                        <td>
                          Sinh ngày:{' '}
                          {data?.housingBroker?.dateOfBirthday &&
                            moment(data?.housingBroker?.dateOfBirthday).format(formatDate)}
                        </td>
                        <td colSpan="2">Địa chỉ:</td>
                      </tr>
                      <tr>
                        <td>CMND/CCCD/Passport: {data?.housingBroker?.identityCard}</td>
                        <td>Nơi cấp:{data?.housingBroker?.icPlace}</td>
                        <td>
                          Cấp ngày:{' '}
                          {data?.housingBroker?.icDate && moment(data?.housingBroker?.icDate).format(formatDate)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="3" className="ml-2">
                <strong>Sau khi thương lượng, bên A vs bên B đồng ý ký hợp đồng cọc căn hộ như sau:</strong>
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table width="100%" cellPadding="5">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <strong>ĐIỀU 1: TÀI SẢN CHO THUÊ </strong>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>Số căn hộ: {data?.roomDto?.roomNumber} </td>
                      <td>Diện tích: {data?.roomDto?.acreage ? formatCurrency(data?.roomDto?.acreage, '') : ''}</td>
                    </tr>
                    <tr>
                      <td>Giá thuê: {data?.roomDto?.price ? formatCurrency(data?.roomDto?.price, '') : ''} VNĐ</td>
                      <td>
                        Thời hạn thuê trong vòng {data?.roomDto?.rentalTerm} tháng, từ ngày{' '}
                        {data?.fromDate && moment(data?.fromDate).format(formatDate)} đến ngày{' '}
                        {moment(data?.endDate).format(formatDate)}{' '}
                      </td>
                    </tr>
                    <tr>
                      <td>Trang bị nội thất: Xem phụ lục</td>
                      <td>Mục đích sử dụng: Thuê để ở/Kinh doanh với số người: {data?.roomDto?.tenant}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Quy định tòa nhà: Xem phụ lục</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table cellPadding="3" width="100%">
                  <tbody>
                    <tr>
                      <td>
                        <strong>ĐIỀU 2: CÁC LOẠI PHÍ</strong>
                        <br />
                      </td>
                    </tr>
                    {data?.costs?.map((ele, index) => (
                      <tr key={index}>
                        <td>
                          <strong> 2.{index + 1} </strong> {ele?.name} :{' '}
                          {ele?.unitPrice ? formatCurrency(ele?.unitPrice, '') : ''} VNĐ/tháng <br />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table cellPadding="3" width="100%">
                  <tbody>
                    <tr>
                      <td>
                        <strong>ĐIỀU 3 : QUYỀN VÀ NGHĨA VỤ CỦA BÊN THUÊ</strong>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3.1 </strong>Bên B đã cọc cho Bên A số tiền là:{' '}
                        {data?.depositNumber ? formatCurrency(data?.depositNumber, '') : ''} đồng để thuê căn hộ tại
                        Điều 1
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3.2 </strong>Bên A cam kết sẽ giữ căn hộ cho Bên B trong {data?.depositDay} ngày kể từ
                        ngày Bên A ký
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3.3 </strong>Nếu bên A không tiến hành các thủ tục để hai bên ký hợp đồng thuê trong
                        vòng {data?.depositDay} ngày kể từ ngày bên A ký thì coi như bên A phải chịu mất cọc
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3.4 </strong>Nếu bên B thay đổi ý định và không thực hiện việc kí kết hợp đồng thuê với
                        bên A đúng thời hạn thì bên B phải chịu đền bù gấp đôi số tiền đặt cọc
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table cellPadding="3" width="100%">
                  <tbody>
                    <tr>
                      <td>
                        <strong>ĐIỀU 4: GHI CHÚ KHÁC</strong>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>- </strong>Khi trao trả lại phòng thuê cho Bên A, khách hàng đồng thời phải bàn giao lại
                        các thiết bị đang hoạt động tốt và hiện trạng phòng thuê được vệ sinh như lúc được nhận không
                        gian thuê ban đầu.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>- </strong>Mọi thay đổi, hư hỏng, mất mát, vệ sinh khách hàng phải chịu trách nhiệm sửa
                        chữa, khắc phục như hiện trạng để Bên A kiểm tra đồng ý xác nhận thì khách hàng mới hoàn tất
                        được việc giao trả không gian thuê và được nhận lại số tiền đã đặt cọc.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table cellPadding="3" width="100%">
                  <tbody>
                    <tr>
                      <td>
                        <strong>CAM KẾT CHUNG:</strong>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>Hai bên nhất trí thỏa thuận và cam kết thi hành nghĩa vụ hợp đồng</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" colSpan="2"></td>
            </tr>
            <tr>
              <td align="center" width="400px">
                <strong>Bên A</strong> <br />
                {!signcontract && data?.status === 'CREATE_NEW' ? (
                  <button
                    className="ml-2 ant-btn ant-btn-default"
                    onClick={() => setSignContract(async () => await depositContract.lessorSignContract(data?.id))}
                  >
                    Ký tên
                  </button>
                ) : (
                  <div>
                    <em>(Ký tên)</em> <br />
                    <p>{data?.lessor?.signIn}</p>
                  </div>
                )}
              </td>
              <td></td>
              <td align="center">
                <strong>Bên B</strong> <br />
                {data?.status === 'SIGNED_BY_GUESS' && (
                  <div>
                    <em>(Ký tên)</em> <br />
                    <p>{data?.depositor?.signIn}</p>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr align="center">
              {data?.status === 'SIGNED_BY_GUESS' && (
                <td colSpan="3">
                  <button className="ml-2 ant-btn ant-btn-default ">In</button>
                  <button className="ml-2 ant-btn ant-btn-default">Xuất hợp đồng</button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    ),
  ];
}

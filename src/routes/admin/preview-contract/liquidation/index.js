import moment from 'moment';
import { useAuth } from 'global';
import { formatCurrency } from 'utils';
import React, { useState } from 'react';
import { LiquidatedContract } from 'services/contract/index';
import '../index.less';
export default function TableLiquidatedContract() {
  const { formatDate } = useAuth();
  const [signContract, setSignContract] = useState(false);
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
                <strong>BIÊN BẢN THANH LÝ HỢP ĐỒNG THUÊ NHÀ</strong>
                <p>Mã Hợp Đồng: {data?.code}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <p className="description">
                  Hôm nay ngày {moment(data?.signDate).format(formatDate)} tại địa chỉ {data?.signAddress}. Chúng tôi
                  gồm:
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table width="100%" cellPadding="5">
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <strong>Bên cho thuê (Bên A):</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Họ và tên: {data?.lessor?.name}</td>
                      <td>Số điện thoại: {data?.lessor?.phoneNumber}</td>
                      <td>Email: {data?.lessor?.email} </td>
                    </tr>
                    <tr>
                      <td>CMND/CCCD/Passport: {data?.lessor?.identityCard}</td>
                      <td>Cấp ngày: {data?.lessor?.icDate && moment(data?.lessor?.icDate).format(formatDate)}</td>
                      <td>Nơi cấp: {data?.lessor?.icPlace}</td>
                    </tr>
                    <tr>
                      <td colSpan="3">Nơi ĐKTT: {data?.lessor?.address}</td>
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
                        <strong>Bên thuê (Bên B): </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Họ và tên: {data?.tenant?.name}</td>
                      <td>Số điện thoại: {data?.tenant?.phoneNumber}</td>
                      <td>Email: {data?.tenant?.email}</td>
                    </tr>
                    <tr>
                      <td>CMND/CCCD/Passport: {data?.tenant?.identityCard}</td>
                      <td>Cấp ngày: {data?.tenant?.icDate && moment(data?.tenant?.icDate).format(formatDate)}</td>
                      <td>Nơi cấp: {data?.tenant?.icPlace}</td>
                    </tr>
                    <tr>
                      <td colSpan="3">Nơi ĐKTT: {data?.tenant?.address}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <strong>Căn cứ vào hợp đồng thuê phòng có mã {data?.rentedContractCode}:</strong>
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                - Hai bên đồng ý thanh lý hợp đồng thuê nhà từ ngày{' '}
                {data?.liquidateFromDate && moment(data?.liquidateFromDate).format(formatDate)}.
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                - Kể từ ngày hợp đồng thanh lý này được hai bên ký kết thì hợp đồng thuê nhà nêu trên không còn giá trị
                nữa.
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                - Đồng thời, căn cứ theo hợp đồng cọc có mã {data?.depositContractCode}, bên A đã nhận số tiền cọc từ
                bên B là {data?.deposit ? formatCurrency(data?.deposit, '') : ''} đồng.
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <strong>Các khoản khấu trừ:</strong>
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <table width="100%" className="table" border="true" cellSpacing="0" cellPadding="3">
                  <thead>
                    <tr>
                      <th width="20px">STT</th>
                      <th>Nội dung</th>
                      <th align="right" width="350px">
                        Số tiền(VND)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.depreciation?.map((ele, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ele.description}</td>
                        <td align="right">{ele.price && ele.price ? formatCurrency(ele.price, '') : ''}</td>
                      </tr>
                    ))}
                    <tr>
                      <th colSpan="2">Tổng cộng</th>
                      <td align="right">
                        {data?.totalDepreciation ? formatCurrency(data?.totalDepreciation, '') : ''}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                Sau khi thống nhất, bên A sẽ thanh toán lại cho bên B số tiền cọc là{' '}
                {data?.totalRefund ? formatCurrency(data?.totalRefund, '') : '0'} đồng.
              </td>
            </tr>
            <tr>
              <td colSpan="3">Chúng tôi đã đọc và hiểu rõ nội dung hợp đồng thanh lý và đồng ý ký tên.</td>
            </tr>
            <tr>
              <td colSpan="3">Biên bản hợp đồng này sau khi ký tên sẽ có giá trị theo luật định.</td>
            </tr>
            <tr>
              <td align="center" colSpan="2"></td>
            </tr>
            <tr>
              <td align="center" width="400px">
                <strong>Bên A</strong> <br />
                {!signContract && data?.status === 'CREATE_NEW' ? (
                  <button
                    className="ml-2 ant-btn ant-btn-default"
                    onClick={() => setSignContract(async () => await LiquidatedContract.lessorSignContract(data?.code))}
                  >
                    Ký tên
                  </button>
                ) : (
                  <div>
                    <em>(Ký tên)</em> <br />
                    <p>
                      Hợp đồng được ký bởi {data?.lessor?.name} ngày{' '}
                      {data?.signByLessorDate !== null
                        ? moment(data?.signByLessorDate).format(formatDate)
                        : moment().format(formatDate)}
                    </p>
                  </div>
                )}
              </td>
              <td></td>
              <td align="center">
                <strong>Bên B</strong> <br />
                {data?.status === 'SIGNED_BY_GUESS' && (
                  <div>
                    <em>(Ký tên)</em> <br />
                    <p>
                      Hợp đồng được ký bởi {data?.tenant?.name} ngày{' '}
                      {data?.signByTenantDate && moment(data?.signByTenantDate).format(formatDate)}
                    </p>
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
                  <button className="ml-2 ant-btn ant-btn-default">In</button>
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

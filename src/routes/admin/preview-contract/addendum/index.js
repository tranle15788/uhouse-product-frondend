import moment from 'moment';
import { useAuth } from 'global';
import '../index.less';
import React, { useState } from 'react';
import { appandixContract } from 'services/contract/index';
export default function DetailAddendumContract() {
  const { formatDate } = useAuth();
  const [signContract, setSignContract] = useState(false);

  return [
    (data) => (
      <div className="bg-white w-full p-4 text-black">
        <table className="description" width="100%" cellPadding="8">
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
                <h1 className="titleContract">PHỤ LỤC 1 HỢP ĐỒNG THUÊ PHÒNG</h1>
                <br />
                <p>Mã Hợp Đồng: {data?.code}</p>
                <br />
                <strong>
                  GIA HẠN HỢP ĐỒNG
                  <br /> MÃ SỐ PHÒNG: {data?.roomNumber}{' '}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <p className="description">
                  Thỏa thuận này được lập ngày {moment(data?.effectiveDate).format(formatDate)} tại {data?.place}. Chúng
                  tôi gồm:
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
                      <td>Email: {data?.lessor?.email}</td>
                    </tr>
                    <tr>
                      <td>CMND/CCCD/Passport: {data?.lessor?.identityCard}</td>
                      <td>Cấp ngày: {moment(data?.lessor?.icDate).format(formatDate)}</td>
                      <td>Nơi cấp: {data?.lessor?.icPlace}</td>
                    </tr>
                    <tr>
                      <td colSpan="3">Hiện là chủ tòa nhà: {data?.buildingName}</td>
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
                      <td>Cấp ngày: {moment(data?.tenant?.icDate).format(formatDate)}</td>
                      <td>Nơi cấp: {data?.tenant?.icPlace}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                Sau khi xem xét, thỏa thuận hai bên đã đi đến thống nhất ký Phụ lục hợp đồng số 01 về{' '}
                <strong>GIA HẠN</strong> đối với Hợp đồng cho thuê đã ký số {data?.rentalContractCode}, ngày{' '}
                {moment(data?.signByLessorDate).format(formatDate)}, cụ thể như sau:
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                - Bên B hiện đang thuê phòng số {data?.roomNumber} tại địa chỉ {data?.buildingAddress}.
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                - Thời hạn <strong>GIA HẠN</strong> thuê phòng là {data?.rentalTerm}, bắt đầu từ{' '}
                {moment(data?.fromDate).format(formatDate)} đến hết ngày {moment(data?.toDate).format(formatDate)}. Thời
                hạn này có thể được gia hạn thêm tùy theo sự thỏa thuận của hai bên trước ngày kết thúc 30 ngày.
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <strong>ĐIỀU KHOẢN CHUNG:</strong>
                <br />
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                Quyền và nghĩa vụ của mỗi bên được quy định trong hợp đồng số {data?.rentalContractCode}.
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                Phụ lục hợp đồng được lập thành {data?.numberOfContracts} bản, có nội dung và giá trị pháp lý như nhau,
                mỗi bên giữ {data?.eachSideNumber} bản.
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                Phụ lục này là 1 phần không thể tách rời của Hợp đồng cho thuê số {data?.rentalContractCode} và có giá
                trị kể từ ngày {moment(data?.rentalContractCreatedAt).format(formatDate)}.
              </td>
            </tr>
            <tr>
              <td colSpan="3">Chúng tôi đã đọc và hiểu rõ nội dung hơp đồng thanh lý này và đồng ý ký tên.</td>
            </tr>
            <tr>
              <td colSpan="3">
                Biên bản (Hợp đồng) này sau khi đã xác nhận kí tên, sẽ có giá trị pháp lý theo luật định.
              </td>
            </tr>
            <tr>
              <td align="center" colSpan="3"></td>
            </tr>
            <tr>
              <td align="center" width="400px">
                <strong>Bên A</strong> <br />
                {!signContract && data?.status === 'CREATE_NEW' ? (
                  <button
                    className="ml-2 ant-btn ant-btn-default"
                    onClick={async () => {
                      const sign = await appandixContract.lessorSignContract(data?.code);
                      setSignContract(sign);
                    }}
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

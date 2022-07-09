import { HookModal } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'global';
import moment from 'moment';
import { formatCurrency } from 'utils';
import React, { useState } from 'react';

const Preview = ({ onOK, typeContract = 'liquid' }) => {
  const { t } = useTranslation();
  const { formatDate } = useAuth();
  const [isLoading, setIsLoading] = useState(null);

  const [handleShow, PreviewJSX, , data] = HookModal({
    title: () => t('Xem trước hợp đồng'),
    widthModal: 1000,
    // GetById:()=>LiquidatedContract.preview(),
    onOK,
    isLoading,
    setIsLoading,
  });
  return [
    () => (
      <div>
        {PreviewJSX(() => (
          <div>
            {typeContract === 'liquid' && (
              <div className="bg-white w-full p-4">
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
                          Hôm nay ngày {moment(data?.signDate).format(formatDate)} tại địa chỉ {data?.signAddress}.
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
                              <td>
                                Cấp ngày: {data?.lessor?.icDate && moment(data?.lessor?.icDate).format(formatDate)}
                              </td>
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
                              <td>
                                Cấp ngày: {data?.tenant?.icDate && moment(data?.tenant?.icDate).format(formatDate)}
                              </td>
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
                        <strong>Căn cứ vào hợp đồng thuê phòng có mã {data?.rentalContractCode}:</strong>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        - Hai bên đồng ý thanh lý hợp đồng thuê nhà từ ngày{' '}
                        {moment(data?.liquidateFromDate).format(formatDate)}. Kể từ ngày hợp đồng thanh lý này được hai
                        bên ký kết thì hợp đồng thuê nhà nêu trên không còn giá trị nữa.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        - Đồng thời, căn cứ theo hợp đồng cọc có mã {data?.depositContractCode}, bên A đã nhận số tiền
                        cọc từ bên B là {data?.deposit ? formatCurrency(data?.deposit, '') : ''} đồng.
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
                                <td align="right">{ele.price ? formatCurrency(ele.price, '') : ''}</td>
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
                        Sau khi thống nhất, bên A sẽ thanh toán lại cho bên B số tiền cọc là {data?.totalRefund} đồng.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        Chúng tôi đã đọc và hiểu rõ nội dung hợp đồng thanh lý và đồng ý ký tên.
                        <br />
                        Biên bản hợp đồng này sau khi ký tên sẽ có giá trị theo luật định.
                      </td>
                    </tr>
                    <tr>
                      <td align="center" colSpan="2"></td>
                      <td align="center">
                        <strong>..., ngày ... tháng ... năm ... </strong>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Bên A</strong> <br />
                        {/* {!signContract &&
                    <button className='ml-2 ant-btn ant-btn-default' onClick={() =>
                      setSignContract(async () => await LiquidatedContract.lessorSignContract(data?.code))} >Ký tên</button>
                  }
                {signContract &&
                     <div>
                     <em>(Ký tên)</em> <br />
                     <p>Hợp đồng được ký bởi {data?.lessor?.name} ngày {}</p>
                   </div>
                 } */}
                      </td>
                      <td></td>
                      <td align="center">
                        <strong>Bên B</strong> <br />
                        <em>(Ký tên)</em> <br />
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
                  </tbody>
                </table>
              </div>
            )}
            {typeContract === 'extention' && (
              <div className="bg-white w-full p-4">
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
                          Thỏa thuận này được lập ngày {moment(data?.effectiveDate).format(formatDate)} tại{' '}
                          {data?.place}:
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
                              <td>
                                Cấp ngày: {data?.lessor?.icDate && moment(data?.lessor?.icDate).format(formatDate)}
                              </td>
                              <td>Nơi cấp: {data?.lessor?.icPlace}</td>
                            </tr>
                            <tr>
                              <td colSpan="3">Hiện là chủ tòa nhà: {data?.building?.name}</td>
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
                              <td>
                                Cấp ngày: {data?.tenant?.icDate && moment(data?.tenant?.icDate).format(formatDate)}
                              </td>
                              <td>Nơi cấp: {data?.tenant?.icPlace}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        Sau khi xem xét, thỏa thuận hai bên đã đi đến thống nhất ký Phụ lục hợp đồng số 01 về{' '}
                        <strong>GIA HẠN</strong> đối với Hợp đồng cho thuê đã ký số {data?.rentalCode}, ngày{' '}
                        {moment(data?.signByLessorDate).format(formatDate)}, cụ thể như sau:
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        - Bên B hiện đang thuê phòng số {data?.roomId} tại địa chỉ {data?.building?.address}.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        - Thời hạn <strong>GIA HẠN</strong> thuê phòng là {data?.rentalTerm}, bắt đầu từ{' '}
                        {moment(data?.fromDate).format(formatDate)} đến hết ngày{' '}
                        {moment(data?.toDate).format(formatDate)}. Thời hạn này có thể được gia hạn thêm tùy theo sự
                        thỏa thuận của hai bên trước ngày kết thúc 30 ngày.
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
                        Quyền và nghĩa vụ của mỗi bên được quy định trong hợp đồng số {data?.rentalCode}.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        Phụ lục hợp đồng được lập thành {data?.numberOfContracts} bản, có nội dung và giá trị pháp lý
                        như nhau, mỗi bên giữ {data?.eachSideNumber} bản.
                        <br />
                        Phụ lục này là 1 phần không thể tách rời của Hợp đồng cho thuê số {data?.rentalCode} và có giá
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
                      <td align="center" colSpan="2"></td>
                      <td align="center">
                        <strong>..., ngày ...tháng ...năm ... </strong>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Bên A</strong> <br />
                      </td>
                      <td></td>
                      <td align="center">
                        <strong>Bên B</strong> <br />
                        <em>(Ký tên)</em> <br />
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
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    ),
    handleShow,
  ];
};
export default Preview;

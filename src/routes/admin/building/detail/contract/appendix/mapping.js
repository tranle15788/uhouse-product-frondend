import { convertFormatDatetoUTC } from 'utils';
import moment from 'moment';
const mapping = {
  webToServer: (value) => {
    console.log(value, 'err');
    return {
      ...value,
      effectiveDate: new Date(value?.effectiveDate)?.toISOString(),
      createdDate: new Date(value?.createdDate)?.toISOString(),
      fromDate: new Date(value?.fromDate)?.toISOString(),
      toDate: new Date(value?.toDate)?.toISOString(),
      lessor: {
        ...value?.lessor,
        icDate: convertFormatDatetoUTC(value?.lessor?.icDate),
        // identityCard:value?.lessor?.identityCard,
      },
      tenant: {
        ...value?.tenant,
        icDate: convertFormatDatetoUTC(value?.tenant?.icDate),
        // identityCard:value?.tenant?.identityCard,
      },

      saveWithSignature: !!value?.saveWithSignature,
      address: value?.building?.address,
      rentalContractCode: value?.rentalCode,
      numberOfContracts: value?.numberOfContracts,
      eachSideNumber: value?.eachSideNumber,
    };
  },
  serverToWeb: (value) => {
    console.log(value);
    return {
      ...value,
      effectiveDate: value.effectiveDate,
      building: {
        name: value.buildingName,
        address: value.buildingAddress,
      },
      lessor: {
        ...value?.lessor,
        icDate: value?.lessor?.icDate && moment(value?.lessor?.icDate).format('DD-MM-YYYY'),
        identityCard: value?.lessor?.identityCard,
      },
      tenant: {
        ...value.tenant,
        icDate: value?.lessor?.icDate && moment(value.tenant.icDate).format('DD-MM-YYYY'),
        identityCard: value?.tenant?.identityCard,
      },
      //  signAddress:buildingDetail?.address,
      createdDate: new Date(),
      rentalCode: value.rentalContractCode,
      // totalRefund:value?.deposit,
    };
  },
};
export default mapping;

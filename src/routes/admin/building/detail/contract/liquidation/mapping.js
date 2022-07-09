import { convertFormatDatetoUTC, formatNumber } from 'utils';
import moment from 'moment';

const mapping = {
  webToServer: (value) => {
    let costList = value?.depreciation
      ? !value?.totalCheckbox
        ? value?.depreciation.map((ele) => {
            return { ...ele, price: null };
          })
        : value?.depreciation
      : [];
    if (costList.length !== 0) {
      costList = costList?.map((ele) => {
        return { ...ele, price: ele.price?.replaceAll('.', '') };
      });
    }
    return {
      ...value,
      effectiveDate: value?.effectiveDate && convertFormatDatetoUTC(value?.effectiveDate),
      lessor: { ...value?.lessor, icDate: value?.lessor?.icDate && convertFormatDatetoUTC(value?.lessor?.icDate) },
      tenant: { ...value?.tenant, icDate: convertFormatDatetoUTC(value?.tenant?.icDate) },
      signDate: new Date(value?.signDate).toISOString(),
      liquidateFromDate: new Date(value?.liquidateFromDate).toISOString(),
      depreciation: costList,
      totalDepreciation: value.totalDepreciation?.replaceAll('.', ''),
      totalRefund: value.totalRefund?.replaceAll('.', ''),
    };
  },
  serverToWeb: (value, formatDate) => {
    let costList = value.depreciation;
    if (costList) {
      costList = costList.map((ele) => {
        return { ...ele, price: formatNumber(Math.floor(ele.price), '.') };
      });
    }
    return {
      ...value,
      effectiveDate: moment(value.effectiveDate).format(formatDate),
      lessor: { ...value.lessor, icDate: moment(value?.lessor?.icDate).format(formatDate) },
      tenant: { ...value.tenant, icDate: moment(value?.tenant?.icDate).format(formatDate) },
      // signAddress:value?.buildingAddress,
      depreciation: costList,
      totalCheckbox: value?.depreciation?.filter((ele) => ele.price !== null).length !== 0,
      deposit: Math.floor(value?.deposit).toString(),
      signDate: new Date(),
      totalRefund: value?.deposit,
    };
  },
};
export default mapping;

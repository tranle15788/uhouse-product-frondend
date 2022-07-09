import { formatNumber } from 'utils';

const mappingElectric = {
  serverToWeb: (value, data) => {
    const priceElectric = data.find((ele) => ele.id === value?.electricityDetail?.roomCost?.id)?.unitPrice;
    const priceWater = data.find((ele) => ele.id === value?.waterDetail?.roomCost?.id)?.unitPrice;
    return {
      id: value?.id,
      date: value?.date,
      billClosingDate: value?.billClosingDate,
      firstIndexElectric: Math.floor(value?.electricityDetail?.firstIndex).toString(),
      lastIndexElectric: Math.floor(value?.electricityDetail?.lastIndex).toString(),
      indexUsedElectric: Math.floor(value?.electricityDetail?.indexUsed).toString(),
      typeElectric:
        value?.electricityDetail?.type === 'ELECTRICITY' ? 'Phí điện' + '/' + formatNumber(priceElectric) : '',
      priceElectric: Math.floor(priceElectric).toString(),
      priceWater: Math.floor(priceWater).toString(),
      electricityWaterInformationId: 0,
      roomCodeIdElectric: value?.electricityDetail?.roomCostId,
      amountElectric: Math.floor(value?.electricityDetail?.amount).toString(),
      firstIndexWater: Math.floor(value?.waterDetail?.firstIndex).toString(),
      lastIndexWater: Math.floor(value?.waterDetail?.lastIndex).toString(),
      typeWater: value?.waterDetail?.type === 'WATER' ? 'Phí Nước' + '/' + formatNumber(priceWater) : '',
      indexUsedWater: Math.floor(value?.waterDetail?.indexUsed).toString(),
      note: value?.note,
      amountWater: Math.floor(value?.waterDetail?.amount).toString(),
      totalAmount: Math.floor(value?.totalAmount).toString(),
      roomCodeIdWater: value?.waterDetail?.roomCostId,
    };
  },
  WebToServer: (value) => {
    return {
      billClosingDate: value?.billClosingDate,
      date: value?.date,
      totalAmount: value?.totalAmount,
      note: value?.note,
      rentalContractId: value?.rentalContractId,
      electricityDetail: {
        firstIndex: Number(value?.firstIndexElectric),
        lastIndex: Number(value?.lastIndexElectric),
        indexUsed: value?.indexUsedElectric,
        amount: value?.amountElectric,
        type: value?.typeElectric,
        electricityWaterInformationId: 0,
        roomCostId: Number(value?.roomCodeIdElectric),
      },
      waterDetail: {
        firstIndex: Number(value?.firstIndexWater),
        lastIndex: Number(value?.lastIndexWater),
        indexUsed: value?.indexUsedWater,
        type: value?.typeWater,
        amount: value?.amountWater,
        electricityWaterInformationId: 0,
        roomCostId: Number(value?.roomCodeIdWater),
      },
    };
  },
};

export default mappingElectric;

import moment from 'moment';

const mapping = {
  webToServer: (values) => {
    try {
      values = {
        ...values,
        acreage: Number(values?.acreage && values?.acreage.toString().replaceAll('.', '')),
        price: Number(values?.price && values?.price.toString().replaceAll('.', '')),
        electricityIndicator: Number(
          values?.electricityIndicator && values?.electricityIndicator.toString().replaceAll('.', ''),
        ),
        waterIndicator: Number(values?.waterIndicator && values?.waterIndicator.toString().replaceAll('.', '')),
        deposit: Number(values?.deposit && values?.deposit.toString().replaceAll('.', '')),
        depositAmountReceived: Number(
          values?.depositAmountReceived && values?.depositAmountReceived.toString().replaceAll('.', ''),
        ),
      };
      return {
        ...values,
        lessor: {
          ...values?.lessor,
          icDate: moment(values?.lessor?.icDate).toISOString(),
        },
        tenant: {
          ...values?.tenant,
          icDate: moment(values?.tenant?.icDate).toISOString(),
        },
        // toDate : values?.toDate,
        cost: values.cost || [],
        roommate: values?.roommate
          ? values?.roommate?.map((item) => ({ ...item, icDate: moment(item.icDate).toISOString() }))
          : [],
        vehicle: values?.vehicle ? values?.vehicle : [],

        // fromDate: values?.rentTermEffectTime && values?.rentTermEffectTime[0],
        // toDate: values?.rentTermEffectTime && values?.rentTermEffectTime[1],

        fromDate: values?.fromDate,
        toDate: values?.toDate,

        payFromDay: values?.payFromDay,
        payToDay: values?.payToDay,
        punishFromDay: values?.punishFromDay,
        amountPunishPerDay: Number(values?.amountPunishPerDay),
        limitLateDay: values?.limitLateDay,
        terminateContractFromDay: values?.terminateContractFromDay,
        depositAmountReceived: Number(values?.depositAmountReceived),
        // payFromDay:"01",
        // payToDay:"03",
        // punishFromDay:"04",
        // amountPunishPerDay:"100000",
        // limitLateDay:"05",
        // terminateContractFromDay:"09",
      };
    } catch (error) {
      console.log(error);
    }
  },
  serverToWeb: (values) => {
    try {
      return {
        ...values,
        cost: values.cost || [],
        price: Math.floor(values?.price),
        acreage: Math.floor(values?.acreage),
        electricityIndicator: Math.floor(values?.electricityIndicator),
        waterIndicator: Math.floor(values?.waterIndicator),
        deposit: Math.floor(values?.deposit).toString(),
        depositAmountReceived: Math.floor(values?.depositAmountReceived),
        lessor: {
          ...values?.lessor,
          icDate: moment(values?.lessor?.icDate),
          indentityCard: values?.lessor?.identityCard || values?.lessor?.indentityCard,
        },
        tenant: {
          ...values?.tenant,
          icDate: moment(values?.tenant?.icDate),
          indentityCard: values?.tenant?.identityCard || values?.tenant?.indentityCard,
        },
        // rentTermEffectTime: [values?.fromDate, values?.toDate || values?.endDate],

        fromDate: values?.fromDate,
        toDate: values?.toDate || values?.endDate,
      };
    } catch (error) {
      console.log('first', error);
    }
  },
};
export default mapping;

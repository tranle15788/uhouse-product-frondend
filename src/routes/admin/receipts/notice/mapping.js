const mapping = {
  serverToWeb: (values) => {
    try {
      values.depositAmountReceived = values?.depositAmountReceived || values?.amountReceived;
      values.oldDebt = values?.oldDebtAmount || values?.oldDebt;
      values.rentalPrice = values?.room?.price || values?.rentalPrice;
      return {
        ...values,
        amountReceived: Math.floor(values?.amountReceived ? values?.amountReceived : 0),
        depositPrice: Math.floor(values?.depositPrice ? values?.depositPrice : 0),
        oldDebt: Math.floor(values?.oldDebt ? values?.oldDebt : 0),
        rentalPrice: Math.floor(values?.rentalPrice ? values?.rentalPrice : 0),

        depositAmountReceived: Math.floor(values?.depositAmountReceived ? values?.depositAmountReceived : 0),
        percentageDiscount: values?.percentageDiscount ? values?.percentageDiscount : 0,
        amountDiscount: Math.floor(values?.amountDiscount ? values?.amountDiscount : 0),
        room: {
          ...values?.room,
          acreage: Math.floor(values?.acreage ? values?.acreage : 0),
          bonus: Math.floor(values?.bonus ? values?.bonus : 0),
          deposit: Math.floor(values?.deposit ? values?.deposit : 0),
          price: Math.floor(values?.price ? values?.price : 0),
          // acreage:Math.floor(values?.acreage?values?.acreage:0),
          // acreage:Math.floor(values?.acreage),
        },
        tenant: {
          name: values?.tenant?.name || values?.room?.tenantName,
        },
        numberOfTenants: values?.room.numTenants || values?.numberOfTenants,
        costs: (values?.costs || values.expenses.cost)?.map((ele) => {
          return { ...ele, unitPrice: Math.floor(ele?.unitPrice || ele.price ? ele?.unitPrice || ele.price : 0) };
        }),
      };
    } catch (error) {
      console.log('error', error);
    }
  },
  webToServer: () => {},
};
export default mapping;

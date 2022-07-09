const common = require('../../common')
const variable = require('../../common/variable.js')
const translation = require("../../../public/locales/vi/translation.json");
const { faker } = require('@faker-js/faker');

const Page = {

    goToLogin: () => common.amOnPage({ url: variable.baseUrl + '/#/auth/login' }),
    gotoBuildingPage: () => common.clickValue({ selector: '.uhome-toanha' }),

    fillValueEmail: (value = 'uh_user_uat01@getnada.com') => common.fillValue({ selector: 'input#username', value }),
    fillValuePassword: (value = 'Ari123456') => common.fillValue({ selector: 'input#password', value }),
    submitFormLogin: () => common.clickValue({ selector: 'button#btnLogin' }),

    goToTabBuildingExpenses: () => common.clickValue({ selector: `//main/div[3]/div[1]/div[2]/div[2]/div/div[1]/div[1]/div/div[4]` }),
    clickBuildingDetail: () => common.clickValue({ selector: `//table/tbody/tr[2]//*[contains(@class, 'la-edit')]` }),
    clickButtonAdd: () => common.clickValue({ selector: '.btn-add' }),

    clickDeleteBuilding: () => common.clickValue({ selector: `//table/tbody/tr[2]//*[contains(@class, 'uhome-trash')]` }),
    clickConfirmDelete: () => common.clickValue({ selector: '.ant-btn-primary' }),
    clickCancelDelele: () => common.clickValue({ selector: '.ant-btn-default' }),

    fillValueExpenses: (value) => common.fillValue({ selector: `(//*[@id="name"])[2]`, value }),
    fillValueDescription: (value) => common.fillValue({ selector: `//*[@id="description"]`, value }),
    fillValueUnitPrice: (value) => common.fillValue({ selector: `//*[@id="unitPrice"]`, value }),
    fillValuecalculationUnite: (value) => common.fillValue({ selector: `//*[@id="calculationUnit"]`, value }),

    selectBuildingCost: (value = 'g') => common.selectItems({ selector: '(//*[@id="name"])[2]', value }),
    clickButtonEditCost: () => common.clickValue({ selector: `//table/tbody/tr[2]//*[contains(@class, 'la-edit')]` }),
    clickButtonAddFromList: () => common.clickValue({ selector: '.btn-add-list' }),
    clickButtonSave: () => common.clickValue({ selector: `//body/div[2]/div/div[2]/div/div[2]/div[3]/div/button[2]` }),
    displayNotificationSaved: () => Page.displayNotification(translation.components.message.Saved),
    displayNotificationError: () => Page.displayError(translation.components.message.Fail),

}

module.exports = Page;

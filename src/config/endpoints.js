export const endpoint = {
  account: {
    getbalance: "/account/balance",
    interestEarned: "/account/ie",
  },
  user: {
    me: "/user/me",
    login: "/user/login",
    register: "/user/register",
    updateInfo: "/user/updateInfo",
    signContract: "/user/signContract",
    uploadDocument: "/user/uploadDocument",
    logout: "/user/logout",
    forgot: "/user/forgot",
    reset: "/user/reset",
    updatePasswordViaEmail: "/user/updatePasswordViaEmail",
    updatePassword: "/user/updatePassword",
    updateContactInfo: "/user/updateContactInfo",
    updatePersonalDetails: "/user/updatePersonalDetails",
    updateNotificationStatus: "/user/updateNotificationStatus",
  },

  transaction: {
    getList: "/transaction",
    deposit: "/transaction/deposit",
    createPaymentIntent: "/transaction/create-payment-intent",
    createPayment: "/transaction/create-payment",
    crypto: "/transaction/crypto",
    cr: "/transaction/cr",
    withdraw: "/transaction/withdraw",
    cryptoWithdraw: "/transaction/crypto/withdraw",
  },
  investment: {
    create: "/investment",
    update: "/investment",
    get: "/investment",
    list: "/investment/list",
    reinvest: "/investment/reinvest",
  },
  paypal: {
    getConfig: "/config/paypal",
  },
  chart: {
    getBalanceHistory: "/balanceUpdateLog/chart",
    getTotalPaid: "/totalpaid/chart",
  },
  contract: {
    loadbalance: "/contract/getbalance",
    loadAvailableCredit: "/contract/getavailablecredit",
  },
};

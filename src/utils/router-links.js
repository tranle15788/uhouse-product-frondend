const Util = (name, type) => {
  const array = {
    Login: '/auth/login',
    ForgotPass: '/auth/forgot-password',
    ResetPass: '/auth/reset-password',
    SendOTP: '/auth/send-otp',
    Dashboard: '/dashboard',
    User: '/user',
    Register: '/auth/register',
    'Role setting': '/role-setting',
    'User managerment': '/user-managerment',
    'Building list': '/building',
    Building: '/building/:building',
    Room: '/building/:building/:room',
    'User profile': '/user-profile',
    'Employee list': '/employee',
    'Job list': '/job',
    'Preview Contract': '/building/:building/contract',
    Receipt: '/receipt',
    'mass-notice': '/receipt/mass-notice',
    notice: '/receipt/notice',
    bill: '/receipt/bill',
    'reply-role': '/notification/reply-role',
    'role-deleted': '/notification/role-deleted',
    'user-accept': '/notification/user-accept',
  }; // 💬 generate link to here

  const apis = {
    Dashboard: '/dashboard',
    User: '/user',
    Building: '/building',
    Login: '/user/sign-in',
    ForgotPassword: '/user/forgot-password',
    SendOTP: '/user/verify-forgot-password',
    UpdatePassword: '/user/update-password',
    UpdateUserProfile: '/user/user-profile',
    Register: '/user/register-user',
    ResendEmail: '/user/resend-email-for-create/{id}?email=',
    Role: '/role',
    UserRole: '/user-role',
    'entity-user-permission': 'entity-user-permission',
    Permissions: '/permission',
    MenuPermissions: '/menu-permission',
    Room: '/room',
    Utility: '/utility',
    Cost: '/mt-cost',
    Supplies: '/mt-supplies',
    Util: '/util',
    export: '/export',
    'deposit-contract': '/deposit-contract',
    'rental-contract': '/rental-contract',
    'extention-contract': '/extention-contract',
    'liquidated-contract': '/liquidated-contract',
    'contract-addendum': '/contract-addendum',
    'electricity-water-information': 'electricity-water-information',
    organization: '/organization',
    'organization-user': '/organization-user',
    buildingContent: '/building-content',
    'menu-permission': '/menu-permission',
    'receipt-information': '/receipt-information',
    'housing-expense': '/housing-expense',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;

export const APIURLConstants = {
  User: {
    GetUserList: `user/getuserslist`,
    AddUser: `user/createuser`,
    UpdateUser: `user/updateuser`,
    GetUserDetails: `user/getuserbyid`,
    DeleteUser: `user/deleteuser`,
    RegisterUser: `user/auth/register`,
  },
  Role: {
    GetRoleList: `user/userrole`,
    AddRole: `user/userrole`,
    UpdateRole: `user/userrole`,
    GetRoleDetails: `user/userrole`,
    DeleteRole: `user/userrole`,
  },
  Auth: {
    Login: `/Auth/Login`,
    Register: `/Auth/RegisterUser`,
    ForgotPassword: `Login/ForgetPassword`,
    ChangePassword: `Login/ChangePassword`,
    ResetPassword: `Login/ResetPasswordNew`,
  },
  UserRole:{
    GetUserRoleList:`user/userolemanagement`,
    DeleteAllUserRole:`user/userolemanagement`,
    GetUserRoleDetails:'user/userolemanagement'
  },
  RoleMenu:{
    GetModuleIst:`user/menumaster`,
    DeleteAllRoleMenu:`user/modulepermission`
  },
  Product: {
    ImportProduct: `/Product/Upload`
  },
  Payment: {
    GetStripePayment: `/Payments/create-payment-intent`,
  },
  Leave:{
    GetAllLeaveList:`/Leave/GetAllLeaves`
  }
};

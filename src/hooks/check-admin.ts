import { UserModel } from "../models";
 const useCheckAdmin = (
  userDetail: UserModel,
  role: string,
  bankAdminUrl: string,
  bankAdminUrl2: string,
  tenantCode: string
) => {
  const isSuperAdmin =
    userDetail?.role.name === role &&
    (tenantCode === "0" || tenantCode === "undefined");
  let defaultUrl = "";
  if (
    (userDetail &&
      (userDetail.role.name !== role || typeof tenantCode !== "undefined") &&
      userDetail?.role.name !== role) ||
    tenantCode !== "0"
  ) {
    if (userDetail?.role.name !== role) {
      defaultUrl = bankAdminUrl;
    } else if (userDetail?.role.name !== role && tenantCode !== "0") {
      defaultUrl = bankAdminUrl2;
    }
  }
  return { isSuperAdmin, defaultUrl };
};

export default useCheckAdmin
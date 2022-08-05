/**
 * Get dashboard link (depending on view profile type)
 *
 * @param   viewType - Selected view profile type
 * @returns Dashboard link (either customer/merchant)
 */
const getDashboardLink = (viewType) => {
  return viewType === "customer" ? "/customer/dashboard" : "/merchant/dashboard";
};

export { getDashboardLink };

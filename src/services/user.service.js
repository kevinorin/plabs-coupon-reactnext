// Utilities
import ApiService from "./api.service";

// Types
// import { IUser, IUserDetailsResponse } from "@typings/user.types";

class UserService {
  /** Fetch authenticated user information */
  async fetchUser(userId) {
    const response = await ApiService.api.get(`/users/${userId}`);
    const details = response.data;

    // TODO: Determine where we store in Redux (or if?)

    const { user } = details;

    return {
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      userId: user.userId,
      walletId: user.walletName,
    };
  }
}

const singleton = new UserService();
export default singleton;

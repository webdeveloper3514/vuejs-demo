/*
import { AxiosAPIInstance } from "@/services/axios.js";

class AdminProfile {
  getAdminProfileDetails() {
    return AxiosAPIInstance.get("api/account/my-profile");
  }

  saveProfile(type) {
    return AxiosAPIInstance.post("api/account/profile-picture", type);
  }

  getAdminProfilePicture(id) {
    return AxiosAPIInstance.get(`api/account/profile-picture/${id}`);
  }

  twoFactorAction() {
    return AxiosAPIInstance.get("api/account/my-profile/two-factor-enabled");
  }

  twoFactorChangeAction(enabled) {
    return AxiosAPIInstance.post(
      `api/account/my-profile/set-two-factor-enabled`,
      {
        params: {
          enabled: enabled
        }
      }
    );
  }

  saveAdminProfileChanges(payload) {
    return AxiosAPIInstance.put(`api/account/my-profile`, payload);
  }

  saveChangePassword(payload) {
    return AxiosAPIInstance.post(
      "api/account/my-profile/change-password",
      payload
    );
  }
}

export default new AdminProfile();
*/

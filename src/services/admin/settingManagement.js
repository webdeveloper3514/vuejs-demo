import { AxiosAUTHInstance, AxiosAPIInstance } from "@/services/axios.js";

class SettingManagement {
  getIdentityManagementSetting() {
    return AxiosAUTHInstance.get(`api/identity/settings`, {});
  }

  updateIdentityManagementSetting(payload) {
    return AxiosAUTHInstance.put(`api/identity/settings`, payload);
  }

  getAccountGeneral() {
    return AxiosAUTHInstance.get(`api/account-admin/settings`);
  }

  updateSettingAccountGeneral(payload) {
    return AxiosAUTHInstance.put(`api/account-admin/settings`, payload);
  }

  getAccountTwoFactor() {
    return AxiosAUTHInstance.get(`api/account-admin/settings/two-factor`);
  }

  updateSettingAccountTwoFactor(payload) {
    return AxiosAUTHInstance.put(
      `api/account-admin/settings/two-factor`,
      payload
    );
  }

  getAccountCaptcha() {
    return AxiosAUTHInstance.get(`api/account-admin/settings/recaptcha`);
  }

  updateSettingAccountCaptcha(payload) {
    return AxiosAUTHInstance.put(
      `api/account-admin/settings/recaptcha`,
      payload
    );
  }

  applicationConfigurationLocalization() {
    return AxiosAUTHInstance.get(`api/abp/application-configuration`, {
      params: {
        includeLocalizationResources: false,
      },
    });
  }

  applicationConfigurationCulture() {
    return AxiosAUTHInstance.get(`api/abp/application-localization`, {
      params: {
        cultureName: "en",
        onlyDynamics: false,
      },
    });
  }

  totalUnreadMessageCount() {
    return AxiosAUTHInstance.get(`api/chat/contact/total-unread-message-count`);
  }

  getFeatures() {
    return AxiosAPIInstance.get(`api/feature-management/features`, {
      params: {
        providerName: "T",
      },
    });
  }

  updateFeatures(payload) {
    return AxiosAPIInstance.put("api/feature-management/features", payload, {
      params: {
        providerName: "T",
      },
    });
  }

  resetDefaultFeature() {
    return AxiosAUTHInstance.delete("api/feature-management/features", {
      params: {
        providerName: "E",
      },
    });
  }
}

export default new SettingManagement();

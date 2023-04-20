import { AxiosAPIInstance } from "@/services/axios.js";

class LanguageTexts {
  getResources() {
    return AxiosAPIInstance.get("api/language-management/languages/resources");
  }

  getLanguageTexts(payload) {
    return AxiosAPIInstance.get("api/language-management/language-texts", {
      params: payload,
    });
  }

  restoreToDefaultTextLanguage(payload) {
    return AxiosAPIInstance.put(
      `api/language-management/language-texts/${payload.resourceName}/fi/${payload.name}/restore`,
      ""
    );
  }

  saveLanguageTexts(payload) {
    return AxiosAPIInstance.put(
      `api/language-management/language-texts/${payload.resourceName}/fi/${payload.name}`,
      "",
      {
        params: {
          value: payload.value,
        },
      }
    );
  }

  filterLanguageTexts(payload) {
    return AxiosAPIInstance.get(`api/language-management/language-texts`, {
      params: payload,
    });
  }
}

export default new LanguageTexts();

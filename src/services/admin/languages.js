import { AxiosAPIInstance } from "@/services/axios.js";

class Languages {
  getLanguage() {
    return AxiosAPIInstance.get("api/language-management/languages", {
      params: {
        skipCount: 0,
        maxResultCount: 20,
      },
    });
  }

  addLanguage(payload) {
    return AxiosAPIInstance.post("api/language-management/languages", payload);
  }

  searchLanguages(payload) {
    return AxiosAPIInstance.get("api/language-management/languages", {
      params: payload,
    });
  }

  getCultureList() {
    return AxiosAPIInstance.get(
      "api/language-management/languages/culture-list"
    );
  }

  getSpecificLanguage(id) {
    return AxiosAPIInstance.get(`api/language-management/languages/${id}`);
  }

  deleteLanguage(id) {
    return AxiosAPIInstance.delete(`api/language-management/languages/${id}`);
  }

  setDefaultLanguage(id) {
    return AxiosAPIInstance.put(
      `api/language-management/languages/${id}/set-as-default`,
      ""
    );
  }

  updateLanguage(payload) {
    return AxiosAPIInstance.put(
      `api/language-management/languages/${payload.id}`,
      payload
    );
  }
}

export default new Languages();

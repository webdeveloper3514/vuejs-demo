import { AxiosAPIInstance } from "@/services/axios.js";

class TextTemplate {
  getTextTemplate() {
    return AxiosAPIInstance.get(
      "api/text-template-management/template-definitions",
      {
        params: {
          skipCount: 0,
          maxResultCount: 10,
        },
      }
    );
  }

  searchTextTemplate(payload) {
    return AxiosAPIInstance.get(
      "api/text-template-management/template-definitions",
      {
        params: payload,
      }
    );
  }

  templateContent(TextTemplateName) {
    return AxiosAPIInstance.get(
      "api/text-template-management/template-contents",
      {
        params: {
          templateName: TextTemplateName,
        },
      }
    );
  }
}

export default new TextTemplate();

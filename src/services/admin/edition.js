import { AxiosAPIInstance } from "@/services/axios.js";

class Edition {
  getEditionAdminGetAll() {
    return AxiosAPIInstance.get("api/saas/editions", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  addNewEdition(payload) {
    return AxiosAPIInstance.post("api/saas/editions", payload);
  }

  deleteActionEdition(id) {
    return AxiosAPIInstance.delete("api/saas/editions/" + id);
  }

  updateActionEdition(payload) {
    return AxiosAPIInstance.put("api/saas/editions/" + payload.id, payload);
  }

  changeHistoryActionEdition(payload) {
    return AxiosAPIInstance.get(
      "api/audit-logging/audit-logs/entity-changes-with-username",
      {
        params: {
          entityId: payload.id,
          entityTypeFullName: "Volo.Saas.Editions.Edition",
        },
      }
    );
  }

  searchEditionData(payload) {
    return AxiosAPIInstance.get("api/saas/editions", {
      params: payload,
    });
  }

  getFeaturesData(id) {
    return AxiosAPIInstance.get("api/feature-management/features", {
      params: {
        providerName: "E",
        providerKey: id,
      },
    });
  }

  resetDefaultFeature(id) {
    return AxiosAPIInstance.delete("api/feature-management/features", {
      params: {
        providerName: "E",
        providerKey: id,
      },
    });
  }

  updateFeatures(payload, id) {
    return AxiosAPIInstance.put(+"api/feature-management/features", payload, {
      params: {
        providerName: "E",
        providerKey: id,
      },
    });
  }
}

export default new Edition();

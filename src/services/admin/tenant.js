import { AxiosAPIInstance } from "@/services/axios.js";

class Tenant {
  getTenantAdminGetAll() {
    return AxiosAPIInstance.get("api/saas/tenants", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  deleteActionTenant(id) {
    return AxiosAPIInstance.delete("api/saas/tenants/" + id);
  }

  getAllTenantUsers() {
    return AxiosAPIInstance.get("TenantUsers/GetAll");
  }

  tenantAddSubmitHandler(payload) {
    return AxiosAPIInstance.post("api/saas/tenants", payload);
  }

  getParticularRowData(userId) {
    return AxiosAPIInstance.get("api/saas/tenants/" + userId);
  }

  tenantUpdateSubmitHandler(payload) {
    return AxiosAPIInstance.put("api/saas/tenants/" + payload.id, payload);
  }

  tenantFilterData(payload) {
    return AxiosAPIInstance.get("api/saas/tenants", {
      params: payload,
    });
  }

  searchTenantData(payload) {
    return AxiosAPIInstance.get("api/saas/tenants", {
      params: payload,
    });
  }

  changeTenantPassword(id, payload) {
    return AxiosAPIInstance.put(
      "api/saas/tenants/" + id + "/set-password",
      payload
    );
  }

  getDatabaseAddModalAction() {
    return AxiosAPIInstance.get("api/saas/tenants/databases");
  }

  getDatabaseTableAction(id) {
    return AxiosAPIInstance.get(`api/saas/tenants/${id}/connection-strings`);
  }

  changeHistoryActionTenant(payload) {
    return AxiosAPIInstance.get(
      "api/audit-logging/audit-logs/entity-changes-with-username",
      {
        params: {
          entityId: payload.id,
          entityTypeFullName: "Volo.Saas.Tenants.Tenant",
        },
      }
    );
  }

  getFeaturesData(id) {
    return AxiosAPIInstance.get("api/feature-management/features", {
      params: {
        providerName: "T",
        providerKey: id,
      },
    });
  }

  resetDefaultFeature(id) {
    return AxiosAPIInstance.delete("api/feature-management/features", {
      params: {
        providerName: "T",
        providerKey: id,
      },
    });
  }

  updateFeatures(payload, id) {
    return AxiosAPIInstance.put("api/feature-management/features", payload, {
      params: {
        providerName: "T",
        providerKey: id,
      },
    });
  }
}

export default new Tenant();

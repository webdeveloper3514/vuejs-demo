import { AxiosAUTHInstance, AxiosAPIInstance } from "@/services/axios.js";

class Roles {
  getRoles() {
    return AxiosAUTHInstance.get("api/identity/roles", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  rolesSearch(payload) {
    return AxiosAUTHInstance.get("api/identity/roles", {
      params: payload,
    });
  }

  addRoles(payload) {
    return AxiosAUTHInstance.post("api/identity/roles", payload);
  }

  deleteRoles(id) {
    return AxiosAUTHInstance.delete(`api/identity/roles/${id}`);
  }

  getParticularRoles(id) {
    return AxiosAUTHInstance.get(`api/identity/roles/${id}`);
  }

  updateRoles(payload) {
    return AxiosAUTHInstance.put(`api/identity/roles/${payload.id}`, payload);
  }

  allClaimTypes() {
    return AxiosAUTHInstance.get(`api/identity/roles/all-claim-types`);
  }

  AddClaimUpdate(id, array) {
    return AxiosAUTHInstance.put(`api/identity/roles/${id}/claims`, array);
  }

  getClaims(id) {
    return AxiosAUTHInstance.get(`api/identity/roles/${id}/claims`);
  }

  getChangeHistory(entityId) {
    return AxiosAPIInstance.get(
      `api/audit-logging/audit-logs/entity-changes-with-username`,
      {
        params: {
          entityId: entityId,
          entityTypeFullName: "Volo.Abp.Identity.IdentityRole",
        },
      }
    );
  }

  getPermissionDetail(id) {
    return AxiosAPIInstance.get(`api/permission-management/permissions`, {
      params: {
        providerName: "R",
        providerKey: id,
      },
    });
  }

  updatePermission(payload, id) {
    return AxiosAPIInstance.put(
      "api/permission-management/permissions",
      payload,
      {
        params: {
          providerKey: id,
          providerName: "R",
        },
      }
    );
  }
}

export default new Roles();

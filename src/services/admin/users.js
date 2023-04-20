import { AxiosAUTHInstance, AxiosAPIInstance } from "@/services/axios.js";

class Users {
  getIdentityRoles() {
    return AxiosAUTHInstance.get("api/identity/roles", {
      params: {
        skipCount: 0,
        maxResultCount: 1000,
      },
    });
  }

  getOrganizationUnits() {
    return AxiosAUTHInstance.get("api/identity/organization-units", {
      params: {
        skipCount: 0,
        maxResultCount: 1000,
      },
    });
  }

  getIdentityUsers() {
    return AxiosAUTHInstance.get("api/identity/users", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  searchUsers(payload) {
    return AxiosAUTHInstance.get("api/identity/users", {
      params: payload,
    });
  }

  filterUsers(payload) {
    return AxiosAUTHInstance.get("api/identity/users", {
      params: payload,
    });
  }

  deleteUser(id) {
    return AxiosAUTHInstance.delete(`api/identity/users/${id}`);
  }

  getTwoFactorDetail(id) {
    return AxiosAUTHInstance.get(`api/identity/users/${id}/two-factor-enabled`);
  }

  updateTwoFactor(id, twoFactor) {
    return AxiosAUTHInstance.put(
      `api/identity/users/${id}/two-factor/${twoFactor}`,
      ""
    );
  }

  changeNewPassword(id, payload) {
    return AxiosAUTHInstance.put(
      `api/identity/users/${id}/change-password`,
      payload
    );
  }

  getPermissionDetail(id) {
    return AxiosAPIInstance.get(`api/permission-management/permissions`, {
      params: {
        providerName: "U",
        providerKey: id,
      },
    });
  }

  updatePermission(payload, id) {
    return AxiosAPIInstance.put("api/permission-management/permissions", payload, {
      params: {
        providerKey: "admin",
        providerName: "R",
      },
    });
  }

  createNewUser(payload) {
    return AxiosAUTHInstance.post("api/identity/users", payload);
  }

  allClaimTypes() {
    return AxiosAUTHInstance.get(`api/identity/users/all-claim-types`);
  }

  AddClaimUpdate(id, array) {
    return AxiosAUTHInstance.put(`api/identity/users/${id}/claims`, array);
  }

  getClaims(id) {
    return AxiosAUTHInstance.get(`api/identity/users/${id}/claims`, {});
  }

  getChangeHistory(entityId) {
    return AxiosAPIInstance.get(
      `api/audit-logging/audit-logs/entity-changes-with-username`,
      {
        params: {
          entityId: entityId,
          entityTypeFullName: "Volo.Abp.Identity.IdentityUser",
        },
      }
    );
  }

  usersLock(id, dateTime) {
    return AxiosAUTHInstance.put(
      (`api/identity/users/${id}/lock/` + "2023-03-14T05:08:14.557Z")
        .trim(" ")
        .replace("%", "")
        .replace(),
      ""
    );
  }

  getAssignableRoles() {
    return AxiosAUTHInstance.get("api/identity/users/assignable-roles");
  }

  getAvailableOrganizationUnits() {
    return AxiosAUTHInstance.get(
      "api/identity/users/available-organization-units",
      {}
    );
  }

  getSingleUser(id) {
    return AxiosAUTHInstance.get(AUTH_URL + `api/identity/users/${id}`, {});
  }

  getSingleUserRoles(id) {
    return AxiosAUTHInstance.get(
      AUTH_URL + `api/identity/users/${id}/roles`,
      {}
    );
  }

  getSingleUserOrganiztionUnits(id) {
    return AxiosAUTHInstance.get(
      `api/identity/users/${id}/organization-units`,
      {}
    );
  }

  updateUser(payload) {
    return AxiosAUTHInstance.put(
      `api/identity/users/${payload.id}`,
      payload,
      {}
    );
  }
}

export default new Users();

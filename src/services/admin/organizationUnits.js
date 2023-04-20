import { AxiosAUTHInstance } from "@/services/axios.js";

class OrganizationUnits {
  getAllOrganizationUnits() {
    return AxiosAUTHInstance.get("api/identity/organization-units/all");
  }

  createOrganizationUnit(payload) {
    return AxiosAUTHInstance.post("api/identity/organization-units", payload);
  }

  editOrganizationUnit(id, payload) {
    return AxiosAUTHInstance.put(
      `api/identity/organization-units/${id}`,
      payload
    );
  }

  getSingleOrganizationUnit(id) {
    return AxiosAUTHInstance.get(`api/identity/organization-units/${id}`, {
      params: {
        skipCount: 0,
        maxResultCount: 1000,
      },
    });
  }

  deleteOrganizationUnit(id) {
    return AxiosAUTHInstance.delete(`api/identity/organization-units`, {
      params: {
        id: id,
      },
    });
  }

  getAllMembers() {
    return AxiosAUTHInstance.get("api/identity/users", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  getOrganizationMembers(id) {
    return AxiosAUTHInstance.get(
      `api/identity/organization-units/${id}/members`,
      {
        params: {
          skipCount: 0,
          maxResultCount: 10,
        },
      }
    );
  }

  addOrganizationMembers(id, payload) {
    return AxiosAUTHInstance.put(
      `api/identity/organization-units/${id}/members`,
      payload
    );
  }

  deleteOrganizationMember(id, memberId) {
    return AxiosAUTHInstance.delete(
      `api/identity/organization-units/${id}/members/${memberId}`
    );
  }

  getOrganizationRoles(id) {
    return AxiosAUTHInstance.get(
      `api/identity/organization-units/${id}/roles`,
      {
        params: {
          skipCount: 0,
          maxResultCount: 10,
        },
      }
    );
  }

  getAllRoles() {
    return AxiosAUTHInstance.get("api/identity/roles", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  addOrganizationRoles(id, payload) {
    return AxiosAUTHInstance.put(
      `api/identity/organization-units/${id}/roles`,
      payload
    );
  }

  deleteOrganizationRoles(id, roleId) {
    return AxiosAUTHInstance.delete(
      `api/identity/organization-units/${id}/roles/${roleId}`
    );
  }

  filterMembers(payload) {
    return AxiosAUTHInstance.get("api/identity/users", {
      params: {
        filter: payload,
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }
}

export default new OrganizationUnits();

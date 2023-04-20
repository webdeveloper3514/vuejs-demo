import { AxiosAUTHInstance } from "@/services/axios.js";

class ClaimTypes {
  getClaimTypes() {
    return AxiosAUTHInstance.get("api/identity/claim-types", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  addClaimType(payload) {
    return AxiosAUTHInstance.post("api/identity/claim-types", payload);
  }

  getParticularData(id) {
    return AxiosAUTHInstance.get(`api/identity/claim-types/${id}`);
  }

  updateClaimTypes(payload) {
    return AxiosAUTHInstance.put(
      `api/identity/claim-types/${payload.id}`,
      payload
    );
  }

  searchClaimTypes(payload) {
    return AxiosAUTHInstance.get(`api/identity/claim-types`, {
      params: payload,
    });
  }

  deleteClaimType(id) {
    return AxiosAUTHInstance.delete(`api/identity/claim-types/${id}`);
  }
}

export default new ClaimTypes();

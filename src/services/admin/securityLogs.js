import { AxiosAUTHInstance } from "@/services/axios.js";

class SecurityLogs {
  getSecurityLogs() {
    return AxiosAUTHInstance.get("api/identity/security-logs", {
      params: {
        skipCount: "0",
        maxResultCount: "200",
      },
    });
  }

  filterSecurityLogs(payload) {
    return AxiosAUTHInstance.get("api/identity/security-logs", {
      params: payload,
    });
  }
}

export default new SecurityLogs();

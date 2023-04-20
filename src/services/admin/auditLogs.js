import { AxiosAPIInstance } from "@/services/axios.js";

class AuditLogs {
  getAuditLogs() {
    return AxiosAPIInstance.get("api/audit-logging/audit-logs", {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  getSingleAuditLog(id) {
    return AxiosAPIInstance.get(`api/audit-logging/audit-logs/${id}`, {});
  }

  filterAuditLogs(payload) {
    return AxiosAPIInstance.get(`api/audit-logging/audit-logs`, {
      params: payload,
    });
  }

  getEntityChanges() {
    return AxiosAPIInstance.get(`api/audit-logging/audit-logs/entity-changes`, {
      params: {
        skipCount: 0,
        maxResultCount: 10,
      },
    });
  }

  filterEntityChanges(payload) {
    return AxiosAPIInstance.get(`api/audit-logging/audit-logs/entity-changes`, {
      params: payload,
    });
  }
}

export default new AuditLogs();

import { AxiosAPIInstance } from "@/services/axios.js";

// get all findings
const _getFindings = async () => {
  return await AxiosAPIInstance.get(`/api/app/findings`);
};

// add finding
const _addFinding = async (data) => {
  return await AxiosAPIInstance.post(`/api/app/findings`, data);
};

const _getResources = async () => {
  return await AxiosAPIInstance.get(`/api/identity/roles`);
};

export default {
  addFinding: _addFinding,
  getResources: _getResources,
  getFindings: _getFindings,
};

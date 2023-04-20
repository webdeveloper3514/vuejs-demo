import { AxiosAPIInstance } from "@/services/axios.js";

const _getObjectiveByOperationId = async (id) => {
  return await AxiosAPIInstance.get(`/api/app/operation-objectives`, {
    params: { ObjectId: id },
  });
};

export default {
  getObjectiveByOperationId: _getObjectiveByOperationId,
};

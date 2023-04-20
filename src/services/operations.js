import { AxiosAPIInstance } from "@/services/axios.js";

const _getOperationById = async (id) => {
  try {
    const response = await AxiosAPIInstance.get(`/api/app/operations/${id}`);
    if (response.data && response.status === 200) {
      return response.data;
    } else return [];
  } catch (err) {
    console.log(err);
    return null;
  }
};
// get operation status
const _getOperationStatus = async () => {
  try {
    const response = await AxiosAPIInstance.get(`/api/app/operation-statuses`);
    if (response.data && response.status === 200) {
      return response.data;
    } else return { items: [], totalCount: 0 };
  } catch (err) {
    console.log(err);
    return null;
  }
};
// get all operation kinds
const _getOperationKinds = async () => {
  try {
    const response = await AxiosAPIInstance.get(`/api/app/operation-kinds`);

    if (response.data && response.status === 200) {
      return response.data;
    } else return { items: [], totalCount: 0 };
  } catch (err) {
    console.log(err);
    return null;
  }
};
const _getOperationActionHistoriesById = async (operationId) => {
  try {
    const response = await AxiosAPIInstance.get(
      `/api/app/operation-history/${operationId}`
    );
    if (response.data && response.status === 200) {
      return response.data;
    } else return { items: [], totalCount: 0 };
  } catch (err) {
    console.log(err);
    return null;
  }
};
// get all operations
const _getOperations = async () => {
  try {
    const response = await AxiosAPIInstance.get(`/api/app/operations`);
    if (response.data && response.status === 200) {
      return response.data;
    } else return { items: [], totalCount: 0 };
  } catch (err) {
    console.log(err);
    return null;
  }
};
// get all operation actions
const _getOperationActions = async (data) => {
  try {
    const response = await AxiosAPIInstance.get(`/api/app/operation-actions`);
    if (response.data && response.status === 200) {
      return response.data;
    } else return { items: [], totalCount: 0 };
  } catch (err) {
    console.log(err);
    return null;
  }
};
// add operation kind
const _addOperationStatus = async (data) => {
  try {
    const response = await AxiosAPIInstance.post(
      `/api/app/operation-statuses`,
      data
    );
    return response.status;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
// add operation kind
const _addOperationKind = async (data) => {
  try {
    const response = await AxiosAPIInstance.post(
      `/api/app/operation-kinds`,
      data
    ).status;
    return response.status;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
const _updateOperationKind = async (data) => {};
// add operation
const _addOperation = async (data) => {
  try {
    return await AxiosAPIInstance.post(`/api/app/operations`, data);
  } catch (err) {
    console.log(err);
    return null;
  }
};
// update operation
const _updateOperation = async (data) => {
  try {
    const response = await AxiosAPIInstance.put(
      `/api/app/operations/${data.id}`,
      data
    );
    return response.status;
  } catch (err) {
    return 0;
  }
};

const _changeStatus = async (
  operationId,
  operationStatusId,
  operationActionId
) => {
  const result = {
    history: null,
    operation: null,
  };
  try {
    const historyResponse = await AxiosAPIInstance.post("/api/app/operations", {
      operationActionId,
      operationId,
      // startedDate:new Date(),
    });
    if (historyResponse.status === 200 && historyResponse.data) {
      result.history = historyResponse.data;
    }
  } catch (err) {
    console.log(err);
  } finally {
    try {
      const operationResponse = await AxiosAPIInstance.put(
        `/api/app/operations/${operationId}`,
        { operationStatusId }
      );
      if (operationResponse.status === 200 && operationResponse.data) {
        result.operation = operationResponse.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return result;
};

export default {
  getOperations: _getOperations,
  getOperationStatus: _getOperationStatus,
  getOperationKinds: _getOperationKinds,
  getOperationActions: _getOperationActions,
  getOperationById: _getOperationById,
  getOperationHistoryById: _getOperationActionHistoriesById,
  addOperation: _addOperation,
  addOperationKind: _addOperationKind,
  updateOperation: _updateOperation,
  addOperationStatus: _addOperationStatus,
  changeStatus: _changeStatus,
};

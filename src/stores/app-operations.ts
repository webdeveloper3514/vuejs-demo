import { defineStore } from "pinia";
import OperationService from "@/services/operations.js";

const operations: any[] = [];
const operationStatus: any[] = [];

export const useAppOperation = defineStore({
  id: "appOperation",
  state: () => {
    return {
      operations,
      operationStatus,
    };
  },
  actions: {
    async getOperationStatus() {
      try {
        const _status = await OperationService.getOperationStatus();

        if (_status != null && _status?.items) {
          this.$state.operationStatus = _status;
        }
        return _status;
      } catch (err) {
        console.log(err);
        this.$state.operationStatus = { items: [], totalCount: 0 };
        return { items: [], totalCound: 0 };
      }
    },
    async getOperations() {
      try {
        const _operations = await OperationService.getOperations();
        if (_operations != null && _operations?.items) {
          this.$state.operations = _operations;
        }
        return _operations;
      } catch (err) {
        this.$state.operations = { items: [], totalCount: 0 };
        return { items: [], totalCound: 0 };
      }
    },
    async addOperation(data: any) {
      try {
        const _operationResponse = await OperationService.addOperation(data);
        if (
          _operationResponse != null &&
          _operationResponse.status == 200 &&
          _operationResponse.data
        ) {
          this.$state.operations.push(_operationResponse.data);
        }
        return _operationResponse;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },
});

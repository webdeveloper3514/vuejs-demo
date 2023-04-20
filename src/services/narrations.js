import { AxiosAPIInstance } from "@/services/axios.js";

// get all narrations
const _getNarrations = async () => {
  return await AxiosAPIInstance.get("/api/app/narrations/All");
};

// add narration
const _addNarration = async (data) => {
  return await AxiosAPIInstance.post("/api/app/narrations", data);
};
// update narration
const _updateOperation = async (data) => {
  return AxiosAPIInstance.put(`/api/app/operations/${data.id}`, {
    data,
  });
};

export default {
  getNarrations: _getNarrations,
  addNarration: _addNarration,
};

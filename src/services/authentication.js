import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class Authentication {
  register(body = {}) {
    return axios
      .post(API_URL + "api/app/tenants/create", body)
      .then((response) => {
        return response.data;
      });
  }
}

export default new Authentication();

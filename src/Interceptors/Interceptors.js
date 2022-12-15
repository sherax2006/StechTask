import axios from "axios";

import AuthHeader from "../Services/AuthHeader";
const b_URL = "https://sviz.simplitech.ai/";
axios.defaults.baseURL = "https://sviz.simplitech.ai/";
export const instance = axios.create({
  baseURL: b_URL,
  headers: AuthHeader(),
});

instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      const response = await axios.post(b_URL + "user/auth/token/refresh/", {
        refresh: localStorage.getItem("refresh"),
      });
      console.log("401: Response", response.data.access);
      const { access } = response.data;

      localStorage.setItem("access", access);
      console.log(access);
      const { config: oldRequest } = error;

      // axios.request(originalRequestConfig);
      //return _authorizing.then(() => axios.request(originalRequestConfig));
      axios.request({ ...oldRequest, headers: {} });
    }
  }
);

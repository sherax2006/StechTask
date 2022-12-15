import axios from "axios";
import VMSHeader from "../Services/VMSHeader";

const vms_base = "https://vms.simplitech.ai";
axios.defaults.baseURL = "https://vms.simplitech.ai";

export const vms_instance = axios.create({
  baseURL: vms_base,
  headers: VMSHeader(),
});

vms_instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log(error.response.data.status_code);
    if (error.response.status_code === 401) {
      const response = await axios.post(vms_base + "/ocr_api/refresh_token", {
        refresh: localStorage.getItem("refresh-token"),
      });

      localStorage.setItem("access-token", response.data.access);
      const { config: oldRequest } = error;
      axios.request({ ...oldRequest, headers: {} });
    }
  }
);

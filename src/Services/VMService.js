import axios from "axios";
import { Component } from "react";

const login = "/ocr_api/login";
const vms_base = "https://vms.simplitech.ai";
class AuthServices extends Component {
  // This iS Login URL ... This will return Promise to Login URL

  VMS_login(username, password) {
    return axios
      .post(vms_base + login, {
        username,
        password,
      })
      .then((response) => {
        const acc = response.data.data;
        
        const { access_token } = acc;
        const { refresh_token } = acc;

        localStorage.setItem("access-token", access_token);
        localStorage.setItem("refresh-token", refresh_token);

        return response;
      });
  }
}
export default new AuthServices();

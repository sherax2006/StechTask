import axios from "axios";
import { Component } from "react";
const base_URL = "https://sviz.simplitech.ai/";
const login = "user/auth/login/";
class AuthServices extends Component {
  // This iS Login URL ... This will return Promise to Login URL

  login(username, password) {
    return axios
      .post(base_URL + login, {
        username,
        password,
      })
      .then((response) => {
        const acc = response.data.data.tokens;
        const { access } = acc;
        const { refresh } = acc;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new AuthServices(); 
import AuthServices from "../Services/AuthServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
class ACLOGIN extends Component {
  constructor(props) {
    super(props);

    this.USERLOGIN = this.USERLOGIN.bind(this);
  }
  USERLOGIN = (usname, uspass) => {
    AuthServices.login(usname, uspass)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          toast.success("Login Successfully");
          window.location.href = "/dashboard";
        } else {
          toast.error("Invalid Credentials");

          


          console.log("invalid Login");
        }
      })
      .catch((err) => {
        toast.error("Invalid Credentials");

        console.log(err);
      });
  };
}

export default new ACLOGIN();

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import { isLogin } from "../utils/configu";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Sidebar>
      <Route
        {...rest}
        render={(props) =>
          isLogin() ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </Sidebar>
  );
};

export default PrivateRoute;

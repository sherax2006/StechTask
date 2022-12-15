import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard";
import Users from "./Components/Users";
import "./CSS/common.css";
import AddUser from "./Components/Pages/AddUser";
import EditUser from "./Components/Pages/EditUser";
import Visitors from "./Components/Visitors";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PeivateRoute";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} path="/" exact component={Login} />
        <PublicRoute restricted={true} component={Login} path="/login" />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute path="/visitors" component={Visitors} />
        <PrivateRoute path="/Sidebar" component={Sidebar} />
        <PrivateRoute   path="/users/addUser" component={AddUser} />
        <PrivateRoute path="/users/edit" component={EditUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

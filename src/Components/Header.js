import React, { Component } from "react";
import { Button, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../CSS/Header.css";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import { FaLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.LOGOUT = this.LOGOUT.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  state = {};
  LOGOUT() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    return (
      <div>
        <Dropdown
          title={
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              superadmin
            </span>
          }
          icon={
            <FaUserCircle
              style={{ fontSize: "3rem" }}
              className="header"
            ></FaUserCircle>
          }
        >
          <DropdownItem className="dropItem">
            <Link
              to="#"
              className="forget"
              style={{ color: "black", textDecoration: "none" }}
            >
              <FaLock />
              <span style={{ marginLeft: "5px" }}> Change Password</span>
            </Link>
            <br />
            <Button color="primary" className="logout" onClick={this.LOGOUT}>
              Logout
            </Button>
          </DropdownItem>
        </Dropdown>
      </div>
    );
  }
}
export default Header;

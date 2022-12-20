import React, { useEffect, useState } from "react";
import { FaTh, FaBars, FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../../CSS/SidebarCss.css";
import "../../App.css";
import "../../CSS/common.css";
import Header from "../Header";
const logo = require("../../IMAGES/stech_logo.png");
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const handleResize = () => {
    if (window.innerWidth <= 768) setIsOpen(false);
    else if (window.innerWidth > 768) setIsOpen(true);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUserFriends />,
    },
    {
      path: "/visitors",
      name: "Visitors",
      icon: <FaUserFriends />,
      onClick: () => {
        window.location.reload();
      },
    },
  ];
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
          <div className="top_section">
            <img
              src={logo}
              style={{ display: isOpen ? "block" : "none" }}
              alt="Login Form"
              className="stech_img"
            />
            <div
              style={{ marginLeft: isOpen ? "17px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              style={{ textDecoration: "none" }}
              className="link"
              activeClassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>
          <div style={{ float: "right" }}>
            <Header />
          </div>
          <div>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Sidebar;

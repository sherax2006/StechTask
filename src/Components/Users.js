import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Label,
  Card,
  FormGroup,
  Input,
  Table,
  CardBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import "../CSS/user_styling.css";
import { instance } from "../Interceptors/Interceptors";
import UserTable from "../Tables/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { ChangeOrder } from "../Slices/UserSlice";
import { ToastContainer } from "react-toastify";
const li_url = "/user/auth/list/";
const Users = (props) => {
  useEffect(() => {
    Apply_Filters();
  }, [0]);
  const [data, setData] = useState([]);

  const [user, SetUser] = useState({ username: "", email: "" });

  const dispatch = useDispatch();

  const ppge = useSelector((state) => state.UserRed.per_page);
  const pgno = useSelector((state) => state.UserRed.page_no);
  const oby = useSelector((state) => state.UserRed.order_by);
  const otype = useSelector((state) => state.UserRed.order_type);

  const Clear_Filter = () => {
    window.location.href = "users";
  };
  const Apply_Filters = () => {
    instance
      .get(li_url, {
        params: {
          per_page: ppge,
          page_no: pgno,
          order_by: oby,
          order_type: otype,

          username: user.username !== "" ? user.username : null,
          email: user.email !== "" ? user.email : null,
        },
      })
      .then((response) => {
        const info = response.data.data.dataset;
        setData(info);
      });
  };

  const sort = (val) => {
    dispatch(ChangeOrder(val));
    Apply_Filters();
  };

  const handleChange = (e) => {
    const name = e.target.name.trim();
    const value = e.target.value.trim();
    SetUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <Row className="list_users">
        <Col>
          <h3 style={{ marginTop: "1rem" }}> Users</h3>
        </Col>
      </Row>

      <Row>
        <Col>
          <Link to="/users/addUser">
            <Button className="user_btn" color="primary">
              <span>
                <FaUserPlus
                  style={{ marginRight: ".5rem", marginBottom: ".3rem" }}
                />
                Add User
              </span>
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="p-2">
        <Card className="card_styling">
          <CardBody>
            <Row>
              <Col>
                <h5 style={{ fontWeight: "600", color: "#212529" }}>Filters</h5>
              </Col>
            </Row>

            <Row>
              <Col lg={3} md={3} sm={10}>
                <FormGroup>
                  <Label className="user_label">Name</Label>
                  <Input
                    type="text"
                    name="username"
                    maxLength="30"
                    className="back_ground"
                    value={user.username}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Search Username"
                  />
                </FormGroup>
              </Col>
              <Col lg={3} md={3} sm={10}>
                <FormGroup>
                  <Label className="user_label">Email:</Label>
                  <Input
                    type="text"
                    name="email"
                    className="back_ground"
                    maxLength="30"
                    value={user.email}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Search email"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg={4} md={12} sm={12}>
                <CSVLink data={data}>
                  <button className="ftright_button">Export</button>
                </CSVLink>
              </Col>
              <Col lg={8} md={12} sm={12}>
                <Button
                  className="ft_button"
                  color="primary"
                  onClick={() => Apply_Filters()}
                >
                  Apply Filters
                </Button>

                <Button
                  className="ft_button  transp_button"
                  onClick={() => Clear_Filter()}
                >
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Row>
      <Row className="p-2">
        <Card className="card_styling">
          <CardBody>
            <Table className="table_font" striped responsive>
              <thead className="theading">
                <tr>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      sort("username");
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      sort("email");
                    }}
                  >
                    Email
                  </th>
                  <th>Edit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <UserTable data={data} />
                <br />
                <br />
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default Users;

import React, { Component } from "react";
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
// import UserTable from "./UserTable";
import UserTable from "../Tables/UserTable";
import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
const li_url = "/user/auth/list/";
class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      perPage: "10",
      data: [],
      email: "",

      status: "All",
      selectOptions: [
        { value: "All", label: "All" },

        { value: "Active", label: "Active" },

        { value: "Inactive", label: "InActive" },
      ],
    };
    this.Apply_Filters = this.Apply_Filters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear_filters = this.clear_filters.bind(this);

    this.select = this.select.bind(this);
  }
  select = (val) => {
    const { value } = val;
    this.setState({ status: value });
  };
  onClickHandler = (event) => {
    const value = event.target.innerHTML;
    this.setState({ perPage: value });
    this.props.ChangePerPage(value);
    this.Apply_Filters();
  };
  Apply_Filters() {
    instance
      .get(li_url, {
        params: {
          per_page: this.props.UsRed.per_page,
          page_no: this.props.UsRed.page_no,
          order_by: this.props.UsRed.order_by,
          order_type: this.props.UsRed.order_type,

          username: this.state.username !== "" ? this.state.username : null,
          email: this.state.email !== "" ? this.state.email : null,
          is_active:
            this.state.status === "All"
              ? null
              : this.state.status === "Active"
              ? true
              : false,
        },
      })
      .then((response) => {
        const info = response.data.data.dataset;
        this.setState({ data: info });
      });
  }

  clear_filters() {
    this.setState({ username: "", email: "" });
    window.location.reload(false);
  }

  handleChange(e) {
    const val = e.target.value;
    const Up_val = val.trim();

    this.setState({
      ...this.state,
      [e.target.name]: Up_val,
    });
  }

  // Component Did Mount

  componentDidMount() {
    this.Apply_Filters();
  }

  render() {
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
                Add User
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="p-2">
          <Card className="card_styling">
            <CardBody>
              <Row>
                <Col>
                  <h5 style={{ fontWeight: "600", color: "#212529" }}>
                    Filters
                  </h5>
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
                      value={this.state.username}
                      onChange={this.handleChange}
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
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Search email"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={12} sm={12}>
                  <CSVLink data={this.state.data}>
                    <button className="ftright_button">Export</button>
                  </CSVLink>
                </Col>
                <Col lg={8} md={12} sm={12}>
                  <Button className="ft_button" onClick={this.Apply_Filters}>
                    Apply Filters
                  </Button>

                  <Button
                    className="ft_button  transp_button"
                    onClick={this.clear_filters}
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
                      name="OrderBy"
                      onChange={this.handleChange}
                      value="username"
                      onClick={() => {
                        this.props.ChangeOrder("username");
                        this.Apply_Filters();
                      }}
                    >
                      Name
                    </th>
                    <th
                      name="OrderBy"
                      value="email"
                      onClick={() => {
                        this.props.ChangeOrder("email");
                        this.Apply_Filters();
                      }}
                    >
                      Email
                    </th>
                    <th>Edit</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <UserTable data={this.state.data} />
                  <br />
                  <br />
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Row>
      </>
    );
  }
}

const mapToState = (state) => {
  return {
    UsRed: state.UserRed,
  };
};

const mapDispatchToState = (dispatch) => ({
  ChangeOrder: (val) => dispatch({ type: "CHANGE_OREDR", value: val }),
  ChangePerPage: (val) => dispatch({ type: "PER_PAGE", value: val }),
});

export default connect(mapToState, mapDispatchToState)(Users);

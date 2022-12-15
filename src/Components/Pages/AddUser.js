import { Component } from "react";

import "../../CSS/addUser.css";
import { Form, Button, Row, Col, Input, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../Interceptors/Interceptors";
 
const add_userURL = "/user/auth/create/";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      fName: "",
      sName: "",
      email: "",
      passwordShown: false,
    };
    this.FormSubmission = this.FormSubmission.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFName = this.onChangeFName.bind(this);
    this.onChangesName = this.onChangesName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword() {
    const status = this.state.passwordShown;
    this.setState({
      passwordShown: !status,
    });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onChangeFName(e) {
    this.setState({ fName: e.target.value });
  }
  FormSubmission(e) {
    e.preventDefault();
    instance
      .post(add_userURL, {
        first_name: this.state.fName,
        last_name: this.state.sName,
        password: this.state.password,
        email: this.state.email,

        permissions: {
          student: true,
          students_reports: true,
          staff: true,
          staff_reports: true,
          devices: true,
          lookups: true,
          users: true,
        },
        username: this.state.username,
      })
      .then((response) => {
        toast.success("Success: User Added  Successfully!");

        this.props.history.push("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChangesName(e) {
    this.setState({ sName: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  render() {
    return (
      <div>
        <div>
          <Row>
            <Col>
              <h5 className="add_userLabel">Add User</h5>
            </Col>
          </Row>
          <h6 className="users">
            Users/{" "}
            <span style={{ fontWeight: "bold", Color: "darkGray" }}>
              Add user
            </span>
          </h6>
        </div>

        <Card style={{ marginTop: "3rem" }}>
          <CardBody>
            <h5 style={{ padding: "1rem" }}> User Information</h5>

            <Form onSubmit={this.FormSubmission}>
              <Row className="user_input">
                <Col lg={6}>
                  <label style={{ marginBottom: ".4rem" }}>
                    First Name
                    <span className="required">*</span>
                  </label>
                  <Input
                    type="text"
                    maxLength="30"
                    value={this.state.value}
                    onChange={this.onChangeFName}
                    required
                  />
                </Col>
                <Col lg={6}>
                  <label style={{ marginBottom: ".4rem" }}>
                    Last Name
                    <span className="required">*</span>
                  </label>
                  <Input
                    type="text"
                    maxLength="30"
                    value={this.state.value}
                    onChange={this.onChangesName}
                    required
                  />
                </Col>
              </Row>

              <Row className="user_input">
                <Col lg={6}>
                  <label style={{ marginBottom: ".4rem" }}>
                    Username
                    <span className="required">*</span>
                  </label>
                  <Input
                    type="text"
                    maxLength="30"
                    value={this.state.value}
                    onChange={this.onChangeUsername}
                    required
                  />
                </Col>
                <Col lg={6}>
                  <label style={{ marginBottom: ".4rem" }}>
                    Email
                    <span className="required">*</span>
                  </label>
                  <Input
                    type="email"
                    value={this.state.value}
                    maxLength="40"
                    onChange={this.onChangeEmail}
                    required
                  />
                </Col>
              </Row>
              <Row className="user_input">
                <Col lg={6}>
                  <div>
                    <label style={{ marginBottom: ".4rem" }}>
                      Password
                      <span className="required">*</span>
                    </label>
                  </div>

                  <div style={{ position: "relative" }}>
                    <Input
                      type={this.state.passwordShown ? "text" : "password"}
                      maxLength="40"
                      value={this.state.value}
                      onChange={this.onChangePassword}
                      required
                    />

                    {this.state.passwordShown ? (
                      <AiFillEye
                        className="EyeIcon"
                        size={22}
                        onClick={this.togglePassword}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        className="EyeIcon"
                        size={22}
                        onClick={this.togglePassword}
                      />
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="bottom_button">
                <Col lg={6}>
                  <Link to="/users">
                    <Button className="cancel_btn" color="primary">
                      Cancel
                    </Button>
                  </Link>
                </Col>
                <Col lg={6}>
                  <Button
                    className="add_user "
                    color="primary"
                    style={{ float: "right" }}
                  >
                    Add User
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(AddUser);

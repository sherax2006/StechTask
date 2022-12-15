import { Component } from "react";
import React from "react";
// import "../../../CSS/EditUser.css";
import "../../CSS/EditUser.css";
import { withRouter } from "react-router-dom";
import { Row, Button, Col, Input, Card, CardBody, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { instance } from "../../Interceptors/Interceptors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "reactstrap";
const edit_userURL = "/user/auth/edit/";
const li_url = "/user/auth/";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      username: "",
    };
    this.EditUserInfo = this.EditUserInfo.bind(this);

    this.ChangeEvent = this.ChangeEvent.bind(this);
  }

  componentDidMount() {
    const userId = this.props.location.state.usid;

    instance.get(li_url + userId).then((response) => {
      const { username, email } = response.data.data;

      this.setState({ username: username });
      this.setState({ Email: email });
    });
  }

  async display() {
    await toast.success("User updated  Successfully");
  }
  EditUserInfo(e) {
    e.preventDefault();
    instance
      .put(edit_userURL, {
        email: this.state.Email,
        username: this.state.username,
        id: this.props.location.state.usid,

        has_devices_app_permissions: true,
        has_lookups_app_permissions: true,
        has_staff_app_permissions: true,
        has_staff_reports_permissions: true,
        has_students_app_permissions: true,
        has_students_reports_permissions: true,
        has_users_app_permissions: true,
      })
      .then((response) => {
        toast.success("Success: User Updated Successfully!");
 
        this.props.history.push("/users");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid credentials");
      });
  }

  ChangeEvent(e) {
    const val = e.target.value;

    this.setState({
      ...this.state,
      [e.target.name]: val,
    });
  }

  render() {
    return (
      <div>
        <div>
          <h5 className="edit_User">Edit User</h5>
          <h6 className="edit">
            Users /{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>
              {" "}
              Edit User /{" "}
            </span>
          </h6>
        </div>
        <Card className="card_styling">
          <CardBody>
            <Row>
              <Col>
                <h5>User Information</h5>
              </Col>
            </Row>
            <Form
              onSubmit={this.EditUserInfo}
              ref={(c) => {
                this.form = c;
              }}
            >
              <Row className="edit_row">
                <Col lg={6}>
                  <FormGroup>
                    <label style={{ marginBottom: "1rem" }}>
                      Username
                      <span className="required">*</span>
                    </label>
                    <Input
                      type="text"
                      name="username"
                      maxLength="30"
                      value={this.state.username}
                      onChange={this.ChangeEvent}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <label style={{ marginBottom: "1rem" }}>
                      Email
                      <span className="required">*</span>
                    </label>
                    <Input
                      type="email"
                      maxLength="40"
                      name="Email"
                      value={this.state.Email}
                      onChange={this.ChangeEvent}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="edit_footer">
                <Col lg={6}>
                  <Link to="/users">
                    <Button className="cancel_btn" color="primary">
                      Cancel
                    </Button>
                  </Link>
                </Col>
                <Col lg={6}>
                  <Button
                    className="add_user"
                    color="primary"
                    style={{ float: "right" }}
                  >
                    Update User
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

export default withRouter(EditUser);

import { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../CSS/LoginCss.css";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { connect } from "react-redux";
import { action_login } from "../Actions/ActionTypes";
const logo = require("../IMAGES/login_img.png"); // with require
class LOGIN extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.togglePassword = this.togglePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      passwordShown: false,
    };
  }
  togglePassword() {
    const status = this.state.passwordShown;
    this.setState({
      passwordShown: !status,
    });
  }
 
  handleChange(e) {
    const val = e.target.value;
    const valu = val.trim();
    this.setState({
      ...this.state,
      [e.target.name]: valu,
    });
  }
  handleLogin(e) {
    e.preventDefault();

    this.props
      .LoginToUser(this.state.username, this.state.password)
      .then((re) => {
        console.log(re);
      })
      .cath((err) => {
        console.log("error: ", err);
      });
  }

  render() {
    return (
      <Container className="wrap">
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
        <Row className="login">
          <Col lg={6} md={12}>
            <center>
              <Form
                className="login_form"
                onSubmit={this.handleLogin}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <Row>
                  <Col lg={12}>
                    <h3 className="login_text">Login</h3>
                  </Col>
                </Row>
                <Row className="welcome_text">
                  <Col lg={12}>
                    <p>Welcome to Attendance Management System</p>
                  </Col>
                  <Row>
                    <Col lg={12}>
                      <FormGroup>
                        <Label
                          className="label_class"
                          style={{ marginTop: "20px" }}
                        >
                          Username
                          <span className="required">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="username"
                          maxLength="25"
                          value={this.state.username}
                          onChange={this.handleChange}
                          autoComplete="off"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Label className="label_class">
                        Password
                        <span className="required">*</span>
                      </Label>

                      <div style={{ position: "relative" }}>
                        <Input
                          type={this.state.passwordShown ? "text" : "password"}
                          name="password"
                          maxLength="25"
                          value={this.state.password}
                          onChange={this.handleChange}
                          autoComplete="off"
                          required
                        />

                        {this.state.passwordShown ? (
                          <AiFillEye
                            className="eyeIcon"
                            size={22}
                            onClick={this.togglePassword}
                          />
                        ) : (
                          <AiFillEyeInvisible
                            className="eyeIcon"
                            size={22}
                            onClick={this.togglePassword}
                          />
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <Button
                        color="primary"
                        size="md"
                        block
                        className="login_btn"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Form>
            </center>
          </Col>
          <Col lg={6}>
            <img src={logo} alt="Login Form" className="item" />
          </Col>
        </Row>
      </Container>
    );
  }
}

// Map To State
// Redux using Class base Components
// 

const mapToState = (state) => {
  return {
    login: state.Login,
  };
};
// Redux Implementation

const mapDispatchToState = (dispatch) => ({
  LoginToUser: (usname, pass) => dispatch(action_login(usname, pass)),
});

export default connect(mapToState, mapDispatchToState)(LOGIN);

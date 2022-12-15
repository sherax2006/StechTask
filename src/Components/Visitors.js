import React, { Component } from "react";
import "../CSS/Visitors.css";
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  Col,
  Table,
  Row,
  Button,
} from "reactstrap";

import VisitorTable from "../Tables/VisitorTable";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { vms_instance } from "../Interceptors/VMS_INTERCEPT";
import VMService from "../Services/VMService";
import moment from "moment/moment";
import Select from "react-select";
import { CSVLink } from "react-csv";

import { connect } from "react-redux";
const visit_URL = "/visitors_data/list/";
class Visitors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputDate: [new Date(), new Date()],
      name: "",
      CNIC: "",
      Badge: "",
      selectOptions: [
        { value: "", label: "All" },

        { value: "yes", label: "Yes" },

        { value: "No", label: "No" },
      ],
      DPT: "",
      Date: "",
      Host: "",
      Status: "",
      Result: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.Apply_Filter = this.Apply_Filter.bind(this);
    this.logout = this.logout.bind(this);
    this.select = this.select.bind(this);

    this.clRFilter = this.clRFilter.bind(this);
  }

  state = {};
  select = (val) => {
    const { value } = val;
    this.setState({ Status: value });
  };
  clRFilter() {
    this.setState({
      inputDate: [new Date(), new Date()],
      name: "",
      CNIC: "",
      Badge: "",
      DPT: "",
      Date: "",
      Host: "",
      Status: "",
      Result: [],
    });
    window.location.reload(true);
  }

  logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  handleDateChange(date) {
    const format2 = "DD/MM/YYYY";
    const startDate = moment(date[0]).format(format2);
    const EndDate = moment(date[1]).format(format2);

    const val = startDate + " - " + EndDate;

    this.setState({
      ...this.state,
      Date: val,
      inputDate: date,
    });
  }

  handleChange(e) {
    const val = e.target.value;
    const up_val = val.trim();

    this.setState({
      ...this.state,

      [e.target.name]: up_val,
    });
  }

  componentDidMount() {
    VMService.VMS_login("admin", "here2enter").catch((err) => {
      console.log(err);
    });
    const format2 = "DD/MM/YYYY";
    const startDate = moment(this.state.inputDate[0]).format(format2);
    const EndDate = moment(this.state.inputDate[0]).format(format2);

    const val = startDate + " - " + EndDate;
    const value = val.trim();

    this.setState({
      ...this.state,
      Date: value,
    });
  }

  Apply_Filter() {
    VMService.VMS_login("admin", "here2enter").catch((err) => {
      console.log(err);
    });
    vms_instance
      .get(visit_URL, {
        params: {
          per_page: this.props.UsRed.per_page,
          page_no: this.props.UsRed.page_no,
          order_by: this.props.UsRed.order_by,
          order_type: this.props.UsRed.order_type,
          selectedDateRange: this.state.Date,

          name: this.state.name !== "" ? this.state.name : null,
          cnic: this.state.CNIC !== "" ? this.state.CNIC : null,
          batch_id: this.state.Badge !== "" ? this.state.Badge : null,
          reference_person: this.state.Host !== "" ? this.state.Host : null,
          department: this.state.DPT !== "" ? this.state.DPT : null,
          verified:
            this.state.Status === "yes"
              ? true
              : this.state.Status === "No"
              ? false
              : null,
        },
      })
      .then((res) => {
        const data = res.data.dataset;
        if (data) {
          this.setState({ Result: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={6}>
            <h3 className="list_visitor">List of Visitors</h3>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Row>
              <h5 className="fltr">Filters</h5>
            </Row>

            <Row>
              <Col lg={3} md={12} sm={10}>
                <FormGroup>
                  <Label className="list_label">Name:</Label>
                  <Input
                    type="text"
                    name="name"
                    className="input_filter back_ground"
                    value={this.state.name}
                    onChange={this.handleChange}
                    maxLength="64"
                    placeholder="Visitor Name"
                  />
                </FormGroup>
              </Col>

              <Col lg={3} md={12} sm={10}>
                <FormGroup>
                  <Label className="list_label ">CNIC#:</Label>
                  <Input
                    type="text"
                    name="CNIC"
                    className="input_filter back_ground"
                    value={this.state.CNIC}
                    maxLength="30"
                    onChange={this.handleChange}
                    placeholder="Search CNIC"
                  />
                </FormGroup>
              </Col>

              <Col lg={3} md={12} sm={10}>
                <FormGroup>
                  <Label className="list_label">Badge ID:</Label>
                  <Input
                    type="text"
                    className="input_filter back_ground"
                    maxLength="11"
                    name="Badge"
                    value={this.state.Badge}
                    onChange={this.handleChange}
                    placeholder="Badge ID"
                  />
                </FormGroup>
              </Col>

              <Col lg={3} md={12} sm={10}>
                <FormGroup>
                  <Label className="list_label">Host:</Label>
                  <Input
                    type="text"
                    name="Host"
                    maxLength="64"
                    className="input_filter back_ground"
                    value={this.state.Host}
                    onChange={this.handleChange}
                    placeholder="ABC"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg={3} md={12} sm={10}>
                <FormGroup>
                  <Label className="list_label ">Department:</Label>
                  <Input
                    type="text"
                    name="DPT"
                    className="input_filter back_ground"
                    maxLength="30"
                    value={this.state.DPT}
                    onChange={this.handleChange}
                    placeholder="Search Department"
                  />
                </FormGroup>
              </Col>
              <Col lg={3} md={12} sm={10}>
                <FormGroup>
                  <Label className="list_label">Verifcation Status:</Label>
                  <Select
                    editable={false}
                    onChange={this.select}
                    defaultValue={this.state.selectOptions[0]}
                    options={this.state.selectOptions}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      
                      colors: {
                        ...theme.colors,
                      },
                    })}
                  />
                </FormGroup>
              </Col>

              <Col lg={3} md={12} sm={10}>
                <FormGroup>
                  <Label className="list_label">Date Range:</Label>
                  <br />
                  <DateRangePicker
                    className="date_Picker dateRPicker"
                    format="dd-MM-yy"
                    editable={false}
                    defaultValue={this.state.inputDate}
                    onChange={(date) => {
                      this.handleDateChange(date);
                    }}
                    selected={this.state.inputDate}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={12} sm={10}>
                <CSVLink data={this.state.Result}>
                  <Button color="primary" className="export_btn">
                    {" "}
                    Export
                  </Button>
                </CSVLink>
              </Col>
              <Col lg={8} md={12} sm={10} block>
                <Button
                  className="apply_filter"
                  color="primary"
                  onClick={this.Apply_Filter}
                >
                  Apply Filter
                </Button>
                <Button
                  className="clear_filter"
                  color="primary"
                  onClick={this.clRFilter}
                >
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <VisitorTable Result={this.state.Result} date={this.state.Date} />
      </div>
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
export default connect(mapToState, mapDispatchToState)(Visitors);

import { Badge } from "reactstrap";
import { Table, Card, CardBody, Row, Col } from "reactstrap";
import "../CSS/Visitors.css";
const base_URL = "https://vms.simplitech.ai";

const getBadgeStatus = (status) => {
  if (status === true) {
    return <Badge color="success">Yes</Badge>;
  } else {
    return <Badge color="danger">No</Badge>;
  }
};

// APPLY FILTER 
// VISITOR TABLE
const VisitorTable = (props) => {
  return (
    <>
      {props.Result && props.Result.length > 0 ? (
        <Card className="card_styling">
          <CardBody>
            <Row>
              <Col>
                <Table className="table_font" striped responsive>
                  <thead className="theading">
                    <tr>
                      <th>Visitor</th>
                      <th>CNIC Picture</th>
                      <th

                      // onClick={() => {
                      //   this.props.ChangeOrder("d_date");
                      //   this.Apply_Filter();
                      // }}
                      >
                        Date
                      </th>
                      <th
                      // onClick={() => {
                      //   this.props.ChangeOrder("d_time");
                      //   this.Apply_Filter();
                      // }}
                      >
                        Time
                      </th>
                      <th
                      // onClick={() => {
                      //   this.props.ChangeOrder("name");
                      //   this.Apply_Filter();
                      // }}
                      >
                        Name
                      </th>
                      <th
                      // onClick={() => {
                      //   this.props.ChangeOrder("cnic");
                      //   this.Apply_Filter();
                      // }}
                      >
                        CNIC#
                      </th>
                      <th>Badge ID</th>
                      <th
                      // onClick={() => {
                      //   this.props.ChangeOrder("reference_person");
                      //   this.Apply_Filter();
                      // }}
                      >
                        Host
                      </th>
                      <th
                      // onClick={() => {
                      //   this.props.ChangeOrder("department");
                      //   this.Apply_Filter();
                      // }}
                      >
                        Department
                      </th>
                      <th>Identity Verified</th>
                    </tr>
                  </thead>

                  <tbody>
                    {props.Result.map((res) => (
                      <tr key={res.id}>
                        <td>
                          <img
                            src={base_URL + res.profile_image}
                            alt="Profile Pic"
                            className="img"
                          />
                        </td>
                        <td>
                          <img
                            src={base_URL + res.cnic_front}
                            alt="CNIC Pic"
                            className="nic"
                          />
                        </td>
                        <td>{res.d_date}</td>
                        <td>{res.d_time}</td>
                        <td>{res.name}</td>
                        <td>{res.cnic}</td>
                        <td>{res.batch_id}</td>
                        <td>{res.reference_person}</td>
                        <td>{res.department}</td>
                        <td>{getBadgeStatus(res.verified)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <div>
          <h6
            style={{
              marginTop: "1rem",
              textAlign: "center ",
              color: "#16365f",
            }}
          >
            There is no data available to show
          </h6>
        </div>
      )}
    </>
  );
};

export default VisitorTable; 
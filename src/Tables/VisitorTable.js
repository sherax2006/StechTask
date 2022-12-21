import { Badge } from "reactstrap";
import { Table, Card, CardBody, Row, Col } from "reactstrap";
import "../CSS/Visitors.css";
import { useDispatch } from "react-redux";
import VMService from "../Services/VMService";
import { useEffect } from "react";
 
const base_URL = "https://vms.simplitech.ai";
 

const getBadgeStatus = (status) => {
  if (status === true) {
    return <Badge color="success">Yes</Badge>;
  } else {
    return <Badge color="danger">No</Badge>;
  }
};
 
const VisitorTable = (props) => {
  const dispatch = useDispatch();

  useEffect(() => { 
    VMService.VMS_login("admin", "here2enter").catch((err) => {
      console.log(err);
    });
  });

  const sortBy = (val) => {
    dispatch({ type: "CHANGE_OREDR", value: val });
    
  };
 
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
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          sortBy("d_date");
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          sortBy("d_time");
                        }}
                      >
                        Time
                      </th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          sortBy("name");
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          sortBy("cnic");
                        }}
                      >
                        CNIC#
                      </th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          sortBy("batch_id");
                        }}
                      >
                        Badge ID
                      </th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          sortBy("reference_person");
                        }}
                      >
                        Host
                      </th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          sortBy("department");
                        }}
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

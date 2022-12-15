import { Modal, Button, ModalBody, Row, Col } from "reactstrap";
import "./modals.css";
import { AiFillWarning, AiOutlineClose } from "react-icons/ai";
import React from "react";
const Modal_Data = (props) => {
  return (
    <div>
      <Modal fade={true} isOpen={props.isOpen} toggle={props.toggle}>
        <ModalBody style={{ textColor: "black", alignSelf: "center" }}>
          <p className="sure_del">
            {" "}
            {<AiFillWarning size={100} color="rgb(206, 57, 57)" />}
            {
              <AiOutlineClose
                size={30}
                style={{ float: "right" }}
                onClick={props.toggle}
              />
            }
            <h4 style={{ marginTop: ".25rem", fontWeight: "bold!important" }}>
              Are You Sure?
            </h4>
          </p>
          <p
            style={{
              marginTop: ".5rem",
              textAlign: "center",
              fontSize: "18px",
              color: "#6b859e",
            }}
          >
            Do you really want to
            <span style={{ fontWeight: "bold" }}> delete </span> selected
            record/s?
          </p>{" "}
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Row>
              <Col lg={6} sm={12}>
                <Button
                  color="secondary"
                  onClick={props.toggle}
                  className="btn_cnl"
                >
                  Cancel
                </Button>
              </Col>

              <Col lg={6} sm={12}>
                <Button className="btn_del">Delete</Button>{" "}
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Modal_Data;

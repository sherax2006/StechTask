import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import Modal_Data from "../MODALS/Modal_Data";

const Table = (props) => {
  const [modal, setModal] = useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);
  return (
    <>
      {props.data && props.data.length > 0 ? (
        props.data.map((res) => (
          <tr key={res.username}>
            <td>{res.username}</td>
            <td>{res.email}</td>
            <td name={res.username} email={res.email}>
              <Link to={{ pathname: "/users/edit", state: { usid: res.id } }}>
                {<FaEdit />}
              </Link>
            </td>
            <div>
              <Link to="/users" onClick={toggle}>
                <td style={{ color: "crimson" }}>{<FaTrash />}</td>
              </Link>
            </div>
          </tr>
        ))
      ) : (
        <div>
          <h6
            style={{
              marginTop: "1rem",
              marginLeft: "15rem",
              textAlign: "center ",
              color: "#16365f",
            }}
          >
            There is no data available to show
          </h6>
        </div>
      )}
      <Modal_Data isOpen={modal} toggle={toggle} />
    </>
  );
};

export default Table;

import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "./UserContext";
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

function UserProfile() {
  const {currUser, setCurrUser} = useContext(UserContext);

  const {id, firstName, lastName, email, state} = currUser;

  if(!currUser) {
    return (
      <Redirect to="/login" />
    );
  };

  return(

    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
    <div className="text-center h3">
      {firstName} {lastName}
    </div>
    <div className="d-flex justify-content-center align-items-center mb-3">
      <div className="pe-3">
          {email}
      </div>
      <div className="pe-4">
          Status: {state}
      </div>
    </div>
    <div className="text-center">
      <Link className="btn btn-sm btn-primary" to={`/admin/${id}/update`}>
          Edit
      </Link>
    </div>
</div>
  );
};

export default UserProfile;
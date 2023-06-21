import React from "react";
import { Link } from "react-router-dom";
import UserStateUpdateForm from "./UserStateUpdate";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import "./UserCard.css";

function UserCard({user, updateUsersList}) {
  return (
      <Card key={user.id} className="my-2 mx-auto" style={{width: 18 + "em"}}>
          <CardBody>
            <CardTitle>
            <a className="text-decoration-none card-title" href={`/admin/${user.id}`}>
                {user.firstName} {user.lastName}
                </a>
            </CardTitle>
            <CardSubtitle>
              <div>{user.email}</div>
            </CardSubtitle>
              <UserStateUpdateForm user={user} updateUsersList={updateUsersList}/>
            {/* <Link className="btn btn-sm btn-outline-primary py-0 mt-1" to={`/admin/${user.id}/update`}>
              Edit
          </Link> */}
          <Link className="mt-1" to={`/admin/${user.id}/update`}>
              Edit
          </Link>
          </CardBody>
      </Card>
  );
};

export default UserCard;
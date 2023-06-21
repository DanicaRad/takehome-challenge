import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import YodlrApi from "../Api";
import UserContext from "./UserContext";

function UserDetail() {
  console.debug("UserDetail");
  const {userId} = useParams();
  const {currUser} = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserFromApi() {
      const user = await YodlrApi.getUser(userId);
      setUser(user);
    };
    getUserFromApi();
  }, [userId]);

  if(!user) return (
    <>
    <div>Loading</div>
    </>
  )

  return(
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <div className="text-center h3">
          {user.firstName} {user.lastName}
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="pe-3">
              {user.email}
          </div>
          <div className="pe-4">
              Status: {user.state}
          </div>
        </div>
        <div className="text-center">
          <Link className="btn btn-sm btn-primary" to={`/admin/${user.id}/update`}>
              Edit
          </Link>
        </div>
  </div>
  );
};

export default UserDetail;
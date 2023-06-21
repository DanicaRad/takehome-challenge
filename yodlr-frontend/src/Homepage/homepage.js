import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../Users/UserContext";

function Homepage() {
  const {currUser} = useContext(UserContext);
  
  return (
    <div className="flex justify-content-center align-content-center mt-5 pt-5">
      <div className="display-4 text-center text-primary p-2 mt-5">Yodlr</div>
      <div className="h5 text-center p-2">No one knows what it does.</div>
      { currUser ? 
        <div className="display-6 text-center">Welcome back, {currUser.firstName}!</div>
        : (
          <div className="d-flex justify-content-center gap-3">
            <Link className="btn btn-primary" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </div>
        )
      }
    </div>
  )
};

export default Homepage;
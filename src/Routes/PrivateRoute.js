import React, { useContext } from "react"; 
import {Route, Redirect} from "react-router-dom";
import UserContext from "../Users/UserContext";

function PrivateRoute({path, children}) {
  const {currUser} = useContext(UserContext);
  
}
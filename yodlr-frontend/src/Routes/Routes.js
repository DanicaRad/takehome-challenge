import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../Homepage/homepage.js";
import UsersList from "../Admin/UsersList.js";
import UserDetail from "../Users/UserDetail.js";
import UserUpdateForm from "../Users/UserUpdateForm.js";
import RegisterForm from "../Auth/RegisterForm.js";
import NotFound from "../Common/NotFound.js";
import LoginForm from "../Auth/LoginForm.js";
import UserProfile from "../Users/UserProfile.js"

function Routes({login, signup}) {
  return(
    <div>
      <Switch>
      <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/admin">
          <UsersList />
        </Route>
        <Route exact path="/admin/:userId">
          <UserDetail />
        </Route>
        <Route path="/admin/:userId/update">
          <UserUpdateForm />
        </Route>
        <Route path="/register">
          <RegisterForm signup={signup} />
        </Route>
        <Route path="/login">
          <LoginForm login={login}/>
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
};

export default Routes;
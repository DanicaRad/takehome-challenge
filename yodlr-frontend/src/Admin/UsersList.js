import React, { useState, useEffect, useContext} from "react";
import YodlrApi from "../Api";
import UserCard from "./UserCard";
import UserContext from "../Users/UserContext";
import AdminUsersContext from "./AdminUsersContext";
import UserStateUpdateForm from "./UserStateUpdate";

function UsersList() {
  console.debug("UsersList");

  const {currUser} = useContext(UserContext);
  const {users, setUsers} = useContext(AdminUsersContext);

  function updateUsersList(updatedUser) {
    users[updatedUser.id] = updatedUser;
    setUsers(users);
  } 

  if(!users) return (
    <>
    <div>Loading</div>
    </>
  )

  return (
    <div className="mt-4">
    <div className="display-6 text-center">Users</div>
    <div>
      {users.map(user => (
        <UserCard
          user={user}
          updateUsersList={updateUsersList}
        />
      ))}
    </div>
    </div>
  );

};

export default UsersList;
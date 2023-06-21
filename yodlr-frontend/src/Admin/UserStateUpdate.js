import React, { useState, useContext} from "react";
import YodlrApi from "../Api";
import {
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import UserContext from "../Users/UserContext";
import TimedAlert from "../Common/TimedAlert";


function UserStateUpdateForm({user, updateUsersList}) {
  const [form, setForm] = useState({
    state: user.state
  });
  const{alert, setAlert} = useContext(UserContext);

  const [userState, setUserState] = useState(user.state === "active" ? true : false);


  async function updateState(evt) {
    evt.persist();
    try {
      const updatedState = user.state === "active" ? "pending" : "active";
    user.state = updatedState;
    const updatedUser = await YodlrApi.updateUser(user.id, user);
    updateUsersList(updatedUser);
    } catch(err) {
      setAlert(<TimedAlert message={err} color={"danger"} />);
    }
  };

  return (
    <Form>
      <FormGroup switch>
            <Input
              type="switch"
              checked={userState}
              onClick={() => {setUserState(!userState);}}
              onChange={updateState}
            />
            <Label check>{userState === true ? "Active" : "Pending"}</Label>
          </FormGroup>
    </Form>
  );
};

export default UserStateUpdateForm;
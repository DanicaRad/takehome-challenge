import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import YodlrApi from '../Api';
import TimedAlert from '../Common/TimedAlert';
import {
  Form, 
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import UserContext from './UserContext';
import "./UserUpdateForm.css";

function UserUpdateForm() {
  const {userId} = useParams();
  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState(null);
  const [form, setForm] = useState(null);
  const [userInput, updateUserInput] = useState(null);
  const { currUser } = useContext(UserContext);
  const [token, setToken] = useState(currUser ? currUser.token : null);

  useEffect(() => {
    async function getUserFromApi() {
      const user = await YodlrApi.getUser(userId, token);
      setUser(user);
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        state: user.state
      });
      updateUserInput(user);
      setUserState(user.state === "active" ? true : false);
    };
    getUserFromApi();
  }, [userId]);

  
  const {alert, setAlert} = useContext(UserContext);

  function handleChange(evt) {
    evt.persist();
    // update form data displayed
    setForm(f => ({...f, [evt.target.name]: evt.target.value}));
    //save user input to for API put request
    updateUserInput(d => ({...d, [evt.target.name]: evt.target.value}));
  };

  function updateState(evt) {
    evt.persist();
    const updatedState = user.state === "active" ? "pending" : "active";
    updateUserInput(d => ({...d, [evt.target.name]: evt.target.value}));
    updateUserInput(d => ({...d, state: updatedState}));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedUser = await YodlrApi.updateUser(user.id, userInput);
      setUser(updatedUser)
      setAlert(<TimedAlert message={"User Updated"} color={"success"}/>)
    } catch(err) {
      setAlert(<TimedAlert message={err.message} color={"danger"}/>);
      return;
    }
  };

  if(!form) return (
    <div>Loading</div>
  );

  const {firstName, lastName, email, state} = form;

  return (
    <div className='form'>
      <div className='h5 text-center'>Update Profile</div>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        { currUser.isAdmin ? 
          <Col className='ps-3 pb-2'>           
          <FormGroup switch>
            <Input
              type="switch"
              checked={userState}
              onClick={() => {setUserState(!userState);}}
              onChange={updateState}
            />
            <Label check>{userState === true ? "Active" : "Pending"}</Label>            
          </FormGroup>
        </Col>
        :
        <Col>
        <div>Status: {currUser.state}</div>
        </Col>
        }
      </Row>
      <Button color="primary" className="btn-sm btn-primary">Submit</Button>
    </Form>
    </div>
  )
};

export default UserUpdateForm;
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserCard from '../Admin/UserCard';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row
} from "reactstrap";
import YodlrContainer from '../Common/YodlrContainer';
import UserContext from '../Users/UserContext';
import TimedAlert from '../Common/TimedAlert';

function RegisterForm({signup}) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const {alert, setAlert} = useContext(UserContext);

  // set/reset form
  const [form, updateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // collect user input as it is inputted
  function handleChange(evt) {
    evt.persist();
    updateForm(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  // make API call to register user
  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(form);
    if(!result.success) {
      setAlert(<TimedAlert message={result.err[0]} color={"danger"}/>);
    } else {
      history.push("/");
    }
  };

  const { firstName, lastName, email, password } = form;

  if(user) return (
    <>
      <UserCard user={user} />
    </>
  )

  function formView() {
    return (
      <Form className="container" onSubmit={handleSubmit}>
        <Row>
          <div className='col-sm'>
            <FormGroup floating>
              <Input
                id="firstName"
                name="firstName"
                placeholder='first name'
                value={firstName}
                onChange={handleChange}
              />
              <Label for="firstName">First Name</Label>
            </FormGroup>
          </div>
          <div className='col-sm'>
            <FormGroup floating>
              <Input
                id="lastName"
                name="lastName"
                placeholder="last name"
                value={lastName}
                onChange={handleChange}
              />
              <Label for="lastName">Last Name</Label>
            </FormGroup>
          </div>
        </Row>
        <Row>
          <div className='col-sm'>
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={handleChange}
              />
              <Label for="email">Email</Label>
            </FormGroup>
          </div>
          <div className='col-sm'>
          <FormGroup floating>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={handleChange}
              />
              <Label for="password">Password</Label>
            </FormGroup>
          </div>
        </Row>
        <Button className="px-3" color="primary">Sign Up</Button>
      </Form>
    );
  }
  return (
    <YodlrContainer children={formView()}/>
  )
  // return (
  //   <>
  //   { alert }
  //   <Form onSubmit={handleSubmit}>
  //     <Row>
  //       <Col>
  //         <FormGroup>
  //           <Label for="firstName">
  //             First Name
  //           </Label>
  //           <Input
  //             id="firstName"
  //             name="firstName"
  //             placeholder='first name'
  //             value={firstName}
  //             onChange={handleChange}
  //           />
  //         </FormGroup>
  //       </Col>
  //       <Col>
  //         <FormGroup>
  //           <Label for="lastName">
  //             Last Name
  //           </Label>
  //           <Input
  //             id="lastName"
  //             name="lastName"
  //             placeholder="last name"
  //             value={lastName}
  //             onChange={handleChange}
  //           />
  //         </FormGroup>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>
  //         <FormGroup>
  //           <Label for="email">
  //             Email
  //           </Label>
  //           <Input
  //             id="email"
  //             name="email"
  //             placeholder="email"
  //             value={email}
  //             onChange={handleChange}
  //           />
  //         </FormGroup>
  //       </Col>
  //       <Col>
  //       <FormGroup>
  //           <Label for="password">
  //             Password
  //           </Label>
  //           <Input
  //             id="password"
  //             name="password"
  //             type="password"
  //             placeholder="password"
  //             value={password}
  //             onChange={handleChange}
  //           />
  //         </FormGroup>
  //       </Col>
  //     </Row>
  //     <Button color="primary">Sign Up</Button>
  //   </Form>
  //   </>
  // );
};

export default RegisterForm;
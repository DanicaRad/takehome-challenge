import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import YodlrContainer from '../Common/YodlrContainer';
import UserContext from '../Users/UserContext';
import TimedAlert from '../Common/TimedAlert';

function LoginForm({ login }) {
  const history = useHistory();
  const {alert, setAlert} = useContext(UserContext)

  const [form, updateForm] = useState({
    email: "",
    password: ""
  });

  // collect user input as it is inputted
  function handleChange(evt) {
    evt.persist();
    updateForm(data => ({...data, [evt.target.name]: evt.target.value}));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(form);
    console.log("result", result);
    if(!result.success) {
      setAlert(<TimedAlert message={result.err[0]} color={"danger"}/>);
    } else {
      history.push("/");
    }
  };

  function showLoginForm() {
    return (
    <Form className="container" onSubmit={handleSubmit}>
      <div className='row justify-content-center'>
        <div className='col-md-4'>
          <FormGroup floating>
            <Input 
              id="email"
              name="email"
              type='email'
              placeholder='email'
              onChange={handleChange}
            />
            <Label for="email">email</Label>
          </FormGroup>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-4'>
          <FormGroup floating>
          <Input 
            id="password"
            name="password"
            type='password'
            placeholder='password'
            onChange={handleChange}
          />
          <Label for="password">password</Label>
        </FormGroup>
        </div>
      </div>
      <Button color="primary">Login</Button>
    </Form>
    );
  }

  // return (
  //   <>
  //   { alert }
  //   <Form className='container' onSubmit={handleSubmit}>
  //     <FormGroup floating className='col-md-4'>
  //       {/* <Label for="email">email</Label> */}
  //       <Input 
  //         id="email"
  //         name="email"
  //         type='email'
  //         placeholder='email'
  //         onChange={handleChange}
  //       />
  //       <Label for="email">email</Label>
  //     </FormGroup>
  //     <FormGroup floating className='col-3'>
  //       {/* <Label for="password">password</Label> */}
  //       <Input 
  //         id="password"
  //         name="password"
  //         type='password'
  //         placeholder='password'
  //         onChange={handleChange}
  //       />
  //       <Label for="password">password</Label>
  //     </FormGroup>
  //     <Button color="primary">Login</Button>
  //   </Form>
  //   </>
  // );
  return (
    <YodlrContainer children={showLoginForm()}/>
  );
};

export default LoginForm;
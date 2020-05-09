import React, { useState } from "react";
import { } from 'react-dom';
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

// const jwt = require('jsonwebtoken');

// const options = {
//   issuer: process.env.JWT_ISSUER,
//   subject: process.env.JWT_SUBJECT,
//   audience: process.env.JWT_AUDIENCE
// };

// const verifyAndDecodeData = async (token) => {
//   try {
//       const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, options);
//       return decoded;
//   } catch (err) {
//       console.log(err);
//   }
// };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectLogin, setRedirectLogin] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    axios.post(global.serverUrl + "users/login",
        {
            password: password,
            username: email
        })
    .then((result) => {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('role', result.data.role);
      localStorage.setItem('username', result.data.username);
      localStorage.setItem('gdpr', result.data.gdpr)
      setRedirectLogin(true);
    })
    .catch((error) => {
        if (error.response !== undefined && error.response.data !== undefined) {
            setErrorMessage(error.response.data.error);
        } else {
            console.log(error);
        }
    });

    event.preventDefault();
  }

  if (redirectLogin) {
    setRedirectLogin(false);
    return (<Redirect to='/dashboard'/>);
  }

  return (
      <div className="Login">
          <form onSubmit={handleSubmit}>
          { errorMessage.length===0 ? null :<Alert variant="danger">{errorMessage}</Alert>}
            <FormGroup controlId="email" bsSize="large">
              <FormLabel >Username or email</FormLabel >
              <FormControl
                autoFocus
                type="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel >Password</FormLabel >
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
              Login
            </Button>
            <Link to='/register'>Don't have an account? Sign up here</Link>
          </form>
      </div>
  );
}

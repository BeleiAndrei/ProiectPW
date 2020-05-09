import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  function validateForm() {
    return true;
  }

  function handleSubmit(event) {
    if (email.length === 0) {
        setErrorMessage("Please enter an email address");
        return false;
    }

    if (password.length === 0) {
        setErrorMessage("Please enter a password");
        return false;
    }

    if (name.length === 0) {
        setErrorMessage("Please enter a name");
        return false;
    }

    if (username.length === 0) {
        setErrorMessage("Please enter an username");
        return false;
    }
    if (password !== rpassword) {
        setErrorMessage("Passwords do not match");
        return false;
    }

    axios.post(global.serverUrl + "users/register",
        {
            name: name,
            username: username,
            password: password,
            email: email
        })
    .then(() => {
        setInfoMessage("An email will be sent to this addess. Complete the registration by folowing the steps provided in it");
        //setRedirectLogin(true);
    })
    .catch((error) => {
        if (error.response.data !== undefined) {
            setErrorMessage(error.response.data.error);
        } else {
            console.log(error);
        }
    });

    setErrorMessage("");
    event.preventDefault();
  }

  return (
      <div className="Register">
          <form onSubmit={handleSubmit}>
                { errorMessage.length===0 ? null :<Alert variant="danger">{errorMessage}</Alert>}
                { infoMessage.length===0 ? null :<Alert variant="success">{infoMessage}</Alert>}
                <FormGroup controlId="name" bsSize="large">
                    <FormLabel>Last name and first name</FormLabel>
                    <FormControl
                        autoFocus
                        type="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />    
                </FormGroup>
                <FormGroup controlId="username" bsSize="large">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />    
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel >Email</FormLabel >
                    <FormControl
                        autoFocus
                        type="email"
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
                <FormGroup controlId="rpassword" bsSize="large">
                    <FormLabel >Repeat password</FormLabel >
                    <FormControl
                        value={rpassword}
                        onChange={e => setRPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                Register
                </Button>
                <Link to ='/'>Already have an account? Login here</Link>
          </form>
      </div>
  );
}

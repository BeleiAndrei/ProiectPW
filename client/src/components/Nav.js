import React, { useState } from "react";
import { Container } from 'react-dom';
import { Button, FormGroup, FormControl, FormLabel, Alert, Dropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./Nav.scss";


export default function Nav() {
    const options = [
        'logout', 'change password'
    ];

    const [redirectLogin, setRedirectLogin] = useState(false);

    if(redirectLogin) {
        setRedirectLogin(false);
        return (<Redirect to='/'/>);
    }


    return(
        <div className="Nav">
           <span>Logged in as {localStorage.getItem('username')}</span>
        </div>
    );
}
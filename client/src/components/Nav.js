import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert, Dropdown } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "./Nav.scss";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/DropdownToggle";


export default function Nav() {
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRPassword, setNewRPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [newAccountModal, setNewAccountModal] = useState(false);
    const [newAccount, setNewAccount] = useState("");
    const [newAccountPassword, setNewAccountPassword] = useState("");
    const [newAccountRPassword, setNewAccountRPassword] = useState("");
    const [newAccountRole, setNewAccountRole] = useState("support");

    const [infoMessage, setInfoMessage] = useState("");
    

    function handleSubmit(event) {
        if (currentPassword.length === 0 || newPassword === 0) {
            setErrorMessage("Please enter a password");
            return false;
        }

        if (newRPassword !== newPassword) {
            setErrorMessage("Passwords do not match");
            return false;
        }
        
        axios.put(global.serverUrl + "users/updatePassword",
        {
            username: localStorage.getItem('username'),
            oldPassword: currentPassword,
            newPassword: newPassword
        })
        .then((result) => {
            logout();
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

    function logout() {
        setErrorMessage("");
        setRedirectLogin(true);
        localStorage.setItem('token', undefined);
        localStorage.setItem('role', undefined);
        localStorage.setItem('username', undefined);
        localStorage.setItem('gdpr', undefined);
        localStorage.setItem('authToken', undefined);
    }

    if(redirectLogin) {
        return (<Redirect to='/'/>);
    }

    function deleteMe () {
        axios.delete(global.serverUrl + "users/",
        {
            data : {
                username: localStorage.getItem('username')
            }
        })
        .then((result) => {
            logout();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function handleAccountSubmit() {
        if (newAccount.length ===0) {
            setErrorMessage("Please enter a username");
            return false;
        }
        if (newAccountPassword.length === 0) {
            setErrorMessage("Please enter a password");
            return false;
        }

        if (newAccountRPassword !== newAccountPassword) {
            setErrorMessage("Passwords do not match");
            return false;
        }

        if (newAccountRole !== "support" && newAccountRole !== "admin") {
            setErrorMessage("Valid elevated user roles are 'admin' and 'support'");
            return false;
        }

        axios.post(global.serverUrl + "users/registerElevated",
        {
            username: newAccount,
            password: newAccountPassword,
            role: newAccountRole
        }, {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((result) => {
            setInfoMessage("Elevated user succesfully created");
        })
        .catch((error) => {
            if (error.response !== undefined && error.response.data !== undefined) {
                setErrorMessage(error.response.data.error);
            } else {
                console.log(error);
            }
        });

    }


    return(
        <div className="Nav">
            <Modal
                isOpen={newAccountModal}
                onAfterClose={e => setErrorMessage("")}
            >
                <form onSubmit={handleAccountSubmit}>
                    { errorMessage.length===0 ? null :<Alert variant="danger">{errorMessage}</Alert>}
                    { infoMessage.length===0 ? null :<Alert variant="success">{infoMessage}</Alert>}
                    <FormGroup controlId="newAccount">
                    <FormLabel >username</FormLabel >
                    <FormControl
                        autoFocus
                        type="name"
                        value={newAccount}
                        onChange={e => setNewAccount(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="newAccountRole">
                    <FormLabel >role</FormLabel >
                    <FormControl
                        componentClass="select"
                        placeholder="test"
                        autoFocus
                        type="name"
                        value={newAccountRole}
                        onChange={e => setNewAccountRole(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="pswd">
                    <FormLabel >Password</FormLabel >
                    <FormControl
                        value={newAccountPassword}
                        onChange={e => setNewAccountPassword(e.target.value)}
                        type="password"
                    />
                    </FormGroup>
                    <FormGroup controlId="rpswd">
                    <FormLabel >Repeat password</FormLabel >
                    <FormControl
                        value={newAccountRPassword}
                        onChange={e => setNewAccountRPassword(e.target.value)}
                        type="password"
                    />
                    </FormGroup>
                    <Button block type="submit">
                        Submit
                    </Button>
                    <Button block onClick={e => setNewAccountModal(false)}>
                        Cancel
                    </Button>
                </form>
            </Modal>

            <Modal
                isOpen={changePasswordModal}
                onAfterClose={e => setErrorMessage("")}
            >
                <form onSubmit={handleSubmit}>
                    { errorMessage.length===0 ? null :<Alert variant="danger">{errorMessage}</Alert>}
                    <FormGroup controlId="currentPassword">
                    <FormLabel >Current password</FormLabel >
                    <FormControl
                        autoFocus
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="newPassword">
                    <FormLabel >Password</FormLabel >
                    <FormControl
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        type="password"
                    />
                    </FormGroup>
                    <FormGroup controlId="newRPassword">
                    <FormLabel >Repeat password</FormLabel >
                    <FormControl
                        value={newRPassword}
                        onChange={e => setNewRPassword(e.target.value)}
                        type="password"
                    />
                    </FormGroup>
                    <Button block type="submit">
                        Update
                    </Button>
                    <Button block onClick={e => setChangePasswordModal(false)}>
                        Cancel
                    </Button>
                </form>
            </Modal>
            <span>Magazin de pescuit online</span>
           <div>
                <Dropdown 
                    size="sm" 
                    isOpen={true}
                    toggle={true}
                >
                    <DropdownToggle caret>{localStorage.getItem('username')}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={logout}>logout</DropdownItem>
                        <DropdownItem onClick={e => setChangePasswordModal(true)}>change password</DropdownItem>
                        {localStorage.getItem('role') === 'admin' ? <DropdownItem onClick={e => setNewAccountModal(true)}>create elevated account</DropdownItem> : null}
                        <DropdownItem onClick={deleteMe}>delete this account</DropdownItem>
                    </DropdownMenu>
               </Dropdown>
               
           </div>
           <span>Logged in as </span>
           
        </div>
    );
}
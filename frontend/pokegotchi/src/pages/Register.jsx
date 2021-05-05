import Title from '../components/Title'
import Button from '../components/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

import React, { useContext, useState } from "react";
//import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"; 

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    let history = useHistory();

    const register = async () => {
        await fetch('http://localhost:8000/api/dj-rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, password1:password1, password2:password2}),
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Not 2xx response")
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                history.push("/log_in")
            })
            .catch((error) => {
            console.error('Error:', error);
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("register clicked")
        register();
    }
    
    return (
        <div className="loginPager">
            <div className="spacerLandingTop"></div>
            <div className="landingTitle">
                <Title title="Sign up" className="topTitle"/>
            </div>
            <div className="formStyler">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter username" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password1} placeholder="Password" onChange={(e) => setPassword1(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={password2} placeholder="Password" onChange={(e) => setPassword2(e.target.value)}/>
                </Form.Group>
                <div className="landingButtonslogin">
                    <Button text="SIGN UP" className="landingButton" type="submit"/>
                </div>
            </Form>   
            </div>
            
            
        </div>
    )
}

export default Register

import Title from '../components/Title'
import Button from '../components/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

import React, {useState } from "react";
//import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"; 

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const login = async () => {
        await fetch('http://localhost:8000/api/dj-rest-auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, password:password}),
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Not 2xx response")
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                //console.log('userpk:', data.user.pk, 'access_token: ', data.access_token  );
                sessionStorage.setItem('userID', data.user.pk)
                props.handleLogin()
                props.handleUser(data.user.pk)

                //comment
                // if owner has pokemon go to play

                //else create_pokemon
                props.refreshUserPokemon(() => {
                    history.push("/")
                })
            })
            .catch((error) => {
            console.error('Error:', error);
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("login clicked")
        // console.log(props.loggedIn)
        if (!props.loggedIn){
            login();
        }
        else {
            console.log("already logged in")
        }
    }
    
    return (
        <div className="loginPage">
            <div className="spacerLandingTop"></div>
            <div className="landingTitle">
                <Title title="Log in" className="topTitle"/>
            </div>
            <div className="formStyle">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <div className="landingButtonslogin">
                    <Button text="LOG IN" className="landingButton" type="submit"/>
                </div>
            </Form>   
            </div>
            
            
        </div>
    )
}

export default Login

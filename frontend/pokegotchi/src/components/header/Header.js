import React from 'react'
import "./header.css"
import {Link, useHistory} from 'react-router-dom'



const Header = (props) => {

    let history = useHistory();

    const logout = async () => {
        await fetch('http://localhost:8000/api/dj-rest-auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Not 2xx response")
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                
                props.handleLogout()

                history.push("/")
            })
            .catch((error) => {
            console.error('Error:', error);
        });

    }

    

    return (
        <div className="headerWrapper">
            <div className="header">
                <Link to="/" className="titleLink">Pokégotchi</Link>
                <button className="logOutBtn" onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

export default Header

import React from 'react'
import "./header.css"
import {Link} from 'react-router-dom'



const Header = () => {

    // not working properly
    // let userLoggedIn = localStorage.getItem("loggedIn")

    
    // function handleLogOut(){
    //     if (userLoggedIn===true){
    //         console.log("logged in, proceeding to be logged out")
    //         localStorage.removeItem('loggedIn')
    //         userLoggedIn = false
    //     }else{
    //     console.log("already logged out ", userLoggedIn)
    //     }
    // }

    return (
        <div className="headerWrapper">
            <div className="header">
                <Link to="/" className="titleLink">Pokégotchi</Link>
                <button className="logOutBtn" /*onClick={handleLogOut}*/>Log Out</button>
            </div>
        </div>
    )
}

export default Header

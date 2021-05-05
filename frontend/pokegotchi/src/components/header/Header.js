import React from 'react'
import "./header.css"
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className="headerWrapper">
            <div className="header">
                <Link to="/" className="titleLink">Pokégotchi</Link>
                <button className="logOutBtn">Log Out</button>
            </div>
        </div>
    )
}

export default Header

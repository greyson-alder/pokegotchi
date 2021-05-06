import {Link} from 'react-router-dom'
import "./footer.css"

const Footer = () => {
    return (
        <div className="footerWrapper">
            <div className="footer">
                <img className="logo" src="Pokegotchi.gif" alt="Animated Pokégotchi Logo"/>
                <div className="footerBottom">
                    <Link to='/about' className="aboutLink">About Us</Link>
                    <p>Copyright Pokegotchi &copy; 2021</p>
                </div>
            </div>
        </div>
    )
}

export default Footer

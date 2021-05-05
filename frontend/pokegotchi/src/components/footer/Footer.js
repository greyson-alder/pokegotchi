import {Link} from 'react-router-dom'
import "./footer.css"

const Footer = () => {
    return (
        <div className="footerWrapper">
            <div className="footer">
                <Link to='/about' className="aboutLink">About Us</Link>
                <p>Copyright Pokegotchi &copy; 2021</p>
            </div>
        </div>
    )
}

export default Footer

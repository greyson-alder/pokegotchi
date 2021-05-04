import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer-brown">
            <Link to='/about'>About Us</Link>
            <p>Copyright Pokegotchi &copy; 2021</p>
        </div>
    )
}

export default Footer

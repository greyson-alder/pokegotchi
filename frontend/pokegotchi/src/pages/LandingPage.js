import Title from '../components/Title'
import Button from '../components/Button'
import logo from './Pokegotchi.gif'

import { Link } from 'react-router-dom'

const LandingPage = () => {
    
    return (
        <div className="landingPage">
            <div className="spacerLandingTop"></div>
            <div className="landingTitle">
                <Title title="Welcome to" className="topTitle"/>
                <Title title="Pok&#233;gotchi" className="bottomTitle"/>
                <img src={logo} alt='logo' className='logo'/>
                
           </div>
           <div className="landingButtons">
                <Link to ="/create_account"><Button text="SIGN UP" className="landingButton"/></Link>
                <Link to ="/log_in"><Button text="LOG IN" className="landingButton"/></Link>
           </div>
        </div>
    )
}

export default LandingPage

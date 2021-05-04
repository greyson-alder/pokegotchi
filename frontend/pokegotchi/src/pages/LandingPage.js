import Title from '../components/Title'
import Button from '../components/Button'

import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <>
            <div className="Title">
                <Title title="Welcome to"/>
                <Title title="Pokegotchi"/>
           </div>
           <div className="landingButtons">
                <Link to ="/create_account"><Button text="SIGN UP"/></Link>
                <Link to ="/log_in"><Button text="LOG IN"/></Link>
           </div>
           
        </>
    )
}

export default LandingPage

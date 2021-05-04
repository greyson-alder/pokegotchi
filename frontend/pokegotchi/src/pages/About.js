import Title from '../components/Title'
import Button from "../components/Button"

import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className="aboutPage">
            <Link to='/'><Button text="Back" className="backButton"/></Link>
            <Title title="About" className="aboutTitle"></Title>
            <div className="aboutText">
                <p> This is a Bright Network Technology Academy capstone group project, made using
                    Django and React JS. Our project is a pokemon tamagotchi crossover and was inspired 
                    by Issy Yeung's pitch. <br/><br/> Our group consists of Clarisa Chan, Louisa Chan, Beth Gooding
                    and Iain Sandison.
                </p>
            </div>
            <div className="aboutSpacer"></div>
        </div>
    )
}

export default About

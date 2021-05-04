import Title from '../components/Title'
import Button from "../components/Button"

import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <Link to='/'><Button text="Back"/></Link>
            <Title title="About"></Title>
            <p>Some text about how this is a group project. Pokemon tamagotchi crossover. Our names</p>
        </div>
    )
}

export default About

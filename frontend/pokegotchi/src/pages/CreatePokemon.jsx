import Title from '../components/Title'
import Button from '../components/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


import React, {useState } from "react";
//import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"; 

function CreatePokemon() {
    const [name, setName] = useState("");
    const [pokemon, setPokemon] = useState("");
    const [user, setUser] = useState("");

    let history = useHistory();

    const choosePokemon = async () => {

        await fetch('http://localhost:8000/api/dj-rest-auth/user/', {
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
          })
          .catch((error) => {
            console.error('Error:', error);
          });


        await fetch('http://localhost:8000/api/dj-rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:name, pokemon:pokemon}),
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("Not 2xx response")
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                history.push("/log_in")
            })
            .catch((error) => {
            console.error('Error:', error);
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("register clicked")
        choosePokemon();
    }
    
    return (
        <div className="landingPage">
            <div className="spacerLandingTop"></div>
            <div className="landingTitle">
                <Title title="Create Pokemon" className="topTitle"/>
            </div>
            <div className="formStyle">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="username" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pokemon</Form.Label>
                        <Form.Control as= "select" type="pokemon" value={pokemon} placeholder="Choose Pokemon" onChange={(e) => setPokemon(e.target.value)}>
                            <option>Please Select</option>
                            <option value="Bulbasaur">Bulbasaur</option>
                            <option value="Charmander">Charmander</option>
                            <option value="Squirtle">Squirtle</option>
                        </Form.Control>   
                    </Form.Group> 
                    <div className="landingButtons">
                        <Button text="GO" className="landingButton" type="submit"/>
                    </div>
                </Form>
            </div>
            
            
        </div>
    )
}


export default CreatePokemon

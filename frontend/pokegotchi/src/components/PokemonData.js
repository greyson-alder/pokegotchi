import React, { useState, useEffect } from 'react'

const PokemonData = () => {
    const [pokemonData, setPokemonData] = useState(false);


    useEffect(() => {
        if (!pokemonData) {
            getPokemonData()
        }
    });

    const getPokemonData = async () => {
        fetch("http://localhost:8000/api/pokemon/1")
        .then(response => response.json())
        .then(data => setPokemonData(data))
    }

    return (
        <div>
            <ul>
                <li>Name: {pokemonData.name}</li>
                <li>Age: {pokemonData.age}</li>
                <li>Pokemon: {pokemonData.pokemon}</li>
                <li>Happiness: {pokemonData.happiness}</li>
                <li>Hunger: {pokemonData.Hunger}</li>
                <li>funct_time: {pokemonData.func_time}</li>
            </ul>
             
        </div>
    )
}

export default PokemonData
